# FinBase

A self-hosted personal finance dashboard built with Next.js. Import bank statements, track spending, manage investments, set savings goals, and get AI-powered financial insights — all stored locally on your machine.

**No accounts. No cloud. No tracking. Just your finances, on your terms.**

---

## Quick Start

```bash
git clone https://github.com/ekow-korsah/finbase.git
cd finbase
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the database is created automatically on first run.

> **Need AI features?** Go to **Settings** in the sidebar and add your [Anthropic](https://console.anthropic.com) or [OpenAI](https://platform.openai.com/api-keys) API key. Without one, all non-AI features still work.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setting Up Your API Key](#setting-up-your-api-key)
- [Usage Guide](#usage-guide)
  - [Dashboard](#dashboard)
  - [Importing Transactions](#importing-transactions)
  - [Managing Transactions](#managing-transactions)
  - [Investment Tracking](#investment-tracking)
  - [Financial Goals](#financial-goals)
  - [Savings Buckets](#savings-buckets)
  - [AI Insights](#ai-insights)
  - [Settings & Rules](#settings--rules)
- [Architecture](#architecture)
  - [File Structure](#file-structure)
  - [Database](#database)
  - [Import Pipeline](#import-pipeline)
  - [AI Integration](#ai-integration)
- [API Reference](#api-reference)
- [Privacy & Security](#privacy--security)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

FinBase lets you upload your bank or credit card statements (PDF or CSV), and uses AI to automatically extract and categorize every transaction. From there you get a full financial dashboard — spending trends, money flow diagrams, portfolio tracking, savings buckets, and personalized financial insights powered by Claude or GPT-4o with live web data.

All data is stored in a local SQLite database on your machine. Nothing is sent to any third-party service except anonymized statement text sent to the AI API for parsing — and even then, all sensitive data (card numbers, SSNs, emails, phone numbers) is stripped before anything leaves your machine.

---

## Features

### Dashboard
- Monthly income, expenses, savings, and net flow summary cards
- Portfolio value with total return percentage
- 6-month income vs. expenses vs. savings bar chart
- Net flow line chart with gradient area fill
- Spending by category donut chart
- Top merchants horizontal bar chart
- Daily spending breakdown
- Money flow Sankey diagram (income sources → account → expense categories)
- Pinned AI insight strip

### Transaction Management
- Full transaction table with pagination (50 per page)
- Filter by month, category, or search by merchant/note
- Inline category recategorization (click any category badge)
- Edit modal with all fields
- Quick-tag buttons (+ Income, + Savings)
- Delete with confirmation
- Manually add transactions

### Statement Import
- Drag-and-drop or file browser for PDF and CSV bank statements
- Streaming progress UI with 6 steps (Reading → Extracting → Stripping → Analyzing → Saving → Done)
- AI extracts and categorizes every transaction automatically
- Sensitive data (card numbers, SSNs, emails, phone numbers) is stripped before anything is sent to the AI
- Duplicate-safe batch insert
- Works with any bank — the AI handles the parsing

### Investment Tracking
- Track holdings by name, ticker symbol, quantity, cost basis, and current value
- One-click price refresh via Yahoo Finance
- Supports US stocks, Canadian TSX tickers (`.TO`), crypto (`BTC-USD`), and more
- Gain/loss display in dollars and percentage
- Price age indicator shows when prices were last updated

### Financial Goals
- Set named savings goals with target amount and target date
- Monthly need vs. current savings rate comparison
- Projection chart (Projected vs. Needed line chart per goal)
- On Track / Behind status badge
- AI-powered spending cut suggestions per goal

### Savings Buckets
- Create named buckets for specific savings goals (e.g., "Emergency Fund", "Vacation")
- Set optional target amounts per bucket
- Add manual savings entries with dates and notes
- Track progress toward each bucket's target
- Transactions can be linked to specific buckets

### AI Insights
- AI reads your last 3+ months of transactions and generates a structured financial report
- Web search enabled — fetches current HYSA rates and market benchmarks
- Sections: Top Spending Categories, Subscription Creep, Savings Opportunities, Market Context
- 24-hour cache per month (regenerate any time)
- Staleness warning when cache is over 23 hours old

### Settings & Rules
- **Income Sources** — define salary/freelance sources with keyword matching for automatic categorization
- **Savings Destinations** — define investment accounts (RRSP, TFSA, brokerage) so those debits are tagged as Savings, not Expenses
- **Automatic Payment Filtering** — credit card payments showing as credits are automatically classified as Transfers, not Income
- **Apply rules** to all existing transactions with one click
- **AI Provider** — choose between Anthropic Claude or OpenAI
- **API Key** — set your key directly in the app (no `.env` file required)

### UI
- Dark and light themes (toggle in sidebar, persisted across sessions)
- `DM Sans` body font, `Syne` display font, `JetBrains Mono` for all numbers
- Animated view transitions, skeleton loaders
- Fully local — no accounts, no cloud sync, no tracking

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) 14 |
| UI | React 18 |
| Database | SQLite via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) |
| AI | [Anthropic Claude](https://anthropic.com) or [OpenAI GPT-4o](https://openai.com) |
| Charts | [Chart.js](https://chartjs.org) (CDN) |
| PDF Parsing | [pdf-parse](https://www.npmjs.com/package/pdf-parse) |
| File Upload | [busboy](https://github.com/mscdex/busboy) |
| Fonts | DM Sans, Syne, JetBrains Mono (Google Fonts) |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher — [download here](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)
- An AI API key (for import and insights features):
  - [Anthropic API key](https://console.anthropic.com) (recommended), OR
  - [OpenAI API key](https://platform.openai.com/api-keys)

> Without an API key, you can still use all non-AI features: manual transactions, investments, goals, savings buckets, and the full dashboard.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ekow-korsah/finbase.git
cd finbase

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. That's it — the database is created automatically on first run.

### Setting Up Your API Key

You have two options:

**Option A: In-app (recommended)**

1. Open FinBase in your browser
2. Go to **Settings** in the sidebar
3. Choose your AI provider (Anthropic or OpenAI)
4. Paste your API key and save

**Option B: Environment file**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

The in-app setting takes precedence over the environment variable.

> **Cost note:** Import and Insights use `claude-sonnet-4-20250514` (Anthropic) or `gpt-4o` (OpenAI). A typical monthly statement (100–300 transactions) uses roughly 2,000–8,000 input tokens. Insights generation uses up to 2,048 output tokens plus up to 3 web searches. See your provider's pricing page for current rates.

### Database Location

The SQLite database is created automatically at:

| OS | Path |
|---|---|
| macOS | `~/Library/Application Support/finbase/finbase.db` |
| Linux | `~/.local/share/finbase/finbase.db` |
| Windows | `%APPDATA%/finbase/finbase.db` |

### Production Build

```bash
npm run build    # Build production bundle
npm run start    # Serve production build on http://localhost:3000
```

---

## Usage Guide

### Dashboard

The dashboard is the home screen. It shows your financial overview for the selected month:

- **Summary cards** — income, expenses, savings, net flow, and portfolio value
- **Trend chart** — 6-month bar chart comparing income, expenses, and savings
- **Net flow chart** — line chart with gradient fill showing your monthly surplus/deficit
- **Category breakdown** — donut chart of spending by category
- **Top merchants** — horizontal bar chart of your biggest expenses
- **Daily spending** — bar chart showing spend per day
- **Money flow** — Sankey diagram showing how money flows from income sources through to expense categories
- **Recent transactions** — quick view of latest entries

Use the month picker to navigate between months.

### Importing Transactions

1. Click **Import** in the sidebar
2. Drag and drop a PDF or CSV bank statement onto the drop zone, or click to browse
3. Watch the 6-step progress bar:
   - **Reading** — parsing the uploaded file
   - **Extracting** — pulling text from PDF or decoding CSV
   - **Stripping** — removing sensitive data (card numbers, SSNs, emails, etc.)
   - **Analyzing** — AI extracts and categorizes each transaction
   - **Saving** — batch insert into the database
   - **Done** — shows how many transactions were imported
4. Click **View Transactions** to review, or **Import Another** to continue

**Supported formats:**
- PDF bank and credit card statements (any bank — the AI handles the parsing)
- CSV files exported from online banking portals

**What the AI receives:** Only merchant names, dates, and amounts. All account numbers, card numbers, SSNs, emails, phone numbers, and name fields are removed before any text leaves your machine.

### Managing Transactions

- Use the **Transactions** view to browse all imported and manual transactions
- **Filter** by month, category, or search by merchant name or note
- **Click any row** to open the edit modal — change date, merchant, amount, category, note, or delete
- **Click a category badge** to inline-recategorize without opening the modal
- Use **+ Income** / **+ Savings** quick-tag buttons to flag ambiguous transactions
- **Add Transaction** in the sidebar to manually record a transaction

### Investment Tracking

1. Go to **Investments** in the sidebar
2. Click **Add Holding** and enter:
   - Asset name (e.g., "S&P 500 ETF")
   - Ticker symbol (e.g., `AAPL`, `VFV.TO`, `BTC-USD`) — optional but needed for price refresh
   - Quantity, cost basis, and current value
3. Click **Refresh Prices** to fetch live prices from Yahoo Finance for all holdings with a ticker
4. The table shows cost basis, current value, gain/loss in dollars, and return percentage

**Supported tickers:**
- US stocks: `AAPL`, `GOOGL`, `SPY`, etc.
- Canadian TSX: `VFV.TO`, `XEQT.TO` (`.TO` suffix auto-attempted if missing)
- Crypto: `BTC-USD`, `ETH-USD`
- Any ticker Yahoo Finance supports

### Financial Goals

1. Go to **Goals** in the sidebar and click **Add Goal**
2. Enter the goal name, target amount, and target date
3. Each goal card shows:
   - How much you need to save per month to hit the target
   - Your current savings rate
   - A projection chart comparing your trajectory to the required one
   - **On Track** or **Behind** status
4. Click **AI Suggestions** on any goal to have the AI analyze your spending and suggest specific categories to cut back

### Savings Buckets

1. Go to **Savings** in the sidebar
2. Click **Add Bucket** and give it a name and optional target amount
3. Add manual entries to track contributions (date, amount, optional note)
4. Watch the progress bar fill as you save toward each bucket's target
5. Link transactions to specific buckets for automatic tracking

### AI Insights

1. Go to **AI Insights** in the sidebar and click **Generate Insights**
2. The AI analyzes your last 3+ months of transactions alongside current financial data (fetched via web search) and produces a structured report:
   - **Top spending categories** with trend direction
   - **Subscription creep** — recurring charges with recommendations
   - **Savings opportunities** — specific cuts with estimated monthly impact
   - **Market context** — current HYSA rates, relevant benchmarks, portfolio feedback
   - **Action items** — 3–6 prioritized next steps
   - **Key alerts** — important warnings or positive notes
3. Results are cached for 24 hours. A staleness warning appears after 23 hours. Click **Generate Insights** again to refresh.

### Settings & Rules

**AI Provider**

Choose between Anthropic Claude (recommended) or OpenAI, and enter your API key. The key is stored locally in the database — it never leaves your machine except when making API calls.

**Income Sources**

Define where your income comes from so it's always categorized correctly:

| Field | Example |
|---|---|
| Source Name | `Acme Corp Salary` |
| Keywords | `ACME CORP, ACME PAYROLL` |
| Category | `Salary` or `Income` |

Imported transactions matching these keywords will be automatically tagged with the correct category.

**Savings Destinations**

Define investment and savings accounts so transfers to them are counted as savings, not expenses:

| Field | Example |
|---|---|
| Destination Name | `Vanguard Brokerage` |
| Keywords | `VANGUARD, VGI TRANSFER` |

Debit transactions matching these keywords are categorized as `Savings`.

**Apply Rules**

After adding or changing rules, click **Apply Rules to All Transactions** to reprocess your entire transaction history with the updated rules.

---

## Architecture

### File Structure

```
finbase/
├── .env.example                        # Environment template
├── next.config.js                      # Next.js + Webpack config
├── package.json
│
├── lib/
│   ├── db.js                           # SQLite connection, schema, WAL mode
│   ├── claude.js                       # AI SDK wrappers (Anthropic + OpenAI)
│   ├── strip.js                        # Regex-based sensitive data removal
│   └── ratelimit.js                    # In-memory rate limiting
│
├── pages/
│   ├── _app.js                         # Global CSS import
│   ├── _document.js                    # Font loading, theme script
│   ├── index.js                        # Single-page app (all views + routing)
│   │
│   └── api/
│       ├── import.js                   # Upload → AI → DB (SSE streaming)
│       ├── settings.js                 # Get/save settings
│       ├── categories.js               # Static category list
│       ├── transactions/               # CRUD + summary + rules
│       ├── holdings/                   # CRUD + Yahoo Finance refresh
│       ├── goals/                      # CRUD + projection + AI suggestions
│       ├── savings-buckets/            # CRUD + manual entries
│       ├── income-sources/             # CRUD
│       ├── savings-destinations/       # CRUD
│       ├── insights/                   # Generate + cache
│       └── dashboard/                  # Summary, charts, money flow
│
└── styles/
    └── globals.css                     # Design system (CSS variables, components)
