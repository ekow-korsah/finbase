import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { fields } = req.body;
    const allowed = ['name', 'ticker', 'quantity', 'cost_basis', 'current_value', 'notes'];
    const clean = { ...fields };
    if (clean.ticker) clean.ticker = clean.ticker.trim().toUpperCase();
    const sets = Object.keys(clean).filter(k => allowed.includes(k)).map(k => k + ' = @' + k).join(', ');
    if (!sets) return res.json({ updated: false });
    db.prepare('UPDATE holdings SET ' + sets + ', updated_at = unixepoch() WHERE id = @id').run({ ...clean, id: parseInt(id) });
    return res.json({ updated: true, holding: db.prepare('SELECT * FROM holdings WHERE id = ?').get(parseInt(id)) });
  }

  if (req.method === 'DELETE') {
    const result = db.prepare('DELETE FROM holdings WHERE id = ?').run(parseInt(id));
    return res.json({ deleted: result.changes > 0 });
  }

  res.status(405).end();
}
