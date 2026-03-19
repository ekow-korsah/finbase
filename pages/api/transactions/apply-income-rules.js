import { getDB } from '../../../lib/db';

const PAYMENT_PATTERNS = [
  // Credit card / loan payments
  'payment received', 'payment thank you', 'thank you for your payment',
  'autopay', 'online payment', 'online pmt', 'ach payment', 'ach credit',
  'ach deposit', 'bill pay', 'e-payment', 'minimum payment',
  'credit card payment', 'statement balance', 'balance transfer', 'direct pay',
  // Account-to-account transfers
  'transfer from', 'transfer to', 'account transfer', 'mobile transfer',
  'from savings', 'from chequing', 'from checking', 'wire transfer',
  // Payroll / salary (not income for this user)
  'direct deposit', 'payroll', 'salary deposit',
  // Interac / e-transfers
  'interac', 'e-transfer', 'etransfer', 'e transfer',
];

const INCOME_CATEGORIES = ['Rent Income', 'Income', 'Salary'];
const SAVINGS_CATEGORY = 'Savings';

function matchesKeywords(text, keywords) {
  const t = (text || '').toLowerCase();
  return keywords.split(',').map(k => k.trim().toLowerCase()).some(k => k && t.includes(k));
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const db = getDB();

  const incomeSources = db.prepare('SELECT * FROM income_sources').all();
  const savingsDests = db.prepare('SELECT * FROM savings_destinations').all();
  const transactions = db.prepare('SELECT id, merchant, amount, category, is_income_verified FROM transactions').all();

  let updated = 0;
  const updateStmt = db.prepare('UPDATE transactions SET category = ?, is_income_verified = ?, updated_at = unixepoch() WHERE id = ?');

  db.transaction(() => {
    for (const tx of transactions) {
      const merchant = tx.merchant || '';
      let newCategory = null;
      let verified = 0;

      // 1. Income sources win first
      for (const src of incomeSources) {
        if (matchesKeywords(merchant, src.keywords)) {
          newCategory = src.category;
          verified = 1;
          break;
        }
      }

      // 2. Savings destinations (debits only)
      if (!newCategory && tx.amount < 0) {
        for (const dest of savingsDests) {
          if (matchesKeywords(merchant, dest.keywords)) {
            newCategory = SAVINGS_CATEGORY;
            verified = 1;
            break;
          }
        }
      }

      // 3. Demote unverified income/savings categories
      if (!newCategory && (INCOME_CATEGORIES.includes(tx.category) || tx.category === SAVINGS_CATEGORY)) {
        if (tx.is_income_verified === 1) {
          // User manually tagged this — skip downgrade
        } else {
          const m = merchant.toLowerCase();
          const matchesTransfer = PAYMENT_PATTERNS.some(p => m.includes(p));
          if (INCOME_CATEGORIES.includes(tx.category)) {
            if (matchesTransfer || tx.category !== 'Rent Income') {
              newCategory = 'Transfers';
              verified = 0;
            }
          } else {
            // Savings category without a matching destination — leave as-is (was manually tagged or imported)
          }
        }
      }

      if (newCategory && newCategory !== tx.category) {
        updateStmt.run(newCategory, verified, tx.id);
        updated++;
      } else if (verified && !newCategory) {
        db.prepare('UPDATE transactions SET is_income_verified = 1, updated_at = unixepoch() WHERE id = ?').run(tx.id);
      }
    }
  })();

  res.json({ updated });
}
