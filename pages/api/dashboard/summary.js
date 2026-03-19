import { getDB } from '../../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const db = getDB();
  const { month } = req.query;
  const where = month ? 'WHERE date LIKE ?' : '';
  const whereParams = month ? [month + '%'] : [];

  const totals = db.prepare(
    "SELECT " +
    "SUM(CASE WHEN amount > 0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN amount ELSE 0 END) as income, " +
    "SUM(CASE WHEN amount < 0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN ABS(amount) ELSE 0 END) as expenses, " +
    "SUM(CASE WHEN category = 'Savings' AND amount < 0 THEN ABS(amount) ELSE 0 END) as savings " +
    "FROM transactions " + where
  ).get(...whereParams);

  const topCategories = db.prepare(
    'SELECT category, SUM(amount) as total, COUNT(*) as count FROM transactions ' + where + ' GROUP BY category ORDER BY ABS(SUM(amount)) DESC LIMIT 5'
  ).all(...whereParams);

  const holdings = db.prepare('SELECT current_value, cost_basis FROM holdings').all();
  const portfolioTotal = holdings.reduce((s, h) => s + (h.current_value || 0), 0);
  const portfolioCost  = holdings.reduce((s, h) => s + (h.cost_basis || 0), 0);
  const portfolioGainLoss = portfolioTotal - portfolioCost;
  const portfolioChange = portfolioCost > 0 ? (portfolioGainLoss / portfolioCost) * 100 : 0;

  const latestInsight = db.prepare('SELECT insight_text, generated_at FROM insights_cache ORDER BY generated_at DESC LIMIT 1').get();

  const { count: unassignedSavingsCount } = db.prepare(
    "SELECT COUNT(*) as count FROM transactions WHERE category = 'Savings' AND savings_bucket_id IS NULL"
  ).get();

  res.json({
    income: totals?.income || 0,
    expenses: totals?.expenses || 0,
    savings: totals?.savings || 0,
    netFlow: (totals?.income || 0) - (totals?.expenses || 0),
    portfolioTotal,
    portfolioChange,
    topCategories,
    pinnedInsight: (() => {
      if (!latestInsight?.insight_text) return null;
      try {
        const parsed = JSON.parse(latestInsight.insight_text);
        return parsed.schema_version === 2
          ? parsed.summary
          : latestInsight.insight_text.split('\n').slice(0, 3).join(' ');
      } catch {
        return latestInsight.insight_text.split('\n').slice(0, 3).join(' ');
      }
    })(),
    pinnedInsightFull: latestInsight?.insight_text || null,
    unassignedSavingsCount,
  });
}
