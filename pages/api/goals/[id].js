import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { fields } = req.body;
    const allowed = ['name', 'target_amount', 'target_date'];
    const sets = Object.keys(fields).filter(k => allowed.includes(k)).map(k => k + ' = @' + k).join(', ');
    if (!sets) return res.json({ updated: false });
    db.prepare('UPDATE goals SET ' + sets + ', updated_at = unixepoch() WHERE id = @id').run({ ...fields, id: parseInt(id) });
    return res.json({ updated: true, goal: db.prepare('SELECT * FROM goals WHERE id = ?').get(parseInt(id)) });
  }

  if (req.method === 'DELETE') {
    const result = db.prepare('DELETE FROM goals WHERE id = ?').run(parseInt(id));
    return res.json({ deleted: result.changes > 0 });
  }

  res.status(405).end();
}
