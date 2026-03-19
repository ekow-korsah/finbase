import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    return res.json(db.prepare('SELECT * FROM savings_destinations ORDER BY name ASC').all());
  }

  if (req.method === 'POST') {
    const { name, keywords } = req.body;
    if (!name || !keywords) return res.status(400).json({ error: 'name and keywords are required' });
    const result = db.prepare('INSERT INTO savings_destinations (name, keywords) VALUES (?, ?)').run(name.trim(), keywords.trim());
    return res.status(201).json(db.prepare('SELECT * FROM savings_destinations WHERE id = ?').get(result.lastInsertRowid));
  }

  res.status(405).end();
}
