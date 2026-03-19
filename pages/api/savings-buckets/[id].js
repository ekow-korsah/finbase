import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { fields } = req.body;
    const allowed = ['name', 'target_amount'];
    if (fields.target_amount !== undefined && fields.target_amount !== null && fields.target_amount !== '') {
      if (parseFloat(fields.target_amount) <= 0) return res.status(400).json({ error: 'target_amount must be > 0' });
    }
    const sets = Object.keys(fields).filter(k => allowed.includes(k)).map(k => k + ' = @' + k).join(', ');
    if (!sets) return res.json({ updated: false });
    db.prepare('UPDATE savings_buckets SET ' + sets + ', updated_at = unixepoch() WHERE id = @id').run({ ...fields, id: parseInt(id) });
    return res.json({ updated: true, bucket: db.prepare('SELECT * FROM savings_buckets WHERE id = ?').get(parseInt(id)) });
  }

  if (req.method === 'DELETE') {
    const result = db.prepare('DELETE FROM savings_buckets WHERE id = ?').run(parseInt(id));
    return res.json({ deleted: result.changes > 0 });
  }

  res.status(405).end();
}
