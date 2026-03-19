import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end();
  const db = getDB();
  const result = db.prepare('DELETE FROM savings_destinations WHERE id = ?').run(parseInt(req.query.id));
  res.json({ deleted: result.changes > 0 });
}