```

### Database

FinBase uses SQLite with WAL (Write-Ahead Logging) for concurrency. The database and all tables are created automatically on first run — no setup required.

**Tables:**
- `transactions` — all imported and manual transactions
- `holdings` — investment portfolio entries
- `goals` — financial goals with targets and dates
- `savings_buckets` — named savings buckets with optional targets
- `savings_manual_entries` — manual contributions to buckets
- `income_sources` — keyword rules for income categorization
- `savings_destinations` — keyword rules for savings categorization
- `insights_cache` — cached AI-generated reports (per month)
- `settings` — app configuration (API key, provider, etc.)

### Import Pipeline

When you upload a statement, the server streams progress back to the browser via Server-Sent Events (SSE):

```
Upload (multipart/form-data)
    │
    ▼
[1] READING (10%)        — Parse uploaded file with busboy
    ▼
[2] EXTRACTING (25%)     — PDF → text extraction, CSV → UTF-8 decode
    ▼
[3] STRIPPING (40%)      — Remove card numbers, SSNs, emails, phones, names
    ▼
[4] ANALYZING (55%)      — AI extracts & categorizes transactions (JSON)
    ▼                      Post-process: apply income/savings rules
[5] SAVING (80%)         — Batch insert in a single SQLite transaction
    ▼
