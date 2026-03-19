const { getApiKey, getAiProvider } = require('./db');

async function callOpenAI(apiKey, systemPrompt, userMessage, maxTokens, temperature) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: maxTokens,
      temperature,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ]
    })
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'OpenAI API error ' + response.status);
  }
  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function callClaude(cleanText, fileType, incomeSources = [], savingsDests = []) {
  const apiKey = getApiKey();
  if (!apiKey) throw Object.assign(new Error('No API key configured'), { code: 'NO_API_KEY' });
  const provider = getAiProvider();

  const systemPrompt = `You are a financial transaction parser. Return ONLY a valid JSON array.
Each object: { date: "YYYY-MM-DD", merchant: string, amount: number, category: string, note?: string }

AMOUNT SIGNS (apply strictly):
- Purchases, charges, fees, interest = NEGATIVE
- Payments, refunds, cashback, credits = POSITIVE
- Credit card: purchases negative, payments positive
- Bank: withdrawals negative, deposits positive

CATEGORIES — pick the single best match:
Groceries, Coffee, Dining Out, Food Delivery, Subscriptions, Gas, Pharmacy,
Shopping, Entertainment, Transportation, Utilities, Healthcare, Travel,
Income, Salary, Rent Income, Savings, Transfers, ATM/Cash, Fees & Interest, Uncategorized

CATEGORY RULES:
- Salary = regular employer paycheck, bi-weekly, same source
- Income = one-off income: freelance, cashback, tax refund
- Savings = transfers/debits to investment accounts, RRSP, TFSA, brokerage
- Rent Income = rent collected from tenants (positive deposits referencing rent, lease, or tenant name)
- Subscriptions = monthly recurring: Netflix, Spotify, Adobe, SaaS
- Food Delivery = DoorDash, Uber Eats, Grubhub, Deliveroo
- Coffee = Starbucks, Peet's, Dutch Bros, local cafés
- Gas = Shell, BP, Chevron, fuel stations

INCOME RULES:
- Income/Salary: ONLY when merchant matches a VERIFIED INCOME SOURCE listed below
- Savings: ONLY when merchant matches a SAVINGS DESTINATION listed below
- ALL other positive amounts (e-transfers, ACH credits, loan deposits, account transfers) → "Transfers"
- ALL other negative amounts not matched by savings destinations → use expense categories
- Never guess income or savings — only match verified sources

ANOMALY DETECTION:
If a merchant appears multiple times and one amount is 2x+ the median,
add note: "[ANOMALY: Xx usual]" (round to 1 decimal)

TRANSFERS — always categorize as "Transfers" (never as income):
- Payments to credit card, loan, or line of credit
- Descriptions containing: PAYMENT RECEIVED, PAYMENT THANK YOU, AUTOPAY, ONLINE PAYMENT,
  ONLINE PMT, ACH PAYMENT, ACH CREDIT, ACH DEPOSIT, BILL PAY, E-PAYMENT, MINIMUM PAYMENT,
  STATEMENT BALANCE, BALANCE TRANSFER, DIRECT PAY, DIRECT DEPOSIT, PAYROLL, SALARY,
  E-TRANSFER, ETRANSFER, INTERAC, TRANSFER FROM, TRANSFER TO, ACCOUNT TRANSFER,
  MOBILE TRANSFER, FROM SAVINGS, FROM CHEQUING, FROM CHECKING, WIRE TRANSFER
- Refunds/reversals from merchants: use the merchant's expense category (positive amount)${incomeSources.length > 0 ? '\n\nVERIFIED INCOME SOURCES (always use the specified category — never override with Transfers):\n' + incomeSources.map(s => '- ' + s.name + ': keywords [' + s.keywords + '] → ' + s.category).join('\n') : ''}${savingsDests.length > 0 ? '\n\nSAVINGS DESTINATIONS (transfers/debits to these → always "Savings"):\n' + savingsDests.map(s => '- ' + s.name + ': keywords [' + s.keywords + ']').join('\n') : ''}

OUTPUT RULES:
- Raw JSON array only — no markdown fences, no commentary
- Omit rows missing date OR amount
- Return [] if no transactions found
- note field is optional — omit entirely if nothing to flag`;

  const userMessage = 'Parse transactions from this ' + fileType + ' statement:\n---\n' + cleanText + '\n---';

  let raw;
  if (provider === 'openai') {
    raw = await callOpenAI(apiKey, systemPrompt, userMessage, 8192, 0);
  } else {
    const Anthropic = require('@anthropic-ai/sdk');
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 8192,
      temperature: 0,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });
    raw = response.content[0].text.trim();
  }

  const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(cleaned);
}

async function callClaudeWithWebSearch(systemPrompt, userMessage, maxTokens = 4096) {
  const apiKey = getApiKey();
  if (!apiKey) throw Object.assign(new Error('No API key configured'), { code: 'NO_API_KEY' });
  const provider = getAiProvider();

  if (provider === 'openai') {
    return callOpenAI(apiKey, systemPrompt, userMessage, maxTokens, 1);
  }

  const Anthropic = require('@anthropic-ai/sdk');
  const anthropic = new Anthropic({ apiKey });
  const response = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: maxTokens,
    temperature: 1,
    tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }]
  }, {
    headers: { 'anthropic-beta': 'web-search-2025-03-05' }
  });
  return response.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('\n');
}

module.exports = { callClaude, callClaudeWithWebSearch };
