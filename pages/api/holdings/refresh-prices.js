import { getDB } from '../../../lib/db';

async function fetchPrice(ticker) {
  const url = 'https://query1.finance.yahoo.com/v8/finance/chart/' + encodeURIComponent(ticker) + '?interval=1d&range=1d';
  const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await resp.json();
  const meta = data?.chart?.result?.[0]?.meta;
  if (!meta?.regularMarketPrice) throw new Error('No price returned');
  return meta.regularMarketPrice;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const db = getDB();

  const holdings = db.prepare("SELECT * FROM holdings WHERE ticker IS NOT NULL AND ticker != '' AND quantity IS NOT NULL").all();
  const results = { updated: [], failed: [] };
  const now = Math.floor(Date.now() / 1000);

  if (!holdings.length) return res.json({ ...results, skipped: 'No holdings with ticker + quantity' });

  for (const h of holdings) {
    if (!/^[A-Z0-9.\-]{1,12}$/i.test(h.ticker)) {
      results.failed.push(h.ticker);
      continue;
    }
    try {
      let price;
      let resolvedTicker = h.ticker;

      try {
        price = await fetchPrice(h.ticker);
      } catch (e) {
        // If ticker has no exchange suffix, retry with .TO (TSX)
        if (!h.ticker.includes('.')) {
          resolvedTicker = h.ticker + '.TO';
          price = await fetchPrice(resolvedTicker);
          // Save the resolved ticker back so future refreshes work directly
          db.prepare('UPDATE holdings SET ticker = ? WHERE id = ?').run(resolvedTicker, h.id);
        } else {
          throw e;
        }
      }

      const newValue = price * h.quantity;
      db.prepare('UPDATE holdings SET last_price = ?, price_fetched_at = ?, current_value = ?, updated_at = ? WHERE id = ?')
        .run(price, now, newValue, now, h.id);
      results.updated.push({ ticker: resolvedTicker, price, value: newValue });
    } catch (e) {
      results.failed.push(h.ticker);
    }
    await new Promise(r => setTimeout(r, 400));
  }
  res.json(results);
}
