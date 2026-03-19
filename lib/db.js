const path = require('path');
const os = require('os');
const fs = require('fs');

function getDbDir() {
  const home = os.homedir();
  if (process.platform === 'darwin') {
    return path.join(home, 'Library', 'Application Support', 'finbase');
  } else if (process.platform === 'win32') {
    return path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'finbase');
  }
  return path.join(process.env.XDG_DATA_HOME || path.join(home, '.local', 'share'), 'finbase');
}

function getDB() {
  if (global._finbaseDb) return global._finbaseDb;
  const Database = require('better-sqlite3');
  const dbDir = getDbDir();
  fs.mkdirSync(dbDir, { recursive: true });
  const dbPath = path.join(dbDir, 'finbase.db');
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      merchant TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL DEFAULT 'Uncategorized',
      note TEXT,
      source TEXT NOT NULL DEFAULT 'manual',
      raw_text TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE INDEX IF NOT EXISTS idx_tx_date ON transactions(date);
    CREATE INDEX IF NOT EXISTS idx_tx_category ON transactions(category);

    CREATE TABLE IF NOT EXISTS holdings (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      name             TEXT NOT NULL,
      ticker           TEXT,
      currency         TEXT NOT NULL DEFAULT 'USD',
      quantity         REAL,
      cost_basis       REAL,
      current_value    REAL NOT NULL,
      last_price       REAL,
      price_fetched_at INTEGER,
      notes            TEXT,
      created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at       INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS settings (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS insights_cache (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      month        TEXT NOT NULL UNIQUE,
      insight_text TEXT NOT NULL,
      generated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS goals (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT NOT NULL,
      target_amount REAL NOT NULL CHECK(target_amount > 0),
      target_date   TEXT NOT NULL,
      created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS income_sources (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      keywords   TEXT NOT NULL,
      category   TEXT NOT NULL DEFAULT 'Salary',
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS savings_destinations (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      keywords   TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS savings_buckets (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT NOT NULL,
      target_amount REAL,
      sort_order    INTEGER NOT NULL DEFAULT 0,
      created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS savings_manual_entries (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      bucket_id INTEGER NOT NULL REFERENCES savings_buckets(id) ON DELETE CASCADE,
      amount    REAL NOT NULL CHECK(amount > 0),
      date      TEXT NOT NULL,
      note      TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE INDEX IF NOT EXISTS idx_sme_bucket ON savings_manual_entries(bucket_id);
  `);

  // Migrate transactions table
  const txCols = db.prepare('PRAGMA table_info(transactions)').all().map(c => c.name);
  if (!txCols.includes('is_income_verified')) db.exec('ALTER TABLE transactions ADD COLUMN is_income_verified INTEGER NOT NULL DEFAULT 0');

  // Migrate transactions table — savings_bucket_id
  const txCols2 = db.prepare('PRAGMA table_info(transactions)').all().map(c => c.name);
  if (!txCols2.includes('savings_bucket_id'))
    db.exec('ALTER TABLE transactions ADD COLUMN savings_bucket_id INTEGER REFERENCES savings_buckets(id) ON DELETE SET NULL');

  // Migrate holdings table
  const holdingsCols = db.prepare('PRAGMA table_info(holdings)').all().map(c => c.name);
  if (!holdingsCols.includes('cost_basis'))       db.exec('ALTER TABLE holdings ADD COLUMN cost_basis REAL');
  if (!holdingsCols.includes('ticker'))           db.exec('ALTER TABLE holdings ADD COLUMN ticker TEXT');
  if (!holdingsCols.includes('last_price'))       db.exec('ALTER TABLE holdings ADD COLUMN last_price REAL');
  if (!holdingsCols.includes('price_fetched_at')) db.exec('ALTER TABLE holdings ADD COLUMN price_fetched_at INTEGER');

  global._finbaseDb = db;
  return db;
}

function getApiKey() {
  const db = getDB();
  const row = db.prepare("SELECT value FROM settings WHERE key = 'ai_api_key'").get();
  if (row?.value) return row.value;
  // backward compat with old setting name
  const legacy = db.prepare("SELECT value FROM settings WHERE key = 'anthropic_api_key'").get();
  if (legacy?.value) return legacy.value;
  return process.env.ANTHROPIC_API_KEY || null;
}

function getAiProvider() {
  const db = getDB();
  const row = db.prepare("SELECT value FROM settings WHERE key = 'ai_provider'").get();
  return row?.value || 'anthropic';
}

module.exports = { getDB, getApiKey, getAiProvider };
