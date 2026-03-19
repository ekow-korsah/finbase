import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const db = getDB();
  const { month } = req.query;
  const monthLike = (month || '') + '%';

  const trend = db.prepare(
    "SELECT substr(date,1,7) AS month, " +
    "SUM(CASE WHEN amount>0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN amount ELSE 0 END) AS income, " +
    "SUM(CASE WHEN amount<0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN ABS(amount) ELSE 0 END) AS expenses, " +
    "SUM(CASE WHEN category='Savings' AND amount<0 THEN ABS(amount) ELSE 0 END) AS savings " +
    "FROM transactions GROUP BY substr(date,1,7) ORDER BY month DESC LIMIT 12"
  ).all();

  const categoryBreakdown = db.prepare(
    "SELECT category, SUM(ABS(amount)) AS total, COUNT(*) AS count " +
    "FROM transactions WHERE date LIKE ? AND amount<0 " +
    "AND category NOT IN ('Transfers','ATM/Cash','Savings') " +
    "GROUP BY category ORDER BY total DESC"
  ).all(monthLike);

  const topMerchants = db.prepare(
    "SELECT merchant, SUM(ABS(amount)) AS total, COUNT(*) AS count " +
    "FROM transactions WHERE date LIKE ? AND amount<0 " +
    "AND category NOT IN ('Transfers','ATM/Cash','Savings') " +
    "GROUP BY merchant ORDER BY total DESC LIMIT 10"
  ).all(monthLike);

  const dailySpend = db.prepare(
    "SELECT date, SUM(CASE WHEN amount<0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN ABS(amount) ELSE 0 END) AS spent " +
    "FROM transactions WHERE date LIKE ? GROUP BY date ORDER BY date ASC"
  ).all(monthLike);

  res.json({ trend, categoryBreakdown, topMerchants, dailySpend });
}
