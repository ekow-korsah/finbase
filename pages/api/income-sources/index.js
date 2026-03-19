import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    return res.json(db.prepare('SELECT * FROM income_sources ORDER BY name ASC').all());
  }

  if (req.method === 'POST') {
    const { name, keywords, category = 'Salary' } = req.body;
    if (!name || !keywords) return res.status(400).json({ error: 'name and keywords are required' });
    const result = db.prepare('INSERT INTO income_sources (name, keywords, category) VALUES (?, ?, ?)').run(name.trim(), keywords.trim(), category);
    return res.status(201).json(db.prepare('SELECT * FROM income_sources WHERE id = ?').get(result.lastInsertRowid));
  }

  res.status(405).end();
}
