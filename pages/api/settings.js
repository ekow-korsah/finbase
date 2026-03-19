import { getDB } from '../../lib/db';

export default function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    const { key } = req.query;
    if (!key) {
      // Return all settings as { key: value } map
      const rows = db.prepare('SELECT key, value FROM settings').all();
      const map = {};
      for (const r of rows) map[r.key] = r.value;
      return res.json(map);
    }
    const row = db.prepare('SELECT * FROM settings WHERE key = ?').get(key);
    if (!row) return res.status(404).json(null);
    return res.json(row);
  }

  if (req.method === 'POST') {
    const { key, value } = req.body;
    if (!key) return res.status(400).json({ error: 'key is required' });
    const ALLOWED_KEYS = new Set(['ai_api_key', 'ai_provider', 'anthropic_api_key', 'buckets_onboarding_done']);
    if (!ALLOWED_KEYS.has(key)) return res.status(400).json({ error: 'invalid key' });
    db.prepare(
      'INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, unixepoch())'
    ).run(key, value);
    return res.json({ key, value });
  }

  res.status(405).end();
}
