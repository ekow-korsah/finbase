import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    const rows = db.prepare('SELECT * FROM goals ORDER BY target_date ASC').all();
    return res.json({ rows });
  }

  if (req.method === 'POST') {
    const { name, target_amount, target_date } = req.body;
    const result = db.prepare('INSERT INTO goals (name, target_amount, target_date) VALUES (?, ?, ?)').run(name, target_amount, target_date);
    return res.status(201).json(db.prepare('SELECT * FROM goals WHERE id = ?').get(result.lastInsertRowid));
  }

  res.status(405).end();
}
