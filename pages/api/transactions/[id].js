import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { fields } = req.body;
    const allowed = ['date', 'merchant', 'amount', 'category', 'note', 'is_income_verified', 'savings_bucket_id'];
    const sets = Object.keys(fields)
      .filter(k => allowed.includes(k))
      .map(k => k + ' = @' + k)
      .join(', ');
    if (!sets) return res.json({ updated: false, transaction: null });
    db.prepare('UPDATE transactions SET ' + sets + ', updated_at = unixepoch() WHERE id = @id')
      .run({ ...fields, id: parseInt(id) });
    const tx = db.prepare('SELECT * FROM transactions WHERE id = ?').get(parseInt(id));
    return res.json({ updated: true, transaction: tx });
  }

  if (req.method === 'DELETE') {
    const result = db.prepare('DELETE FROM transactions WHERE id = ?').run(parseInt(id));
    return res.json({ deleted: result.changes > 0 });
  }

  res.status(405).end();
}
