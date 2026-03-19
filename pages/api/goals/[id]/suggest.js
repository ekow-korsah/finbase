import { getDB } from '../../../../lib/db';
import { callClaudeWithWebSearch } from '../../../../lib/claude';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const db = getDB();
  const { id } = req.query;

  const goal = db.prepare('SELECT * FROM goals WHERE id = ?').get(parseInt(id));
  if (!goal) return res.json({ suggestions: [], categoriesToCut: [] });

  const spending = db.prepare(`
    SELECT category, SUM(ABS(amount)) as total
    FROM transactions
    WHERE amount < 0 AND date >= date('now', '-3 months')
    GROUP BY category ORDER BY total DESC LIMIT 10
  `).all();

  const systemPrompt = `You are a personal finance coach. Given a savings goal and current spending, provide 3-5 specific, actionable suggestions to reach the goal. Return JSON: { "suggestions": ["..."], "categoriesToCut": [{"category": "...", "potentialSaving": 50}] }`;
  const spendingList = spending.map(s => '- ' + s.category + ': $' + s.total.toFixed(2)).join('\n');
  const userMessage = 'Goal: "' + goal.name + '" — $' + goal.target_amount + ' by ' + goal.target_date + '\n\nCurrent monthly spending:\n' + spendingList + '\n\nWhat are the top ways to reach this goal?';

  try {
    const text = await callClaudeWithWebSearch(systemPrompt, userMessage, 1024);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return res.json(JSON.parse(jsonMatch[0]));
  } catch (e) {
    if (e.code === 'NO_API_KEY') {
      return res.status(403).json({ error: 'NO_API_KEY', message: 'Add your Anthropic API key in Settings to use this feature.' });
    }
    console.error('[goals:suggest] parse error:', e);
  }
  res.json({ suggestions: ['Review your top spending categories for cuts', 'Set up automatic transfers to savings', 'Reduce subscription services'], categoriesToCut: [] });
}
