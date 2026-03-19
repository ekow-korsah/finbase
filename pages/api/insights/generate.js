import { getDB } from '../../../lib/db';
import { callClaudeWithWebSearch } from '../../../lib/claude';
import { rateLimit } from '../../../lib/ratelimit';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!rateLimit('insights:generate', 5, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Please wait before generating again.' });
  }
  const db = getDB();
  const now = Math.floor(Date.now() / 1000);
  const currentMonth = new Date().toISOString().slice(0, 7);

  const cached = db.prepare('SELECT * FROM insights_cache WHERE month = ?').get(currentMonth);
  if (cached && (now - cached.generated_at) < 86400) {
    return res.json({ ...cached, cached: true });
  }

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 6);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  const monthlyBreakdown = db.prepare(`
    SELECT substr(date,1,7) AS month, category, COUNT(*) as count,
      SUM(CASE WHEN amount<0 THEN ABS(amount) ELSE 0 END) AS expenses,
      SUM(CASE WHEN amount>0 AND category NOT IN ('Transfers','ATM/Cash','Savings') THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN category='Savings' AND amount<0 THEN ABS(amount) ELSE 0 END) AS savings
    FROM transactions WHERE date >= ? GROUP BY substr(date,1,7), category
    ORDER BY month DESC, ABS(expenses) DESC
  `).all(cutoffStr);

  const txData = db.prepare(`
    SELECT category, merchant, amount, date
    FROM transactions WHERE date >= ? ORDER BY date DESC
  `).all(cutoffStr);

  const holdings = db.prepare('SELECT name, ticker, current_value, cost_basis FROM holdings').all();
  const portfolioTotal = holdings.reduce((s, h) => s + (h.current_value || 0), 0);
  const portfolioGain = portfolioTotal - holdings.reduce((s, h) => s + (h.cost_basis || 0), 0);

  const systemPrompt = `You are a personal finance advisor with web search access.

CRITICAL INSTRUCTION: Your entire response must be a single raw JSON object.
Do NOT include any text before or after the JSON.
Do NOT include markdown code fences (\`\`\`json or \`\`\`).
Do NOT include any analysis, calculations, or commentary.
Start your response with { and end with }.

JSON SCHEMA:
{
  "schema_version": 2,
  "generated_for_month": "YYYY-MM",
  "summary": "<1 sentence overall health assessment>",
  "monthly_trends": [{ "month": "YYYY-MM", "total_expenses": number, "total_income": number, "total_savings": number, "net_flow": number }],
  "top_categories": [{ "category": string, "amount": number, "transaction_count": number, "trend_dir": "up|down|flat", "trend_pct": number, "note": string }],
  "subscriptions": [{ "merchant": string, "amount_monthly": number, "recommendation": "keep|downgrade|cancel", "reason": string }],
  "action_items": [{ "id": "action-001", "title": string, "description": string, "priority": "high|medium|low", "category": string, "estimated_impact": number, "impact_period": "monthly|annually|one-time", "due_date": "YYYY-MM-DD|null" }],
  "savings_opportunities": [{ "title": string, "detail": string, "estimated_monthly_savings": number }],
  "investment_context": { "hysa_rate_current": number, "hysa_source": string, "market_notes": string, "portfolio_feedback": string, "suggestions": [] },
  "key_alerts": [{ "type": string, "message": string, "severity": "warning|info|positive" }]
}

RULES:
- Use web_search to find current HYSA rates before writing investment_context
- Detect subscriptions as merchants appearing 2+ consecutive months with similar amounts
- For trend_pct: compare current month vs average of prior months; set trend_dir accordingly (up=increased spending, down=decreased spending)
- Generate 3–6 action_items with IDs "action-001" through "action-006"
- All monetary values are numbers, not strings
- Output ONLY the raw JSON object`;

  const userMessage = JSON.stringify({
    current_month: currentMonth,
    monthly_category_summary: monthlyBreakdown,
    recent_transactions: txData.slice(0, 80),
    portfolio: { total_value: portfolioTotal, gain_loss: portfolioGain, holdings }
  }, null, 0);

  try {
    let insightText = await callClaudeWithWebSearch(systemPrompt, userMessage, 4096);

    // If Claude included markdown/preamble, extract just the JSON object
    try {
      JSON.parse(insightText);
    } catch {
      // Strip markdown fences if present
      const fenceMatch = insightText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (fenceMatch) {
        insightText = fenceMatch[1].trim();
      } else {
        // Find the outermost { ... } block
        const start = insightText.indexOf('{');
        const end = insightText.lastIndexOf('}');
        if (start !== -1 && end !== -1 && end > start) {
          insightText = insightText.slice(start, end + 1);
        }
      }
    }

    db.prepare('INSERT OR REPLACE INTO insights_cache (month, insight_text, generated_at) VALUES (?, ?, ?)').run(currentMonth, insightText, now);
    res.json({ month: currentMonth, insight_text: insightText, generated_at: now, cached: false });
  } catch (err) {
    if (err.code === 'NO_API_KEY') {
      return res.status(403).json({ error: 'NO_API_KEY', message: 'Add your Anthropic API key in Settings to use this feature.' });
    }
    console.error('[insights:generate]', err);
    res.status(500).json({ error: 'Insight generation failed. Please try again.' });
  }
}
