import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const db = getDB();
  const row = db.prepare('SELECT * FROM insights_cache ORDER BY generated_at DESC LIMIT 1').get();
  res.json(row || null);
}
