import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    const rows = db.prepare(`
      SELECT b.*,
        COALESCE(tx.total, 0) + COALESCE(me.total, 0) AS balance
      FROM savings_buckets b
      LEFT JOIN (
        SELECT savings_bucket_id, SUM(ABS(amount)) AS total
        FROM transactions WHERE category = 'Savings' AND savings_bucket_id IS NOT NULL
        GROUP BY savings_bucket_id
      ) tx ON tx.savings_bucket_id = b.id
      LEFT JOIN (
        SELECT bucket_id, SUM(amount) AS total
        FROM savings_manual_entries GROUP BY bucket_id
      ) me ON me.bucket_id = b.id
      ORDER BY b.sort_order ASC, b.created_at ASC
    `).all();
    return res.json({ rows });
  }

  if (req.method === 'POST') {
    const { name, target_amount } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
    if (target_amount !== undefined && target_amount !== null && target_amount !== '' && parseFloat(target_amount) <= 0) {
      return res.status(400).json({ error: 'target_amount must be > 0' });
    }
    const ta = (target_amount !== undefined && target_amount !== null && target_amount !== '') ? parseFloat(target_amount) : null;
    const result = db.prepare(
      'INSERT INTO savings_buckets (name, target_amount) VALUES (?, ?)'
    ).run(name.trim(), ta);
    const row = db.prepare('SELECT * FROM savings_buckets WHERE id = ?').get(result.lastInsertRowid);
    return res.json({ ...row, balance: 0 });
  }

  res.status(405).end();
}
