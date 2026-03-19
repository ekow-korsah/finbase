import { getDB } from '../../../../../lib/db';

export default function handler(req, res) {
  const db = getDB();
  const { id, entryId } = req.query;

  if (req.method === 'DELETE') {
    const result = db.prepare(
      'DELETE FROM savings_manual_entries WHERE id = ? AND bucket_id = ?'
    ).run(parseInt(entryId), parseInt(id));
    return res.json({ deleted: result.changes > 0 });
  }

  res.status(405).end();
}
