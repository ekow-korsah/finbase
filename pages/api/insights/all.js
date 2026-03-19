import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const db = getDB();
  const { month } = req.query;
  if (month) {
    const row = db.prepare('SELECT * FROM insights_cache WHERE month = ?').get(month);
    return res.json(row || null);
  }
  const rows = db.prepare('SELECT month, generated_at FROM insights_cache ORDER BY generated_at DESC').all();
  res.json(rows);
}