[6] DONE (100%)          — Return count & errors
```

### AI Integration

The AI is used in three places:

| Feature | Purpose | Web Search |
|---|---|---|
| **Import** | Parse statement text into structured transactions | No |
| **Insights** | Analyze spending trends with current market context | Yes (up to 3 searches) |
| **Goal Suggestions** | Recommend spending cuts to reach a savings goal | Yes |

Supported providers:
- **Anthropic Claude** (recommended) — uses the Claude API with web search tool
- **OpenAI GPT-4o** — alternative provider, configurable in settings

---

## API Reference

All endpoints live under `/api/`. The app uses these internally — they're also available if you want to build your own frontend or scripts.

### Transactions

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/transactions` | List transactions. Query: `page`, `pageSize`, `month`, `category`, `search` |
| `POST` | `/api/transactions` | Create. Body: `{ date, merchant, amount, category?, note? }` |
| `PUT` | `/api/transactions/[id]` | Update. Body: `{ fields: { ...changes } }` |
| `DELETE` | `/api/transactions/[id]` | Delete |
| `GET` | `/api/transactions/summary` | Monthly totals. Query: `month` |
| `POST` | `/api/transactions/apply-income-rules` | Re-apply all income/savings rules |

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/summary` | Income, expenses, savings, net flow, portfolio |
| `GET` | `/api/dashboard/charts` | Trends, categories, merchants, daily spending |
| `GET` | `/api/dashboard/money-flow` | Sankey diagram data |

### Holdings

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/holdings` | List all holdings |
| `POST` | `/api/holdings` | Add. Body: `{ name, ticker?, quantity?, cost_basis?, current_value }` |
| `PUT` | `/api/holdings/[id]` | Update |
| `DELETE` | `/api/holdings/[id]` | Delete |
| `POST` | `/api/holdings/refresh-prices` | Fetch latest prices from Yahoo Finance |

