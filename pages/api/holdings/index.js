import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    const rows = db.prepare('SELECT * FROM holdings ORDER BY name ASC').all();
    const totalValue    = rows.reduce((s, r) => s + (r.current_value || 0), 0);
    const totalCost     = rows.reduce((s, r) => s + (r.cost_basis || 0), 0);
    const totalGainLoss = rows.reduce((s, r) => s + (r.cost_basis != null ? r.current_value - r.cost_basis : 0), 0);
    return res.json({ rows, totalValue, totalCost, totalGainLoss });
  }

  if (req.method === 'POST') {
    const { name, ticker, quantity, cost_basis, current_value, notes } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'name is required' });
    }
    if (current_value == null || isNaN(Number(current_value))) {
      return res.status(400).json({ error: 'current_value must be a number' });
    }
    const result = db.prepare(
      'INSERT INTO holdings (name, ticker, quantity, cost_basis, current_value, notes) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(
      name.trim(),
      ticker ? String(ticker).trim().toUpperCase() : null,
      quantity != null ? Number(quantity) : null,
      cost_basis != null ? Number(cost_basis) : null,
      Number(current_value),
      notes || null
    );
    return res.status(201).json(db.prepare('SELECT * FROM holdings WHERE id = ?').get(result.lastInsertRowid));
  }

  res.status(405).end();
}
