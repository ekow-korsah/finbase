import { getDB } from '../../../../lib/db';

export default function handler(req, res) {
  const db = getDB();
  const { id } = req.query;
  const bucketId = parseInt(id);

  if (req.method === 'GET') {
    const rows = db.prepare(
      'SELECT * FROM savings_manual_entries WHERE bucket_id = ? ORDER BY date DESC, created_at DESC'
    ).all(bucketId);
    return res.json({ rows });
  }

  if (req.method === 'POST') {
    const { amount, date, note } = req.body;
    if (!amount || parseFloat(amount) <= 0) return res.status(400).json({ error: 'amount must be > 0' });
    if (!date) return res.status(400).json({ error: 'date is required' });
    const result = db.prepare(
      'INSERT INTO savings_manual_entries (bucket_id, amount, date, note) VALUES (?, ?, ?, ?)'
    ).run(bucketId, parseFloat(amount), date, note || null);
    const row = db.prepare('SELECT * FROM savings_manual_entries WHERE id = ?').get(result.lastInsertRowid);
    return res.json(row);
  }

  res.status(405).end();
}