### Goals

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/goals` | List all goals |
| `POST` | `/api/goals` | Create. Body: `{ name, target_amount, target_date }` |
| `PUT` | `/api/goals/[id]` | Update |
| `DELETE` | `/api/goals/[id]` | Delete |
| `GET` | `/api/goals/[id]/projection` | Monthly projection data |
| `POST` | `/api/goals/[id]/suggest` | AI spending cut suggestions |

### Savings Buckets

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/savings-buckets` | List all buckets |
| `POST` | `/api/savings-buckets` | Create. Body: `{ name, target_amount? }` |
| `PUT` | `/api/savings-buckets/[id]` | Update |
| `DELETE` | `/api/savings-buckets/[id]` | Delete |
| `GET` | `/api/savings-buckets/[id]/entries` | List entries for a bucket |
| `POST` | `/api/savings-buckets/[id]/entries` | Add entry. Body: `{ amount, date, note? }` |
| `DELETE` | `/api/savings-buckets/[id]/entries/[entryId]` | Delete entry |

### Insights

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/insights/generate` | Generate AI insights. Body: `{ months?: number }` |
| `GET` | `/api/insights/latest` | Get cached insight for current month |
| `GET` | `/api/insights/all` | Get all cached insights by month |

### Income Sources & Savings Destinations

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/income-sources` | List income sources |
| `POST` | `/api/income-sources` | Create. Body: `{ name, keywords, category? }` |
| `DELETE` | `/api/income-sources/[id]` | Delete |
| `GET` | `/api/savings-destinations` | List savings destinations |
| `POST` | `/api/savings-destinations` | Create. Body: `{ name, keywords }` |
| `DELETE` | `/api/savings-destinations/[id]` | Delete |

