import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    const rows = db.prepare('SELECT * FROM goals ORDER BY target_date ASC').all();
    return res.json({ rows });
  }

  if (req.method === 'POST') {
    const { name, target_amount, target_date } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'name is required' });
    }
    if (target_amount == null || isNaN(Number(target_amount)) || Number(target_amount) <= 0) {
      return res.status(400).json({ error: 'target_amount must be a positive number' });
    }
    const result = db.prepare('INSERT INTO goals (name, target_amount, target_date) VALUES (?, ?, ?)').run(name.trim(), Number(target_amount), target_date || null);
    return res.status(201).json(db.prepare('SELECT * FROM goals WHERE id = ?').get(result.lastInsertRowid));
  }

  res.status(405).end();
}
