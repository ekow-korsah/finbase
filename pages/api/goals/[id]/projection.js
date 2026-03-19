import { getDB } from '../../../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const db = getDB();
  const { id } = req.query;

  const goal = db.prepare('SELECT * FROM goals WHERE id = ?').get(parseInt(id));
  if (!goal) return res.status(404).json(null);

  const today = new Date();
  const targetDate = new Date(goal.target_date);
  const monthsLeft = Math.max(1, (targetDate.getFullYear() - today.getFullYear()) * 12 + (targetDate.getMonth() - today.getMonth()));

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const monthlySavings = db.prepare(`
    SELECT AVG(monthly_net) as avg_savings FROM (
      SELECT strftime('%Y-%m', date) as month, SUM(amount) as monthly_net
      FROM transactions WHERE date >= ?
      GROUP BY strftime('%Y-%m', date)
    )
  `).get(threeMonthsAgo.toISOString().slice(0, 10));

  const avgMonthlySavings = Math.max(0, monthlySavings?.avg_savings || 0);
  const monthlyNeeded = goal.target_amount / monthsLeft;
  const onTrack = avgMonthlySavings >= monthlyNeeded;

  const chartData = [];
  let accumulated = 0;
  for (let i = 0; i <= 6; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    accumulated += avgMonthlySavings;
    chartData.push({
      month: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      projected: Math.min(accumulated, goal.target_amount),
      needed: Math.min(monthlyNeeded * i, goal.target_amount),
      target: goal.target_amount,
    });
  }

  res.json({ monthlyNeeded, currentSavingsRate: avgMonthlySavings, onTrack, chartData });
}
