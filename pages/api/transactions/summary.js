import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const db = getDB();
  const { month } = req.query;
  const where = month ? `WHERE date LIKE '${month}%'` : '';

  const totals = db.prepare(
    "SELECT " +
    "SUM(CASE WHEN amount > 0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN amount ELSE 0 END) as totalIncome, " +
    "SUM(CASE WHEN amount < 0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN ABS(amount) ELSE 0 END) as totalExpenses, " +
    "SUM(CASE WHEN category = 'Savings' AND amount < 0 THEN ABS(amount) ELSE 0 END) as totalSavings " +
    "FROM transactions " + where
  ).get();

  const byCategory = db.prepare(
    'SELECT category, SUM(amount) as total, COUNT(*) as count FROM transactions ' + where + ' GROUP BY category ORDER BY ABS(SUM(amount)) DESC'
  ).all();

  const totalIncome = totals.totalIncome || 0;
  const totalExpenses = totals.totalExpenses || 0;
  const totalSavings = totals.totalSavings || 0;

  res.json({
    totalIncome,
    totalExpenses,
    totalSavings,
    netFlow: totalIncome - totalExpenses,
    byCategory,
  });
}
