import { getDB } from '../../lib/db';
import { callClaude } from '../../lib/claude';
import { stripSensitiveData } from '../../lib/strip';
import { rateLimit } from '../../lib/ratelimit';
import Busboy from 'busboy';
import path from 'path';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const PDF_MAGIC = Buffer.from([0x25, 0x50, 0x44, 0x46]); // %PDF

export const config = { api: { bodyParser: false } };

const PAYMENT_PATTERNS = [
  // Credit card / loan payments
  'payment received', 'payment thank you', 'thank you for your payment',
  'autopay', 'online payment', 'online pmt', 'ach payment', 'ach credit',
  'ach deposit', 'bill pay', 'e-payment', 'minimum payment',
  'credit card payment', 'statement balance', 'balance transfer', 'direct pay',
  // Account-to-account transfers
  'transfer from', 'transfer to', 'account transfer', 'mobile transfer',
  'from savings', 'from chequing', 'from checking', 'wire transfer',
  // Payroll / salary (not income for this user — just internal flow)
  'direct deposit', 'payroll', 'salary deposit',
  // Interac / e-transfers
  'interac', 'e-transfer', 'etransfer', 'e transfer',
];

function matchesKeywords(text, keywords) {
  const t = (text || '').toLowerCase();
  return keywords.split(',').map(k => k.trim().toLowerCase()).some(k => k && t.includes(k));
}

const INCOME_CATEGORIES = ['Rent Income', 'Income', 'Salary'];
const SAVINGS_CATEGORY = 'Savings';

function applyIncomeRules(transactions, incomeSources, savingsDests) {
  return transactions.map(tx => {
    const merchant = tx.merchant || '';

    // 1. Verified income sources win
    for (const src of incomeSources) {
      if (matchesKeywords(merchant, src.keywords)) {
        return { ...tx, category: src.category, is_income_verified: 1 };
      }
    }

    // 2. Savings destinations (debits only)
    if (tx.amount < 0) {
      for (const dest of savingsDests) {
        if (matchesKeywords(merchant, dest.keywords)) {
          return { ...tx, category: SAVINGS_CATEGORY, is_income_verified: 1 };
        }
      }
    }

    // 3. Demote misclassified positive amounts to Transfers
    if (tx.amount > 0 && INCOME_CATEGORIES.includes(tx.category)) {
      const m = merchant.toLowerCase();
      const matchesTransfer = PAYMENT_PATTERNS.some(p => m.includes(p));
      if (matchesTransfer || tx.category !== 'Rent Income') {
        return { ...tx, category: 'Transfers' };
      }
    }

    return tx;
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!rateLimit('import', 20, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many import requests. Please wait before trying again.' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (step, pct, msg) => {
    res.write(`data: ${JSON.stringify({ step, pct, msg })}\n\n`);
  };

  const errors = [];
  try {
    send('reading', 10, 'Reading file…');

    // Parse multipart with busboy
    const fileBuffer = await new Promise((resolve, reject) => {
      const bb = Busboy({ headers: req.headers, limits: { fileSize: MAX_FILE_SIZE, files: 1 } });
      let fileData = null;
      let fileName = '';
      let sizeExceeded = false;
      bb.on('file', (name, stream, info) => {
        fileName = info.filename;
        const chunks = [];
        stream.on('limit', () => {
          sizeExceeded = true;
          stream.resume(); // drain to let busboy finish cleanly
        });
        stream.on('data', d => chunks.push(d));
        stream.on('end', () => {
          if (sizeExceeded) return reject(new Error('File too large. Maximum size is 25 MB.'));
          fileData = Buffer.concat(chunks);
        });
      });
      bb.on('finish', () => resolve({ buffer: fileData, name: fileName }));
      bb.on('error', reject);
      req.pipe(bb);
    });

    if (!fileBuffer.buffer) throw new Error('No file received');

    const ext = path.extname(fileBuffer.name).slice(1).toLowerCase() || 'pdf';
    const ALLOWED_EXTS = new Set(['pdf', 'csv', 'txt']);
    if (!ALLOWED_EXTS.has(ext)) throw new Error('Unsupported file type. Please upload a PDF or CSV.');

    // Validate PDF magic bytes to confirm the file is actually a PDF
    if (ext === 'pdf' && !fileBuffer.buffer.slice(0, 4).equals(PDF_MAGIC)) {
      throw new Error('Invalid PDF file. The file does not appear to be a valid PDF.');
    }

    send('extracting', 25, 'Extracting text from ' + ext.toUpperCase() + '…');

    let rawText;
    if (ext === 'pdf') {
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(fileBuffer.buffer);
      rawText = data.text;
    } else {
      rawText = fileBuffer.buffer.toString('utf8');
    }

    send('stripping', 40, 'Stripping sensitive data…');
    const cleanText = stripSensitiveData(rawText);

    send('analyzing', 55, 'Analyzing with Claude…');
    const db = getDB();
    const incomeSources = db.prepare('SELECT * FROM income_sources').all();
    const savingsDests = db.prepare('SELECT * FROM savings_destinations').all();
    const transactions = await callClaude(cleanText, ext, incomeSources, savingsDests);

    // Post-processing: enforce income source rules and payment exclusions
    const processed = applyIncomeRules(transactions, incomeSources, savingsDests);

    send('saving', 80, 'Saving ' + processed.length + ' transactions…');
    const insert = db.prepare(`
      INSERT INTO transactions (date, merchant, amount, category, source, raw_text, is_income_verified)
      VALUES (@date, @merchant, @amount, @category, @source, @raw_text, @is_income_verified)
    `);
    const insertMany = db.transaction((rows) => {
      for (const row of rows) {
        insert.run({
          date: row.date,
          merchant: row.merchant || 'Unknown',
          amount: row.amount || 0,
          category: row.category || 'Uncategorized',
          source: ext,
          raw_text: null,
          is_income_verified: row.is_income_verified || 0,
        });
      }
    });
    insertMany(processed);

    send('done', 100, 'Imported ' + processed.length + ' transactions');
    res.write(`data: ${JSON.stringify({ step: 'done', pct: 100, result: { count: processed.length, errors } })}\n\n`);
  } catch (err) {
    if (err.code === 'NO_API_KEY') {
      send('error', 0, 'NO_API_KEY');
      res.write(`data: ${JSON.stringify({ step: 'error', pct: 0, result: { count: 0, errors: ['NO_API_KEY'] } })}\n\n`);
    } else {
      // Surface safe, user-facing messages; log details server-side only
      const safeMessages = new Set([
        'File too large. Maximum size is 25 MB.',
        'Unsupported file type. Please upload a PDF or CSV.',
        'Invalid PDF file. The file does not appear to be a valid PDF.',
        'No file received',
      ]);
      const userMessage = safeMessages.has(err.message) ? err.message : 'Import failed. Please check your file and try again.';
      console.error('[import]', err);
      errors.push(userMessage);
      send('error', 0, userMessage);
      res.write(`data: ${JSON.stringify({ step: 'error', pct: 0, result: { count: 0, errors } })}\n\n`);
    }
  }

  res.end();
}
