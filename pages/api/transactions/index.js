import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    const { page = 1, pageSize = 50, month, category, search } = req.query;
    const safePage = Math.max(1, parseInt(page) || 1);
    const safePageSize = Math.min(500, Math.max(1, parseInt(pageSize) || 50));
    const conditions = [];
    const params = {};

    if (month) { conditions.push("date LIKE @month"); params.month = month + '%'; }
    if (category && category !== 'All') { conditions.push("category = @category"); params.category = category; }
    if (search) { conditions.push("(merchant LIKE @search OR note LIKE @search)"); params.search = '%' + search + '%'; }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
    const total = db.prepare('SELECT COUNT(*) as n FROM transactions ' + where).get(params).n;
    const offset = (safePage - 1) * safePageSize;
    const rows = db.prepare(
      'SELECT * FROM transactions ' + where + ' ORDER BY date DESC, id DESC LIMIT @limit OFFSET @offset'
    ).all({ ...params, limit: safePageSize, offset });

    return res.json({ rows, total, totalPages: Math.ceil(total / safePageSize) });
  }

  if (req.method === 'POST') {
    const { date, merchant, amount, category, note } = req.body;
    if (!date || !merchant || amount === undefined || amount === null || amount === '') {
      return res.status(400).json({ error: 'date, merchant, and amount are required' });
    }
    if (typeof merchant !== 'string' || merchant.trim().length === 0 || merchant.length > 200) {
      return res.status(400).json({ error: 'merchant must be a non-empty string under 200 characters' });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'date must be YYYY-MM-DD' });
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || !isFinite(parsedAmount)) {
      return res.status(400).json({ error: 'amount must be a valid number' });
    }
    const result = db.prepare(`
      INSERT INTO transactions (date, merchant, amount, category, note, source)
      VALUES (@date, @merchant, @amount, @category, @note, 'manual')
    `).run({ date, merchant: merchant.trim(), amount: parsedAmount, category: category || 'Uncategorized', note: note || null });
    const tx = db.prepare('SELECT * FROM transactions WHERE id = ?').get(result.lastInsertRowid);
    return res.status(201).json(tx);
  }

  res.status(405).end();
}
