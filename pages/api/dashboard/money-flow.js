import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const db = getDB();
  const { month } = req.query;
  const monthLike = (month || '') + '%';

  const incomeSources = db.prepare(
    "SELECT category, SUM(amount) AS total FROM transactions " +
    "WHERE date LIKE ? AND amount>0 AND category NOT IN ('Transfers','ATM/Cash') " +
    "GROUP BY category ORDER BY total DESC"
  ).all(monthLike);

  const expenseCategories = db.prepare(
    "SELECT category, SUM(ABS(amount)) AS total FROM transactions " +
    "WHERE date LIKE ? AND amount<0 AND category NOT IN ('Transfers','ATM/Cash','Savings') " +
    "GROUP BY category ORDER BY total DESC"
  ).all(monthLike);

  const totals = db.prepare(
    "SELECT " +
    "SUM(CASE WHEN amount>0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN amount ELSE 0 END) AS totalIncome, " +
    "SUM(CASE WHEN amount<0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN ABS(amount) ELSE 0 END) AS totalOutflow, " +
    "SUM(CASE WHEN category='Savings' AND amount<0 THEN ABS(amount) ELSE 0 END) AS totalSavings " +
    "FROM transactions WHERE date LIKE ?"
  ).get(monthLike);

  const totalIncome = totals?.totalIncome || 0;
  const totalOutflow = totals?.totalOutflow || 0;
  const savings = totals?.totalSavings || 0;
  const retained = Math.max(0, totalIncome - totalOutflow - savings);

  res.json({ totalIncome, totalOutflow, retained, incomeSources, expenseCategories, savings });
}