### Other

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/import` | Upload PDF/CSV. `multipart/form-data` with `file` field. Returns SSE stream. |
| `GET` | `/api/categories` | Static list of all transaction categories |
| `GET/POST` | `/api/settings` | Get or save app settings |

---

## Privacy & Security

FinBase is designed with privacy as a default:

- **100% local.** All data is stored in a SQLite file on your machine. Nothing is uploaded to any server.
- **Sensitive data is stripped before AI processing.** Card numbers, account numbers, SSNs, routing numbers, email addresses, and phone numbers are removed via regex before any text is sent to the AI. Only merchant names, dates, and amounts are sent.
- **No analytics, no telemetry, no accounts.** The app makes no outbound requests except:
  - The AI API (Anthropic or OpenAI) — only when you explicitly trigger import or insights
  - Yahoo Finance — only when you click Refresh Prices on investments
- **API keys are stored locally** in the SQLite database, never sent anywhere except to the respective AI provider.
- **Rate limiting** is built in to prevent accidental overuse (20 imports/hour, 5 insights/hour).
- **File validation** checks PDF magic bytes and enforces a 25 MB size limit on uploads.

---

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b my-feature`
3. Make your changes
4. Test locally with `npm run dev`
5. Commit and push: `git push origin my-feature`
6. Open a Pull Request

Please keep PRs focused on a single change. If you find a bug, feel free to open an issue.

---

## License

MIT
