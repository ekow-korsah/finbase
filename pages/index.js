import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Head>
        <title>FinBase</title>
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js" strategy="beforeInteractive" />

      <div id="app">

        {/* ── Sidebar ── */}
        <aside id="sidebar">
          <div className="logo">
            <div className="logo-icon">F</div>
            <span className="logo-text">FinBase</span>
          </div>
          <nav>
            <div className="nav-label">Menu</div>
            <div className="nav-item active" data-view="dashboard">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              Dashboard
            </div>
            <div className="nav-item" data-view="transactions">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              Transactions
            </div>
            <div className="nav-item" data-view="import">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              Import
            </div>
            <div className="nav-item" data-view="add">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              Add Transaction
            </div>
            <div className="nav-item" data-view="investments">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              Investments
            </div>
            <div className="nav-item" data-view="insights">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              AI Insights
            </div>
            <div className="nav-item" data-view="savings">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Savings
            </div>
            <div className="nav-item" data-view="settings">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
              Settings
            </div>
          </nav>
          <div className="sidebar-footer" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'8px'}}>
            <span>v2.0.0 · Web</span>
            <button className="theme-toggle" id="theme-toggle" title="Toggle light/dark mode">
              <svg id="theme-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75 9.75 9.75 0 018.25 6c0-1.33.267-2.597.748-3.752A9.75 9.75 0 1021.752 15z"/>
              </svg>
              <span id="theme-label">Light</span>
            </button>
          </div>
        </aside>

        {/* ── Content ── */}
        <main id="content">

          {/* ── Dashboard ── */}
          <section id="view-dashboard" className="view active">
            <div className="page-header">
              <div>
                <div className="page-title">Dashboard</div>
                <div className="page-sub">Your financial overview</div>
              </div>
              <div className="page-header-actions">
                <select id="dash-month" style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'7px',color:'var(--text)',padding:'8px 12px',fontSize:'13px',fontFamily:'Inter,sans-serif',outline:'none'}}></select>
              </div>
            </div>

            <div className="stat-grid stat-grid-4" id="stat-grid">
              <div className="stat-card">
                <div className="stat-label">Total Income</div>
                <div className="stat-value income mono" id="stat-income">—</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Expenses</div>
                <div className="stat-value expenses mono" id="stat-expenses">—</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Savings</div>
                <div className="stat-value mono" id="stat-savings" style={{color:'var(--gold)'}}>—</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Net Flow</div>
                <div className="stat-value net mono" id="stat-net">—</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Portfolio Value</div>
                <div className="stat-value mono" id="stat-portfolio" style={{color:'var(--gold)'}}>—</div>
                <div className="stat-sub" id="stat-portfolio-change"></div>
              </div>
            </div>

            {/* ── Savings Progress Widget ── */}
            <div id="dash-buckets-widget" style={{display:'none', marginBottom:'18px'}}>
              <div className="card">
                <div className="chart-card-header">
                  <div className="section-title" style={{marginBottom:0}}>Savings Progress</div>
                  <button className="btn btn-outline btn-sm" id="btn-dash-manage-buckets">Manage</button>
                </div>
                <div id="dash-buckets-list"></div>
                <div id="dash-buckets-show-more" style={{display:'none', marginTop:'10px', textAlign:'center'}}>
                  <button className="btn btn-outline btn-sm" id="btn-buckets-toggle"></button>
                </div>
              </div>
            </div>

            {/* AI Intelligence card */}
            <div className="ai-intel-card" id="dash-ai-intel" style={{display:'none'}}>
              <div className="ai-intel-header">
                <div className="ai-intel-label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                  AI Intelligence
                </div>
                <button className="btn btn-outline btn-sm" id="btn-dash-view-insights">View All →</button>
              </div>
              <div className="ai-intel-summary" id="dash-ai-summary"></div>
              <div className="ai-intel-actions" id="dash-ai-actions"></div>
            </div>

            {/* Full-width Monthly Trend */}
            <div className="card" style={{marginBottom:'20px'}}>
              <div className="chart-card-header">
                <div className="section-title" style={{marginBottom:0}}>Monthly Trend</div>
                <button className="btn btn-outline btn-sm chart-expand-btn" data-chart-expand="trend" title="Expand chart">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width:'13px',height:'13px',display:'block'}}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                </button>
              </div>
              <div className="chart-wrap-tall"><canvas id="chart-trend"></canvas></div>
            </div>

            {/* 2-col: Net Flow + Spending Donut */}
            <div className="dash-charts-row2" style={{marginBottom:'20px'}}>
              <div className="card">
                <div className="chart-card-header">
                  <div className="section-title" style={{marginBottom:0}}>Net Flow</div>
                  <button className="btn btn-outline btn-sm chart-expand-btn" data-chart-expand="netflow" title="Expand chart">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width:'13px',height:'13px',display:'block'}}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                  </button>
                </div>
                <div className="chart-wrap-tall"><canvas id="chart-netflow"></canvas></div>
              </div>
              <div className="card">
                <div className="chart-card-header">
                  <div className="section-title" style={{marginBottom:0}}>Spending by Category</div>
                  <button className="btn btn-outline btn-sm chart-expand-btn" data-chart-expand="donut" title="Expand chart">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width:'13px',height:'13px',display:'block'}}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                  </button>
                </div>
                <div className="chart-donut-wrap"><canvas id="chart-donut"></canvas></div>
                <div id="donut-legend"></div>
              </div>
            </div>

            {/* Full-width Top Merchants */}
            <div className="card" style={{marginBottom:'20px'}}>
              <div className="chart-card-header">
                <div className="section-title" style={{marginBottom:0}}>Top Merchants</div>
                <button className="btn btn-outline btn-sm chart-expand-btn" data-chart-expand="merchants" title="Expand chart">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width:'13px',height:'13px',display:'block'}}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                </button>
              </div>
              <div className="chart-wrap-medium"><canvas id="chart-merchants"></canvas></div>
            </div>

            {/* Money Flow Sankey */}
            <div className="card" style={{marginBottom:'20px'}}>
              <div className="chart-card-header">
                <div className="section-title" style={{marginBottom:0}}>Money Flow</div>
                <button className="btn btn-outline btn-sm chart-expand-btn" data-chart-expand="sankey" title="Expand chart">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width:'13px',height:'13px',display:'block'}}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                </button>
              </div>
              <div id="sankey-container" style={{position:'relative',minHeight:'200px'}}>
                <svg id="sankey-svg" style={{width:'100%',display:'block'}}></svg>
                <div id="sankey-tooltip" style={{display:'none',position:'absolute',pointerEvents:'none',background:'var(--card)',border:'1px solid var(--border)',borderRadius:'8px',padding:'8px 12px',fontSize:'12px',boxShadow:'0 4px 12px rgba(0,0,0,0.15)',zIndex:10,whiteSpace:'nowrap'}}></div>
                <div id="sankey-empty" style={{display:'none',textAlign:'center',padding:'40px',color:'var(--muted)',fontSize:'13px'}}>No transactions for this period</div>
              </div>
            </div>

            {/* Bottom 2-col: Recent Transactions + Daily Spending */}
            <div className="dash-grid">
              <div className="card">
                <div className="section-title">Recent Transactions</div>
                <div className="table-wrap">
                  <table id="dash-table">
                    <thead>
                      <tr>
                        <th>Merchant</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th className="right">Amount</th>
                      </tr>
                    </thead>
                    <tbody id="dash-tbody"></tbody>
                  </table>
                </div>
              </div>
              <div className="card">
                <div className="chart-card-header">
                  <div className="section-title" style={{marginBottom:0}}>Daily Spending</div>
                  <button className="btn btn-outline btn-sm chart-expand-btn" data-chart-expand="daily" title="Expand chart">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width:'13px',height:'13px',display:'block'}}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                  </button>
                </div>
                <div className="chart-wrap-medium"><canvas id="chart-daily"></canvas></div>
              </div>
            </div>
          </section>

          {/* ── Chart Expand ── */}
          <section id="view-chart-expand" className="view">
            <div className="page-header" style={{marginBottom:'20px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                <button className="btn btn-outline" id="expand-back" style={{display:'flex',alignItems:'center',gap:'6px'}}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width:'14px',height:'14px'}}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                  Dashboard
                </button>
                <div className="page-title" id="expand-title" style={{fontSize:'20px'}}></div>
              </div>
              <div id="expand-period-label" style={{fontSize:'12px',color:'var(--muted)',fontFamily:"'JetBrains Mono',monospace",letterSpacing:'0.04em'}}></div>
            </div>
            <div className="card" style={{marginBottom:'20px'}}>
              <div id="expand-chart-wrap" style={{position:'relative',height:'420px'}}>
                <canvas id="expand-canvas"></canvas>
              </div>
              <div id="expand-sankey-wrap" style={{display:'none',position:'relative',minHeight:'420px'}}>
                <svg id="expand-sankey-svg" style={{width:'100%',display:'block'}}></svg>
                <div id="expand-sankey-empty" style={{display:'none',textAlign:'center',padding:'60px',color:'var(--muted)',fontSize:'13px'}}>No data for this period</div>
                <div id="expand-sankey-tooltip" style={{display:'none',position:'absolute',pointerEvents:'none',background:'var(--card)',border:'1px solid var(--border)',borderRadius:'8px',padding:'8px 12px',fontSize:'12px',boxShadow:'0 4px 12px rgba(0,0,0,0.15)',zIndex:10,whiteSpace:'nowrap'}}></div>
              </div>
              <div id="expand-donut-legend" style={{display:'none',marginTop:'14px',display:'flex',flexWrap:'wrap',gap:'6px 12px'}}></div>
            </div>
            <div id="expand-insights"></div>
          </section>

          {/* ── Transactions ── */}
          <section id="view-transactions" className="view">
            <div className="page-header">
              <div>
                <div className="page-title">Transactions</div>
                <div className="page-sub">Browse, filter, and edit your transactions</div>
              </div>
            </div>

            <div className="filter-bar">
              <select id="filter-month">
                <option value="">All Time</option>
              </select>
              <select id="filter-cat">
                <option value="">All Categories</option>
              </select>
              <input id="filter-search" type="text" placeholder="Search merchant or note…" />
            </div>

            <div className="card" style={{padding:0,overflow:'hidden'}}>
              <div className="table-wrap">
                <table id="tx-table">
                  <thead>
                    <tr>
                      <th>Merchant</th>
                      <th>Category</th>
                      <th>Note</th>
                      <th>Date</th>
                      <th>Source</th>
                      <th className="right">Amount</th>
                      <th>Tag</th>
                    </tr>
                  </thead>
                  <tbody id="tx-tbody"></tbody>
                </table>
              </div>
            </div>
            <div className="pagination">
              <span id="tx-count-label">—</span>
              <div className="page-btns">
                <button className="btn-page" id="btn-prev">← Prev</button>
                <button className="btn-page" id="btn-next">Next →</button>
              </div>
            </div>
          </section>

          {/* ── Import ── */}
          <section id="view-import" className="view">
            <div className="page-header">
              <div>
                <div className="page-title">Import Statements</div>
                <div className="page-sub">Upload PDF or CSV bank statements — only anonymized text is sent to your AI provider</div>
              </div>
            </div>

            <div className="api-warning" id="api-warning" style={{display:'none'}}>
              ⚠ AI statement parsing requires an API key. <button className="btn-link" id="btn-api-warning-connect">Connect your AI provider</button> to enable this feature.
            </div>

            <div className="drop-zone card" id="drop-zone">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{margin:'0 auto 16px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
              </svg>
              <div className="drop-title">Drop your statement here</div>
              <div className="drop-sub">Supports PDF and CSV bank statements</div>
              <button className="btn btn-gold" id="btn-browse">Browse File</button>
            </div>

            <div className="card progress-section" id="progress-section">
              <div className="progress-steps" id="progress-steps">
                <div className="p-step" data-step="reading">Reading</div>
                <div className="p-step" data-step="extracting">Extracting</div>
                <div className="p-step" data-step="stripping">Stripping</div>
                <div className="p-step" data-step="analyzing">Analyzing</div>
                <div className="p-step" data-step="saving">Saving</div>
                <div className="p-step" data-step="done">Done</div>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar" id="progress-bar" style={{width:'0%'}}></div>
              </div>
              <div className="progress-msg" id="progress-msg">Starting…</div>
            </div>

            <div className="card import-result" id="import-result">
              <div id="result-text"></div>
              <div style={{marginTop:'12px'}}>
                <button className="btn btn-outline" id="btn-import-again">Import Another</button>
                <button className="btn btn-gold" id="btn-view-txs" style={{marginLeft:'8px'}}>View Transactions →</button>
              </div>
            </div>
          </section>

          {/* ── Add Transaction ── */}
          <section id="view-add" className="view">
            <div className="page-header">
              <div>
                <div className="page-title">Add Transaction</div>
                <div className="page-sub">Manually record a transaction</div>
              </div>
            </div>

            <div className="form-center card">
              <div className="form-group">
                <label className="form-label" htmlFor="f-date">Date</label>
                <input className="form-input" id="f-date" type="date" />
                <div className="form-error" id="e-date">Date is required</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="f-merchant">Merchant / Description</label>
                <input className="form-input" id="f-merchant" type="text" placeholder="e.g. Amazon, Starbucks" />
                <div className="form-error" id="e-merchant">Merchant is required</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="f-amount">Amount</label>
                <input className="form-input mono" id="f-amount" type="number" step="0.01" placeholder="-25.99 (negative = debit)" />
                <div className="form-error" id="e-amount">Valid amount is required</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="f-category">Category</label>
                <select className="form-input" id="f-category"></select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="f-note">Note (optional)</label>
                <input className="form-input" id="f-note" type="text" placeholder="Any additional notes" />
              </div>
              <div className="form-actions">
                <button className="btn btn-gold" id="btn-save-tx">Save Transaction</button>
                <button className="btn btn-outline" id="btn-clear-form">Clear</button>
              </div>
              <div id="form-feedback" style={{marginTop:'12px',fontSize:'13px',display:'none'}}></div>
            </div>
          </section>

          {/* ── Investments ── */}
          <section id="view-investments" className="view">
            <div className="page-header">
              <div>
                <div className="page-title">Investments</div>
                <div className="page-sub">Track your portfolio — update values any time</div>
              </div>
              <div className="page-header-actions">
                <button className="btn btn-outline" id="btn-refresh-prices">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  Refresh Prices
                </button>
                <button className="btn btn-gold" id="btn-add-holding">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                  Add Holding
                </button>
              </div>
            </div>

            <div id="inv-price-status" style={{fontSize:'12px',color:'var(--muted)',marginBottom:'12px',minHeight:'16px'}}></div>

            <div className="stat-grid stat-grid-4" style={{marginBottom:'8px'}}>
              <div className="stat-card">
                <div className="stat-label">Total Value</div>
                <div className="stat-value mono" id="inv-total-value" style={{color:'var(--gold)'}}>—</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Cost Basis</div>
                <div className="stat-value mono" id="inv-cost-basis">—</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Gain / Loss</div>
                <div className="stat-value mono" id="inv-gain-dollar">—</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Return</div>
                <div className="stat-value mono" id="inv-gain-pct">—</div>
              </div>
            </div>

            <div className="card" style={{padding:0,overflow:'hidden'}}>
              <div className="table-wrap">
                <table className="holdings-table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Ticker</th>
                      <th>Quantity</th>
                      <th className="right">Cost Basis</th>
                      <th className="right">Current Value</th>
                      <th className="right">Gain / Loss</th>
                      <th className="right">Return</th>
                      <th>Updated</th>
                      <th className="right">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="holdings-tbody"></tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── AI Insights ── */}
          <section id="view-insights" className="view">
            <div className="page-header">
              <div>
                <div className="page-title">AI Insights</div>
                <div className="page-sub">Powered by Claude with live web data</div>
              </div>
              <div className="page-header-actions" style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <select className="insight-month-select" id="insight-month-select">
                  <option value="">Latest</option>
                </select>
                <button className="btn btn-gold" id="btn-generate-insight">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  Generate Insights
                </button>
              </div>
            </div>

            <div id="insight-meta-bar" className="insight-meta" style={{display:'none'}}>
              <span id="insight-generated-label"></span>
              <span id="insight-cached-label"></span>
              <span id="insight-stale-label" className="insight-stale" style={{display:'none'}}>⚠ Cache is over 23 hours old — consider regenerating</span>
            </div>

            <div id="insight-spinner" style={{display:'none',padding:'40px',textAlign:'center'}}>
              <div className="spinner" style={{width:'28px',height:'28px',borderWidth:'3px',display:'inline-block'}}></div>
              <div style={{marginTop:'12px',color:'var(--muted)',fontSize:'13px'}}>Analyzing your spending with live market data…</div>
            </div>

            <div id="insight-empty" className="empty-state">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              <div className="empty-title" id="insight-empty-title">No insights yet</div>
              <div id="insight-empty-body">Click &quot;Generate Insights&quot; to analyze your spending with AI</div>
            </div>

            <div id="insight-content" style={{display:'none'}}>
              {/* Summary card */}
              <div className="insight-summary-card" id="insight-summary-card">
                <div className="insight-summary-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.09em',color:'var(--muted)',marginBottom:'6px'}}>Financial Health Summary</div>
                  <div id="insight-summary-text" style={{fontSize:'14px',lineHeight:'1.6',color:'var(--text)'}}></div>
                </div>
              </div>

              {/* Alerts */}
              <div id="insight-alerts-section" style={{display:'none'}}>
                <div className="insight-section-label">Alerts</div>
                <div className="insight-alerts-list" id="insight-alerts-list"></div>
              </div>

              {/* Action Items */}
              <div className="insight-section-label">Action Items</div>
              <div className="insight-actions-list" id="insight-actions-list"></div>

              {/* 2-col panels */}
              <div className="insight-panels-grid">
                <div className="insight-panel">
                  <div className="insight-panel-header"><div className="insight-panel-title">Top Spending Categories</div></div>
                  <div id="insight-categories-list"></div>
                </div>
                <div className="insight-panel">
                  <div className="insight-panel-header"><div className="insight-panel-title">Subscriptions</div></div>
                  <div id="insight-subscriptions-list"></div>
                </div>
                <div className="insight-panel">
                  <div className="insight-panel-header"><div className="insight-panel-title">Savings Opportunities</div></div>
                  <div id="insight-savings-opps-list"></div>
                </div>
                <div className="insight-panel">
                  <div className="insight-panel-header"><div className="insight-panel-title">Investment Context</div></div>
                  <div id="insight-investment-context"></div>
                </div>
              </div>

              {/* Full-width trends */}
              <div className="insight-panel" id="insight-trends-panel" style={{marginBottom:'16px'}}>
                <div className="insight-panel-header"><div className="insight-panel-title">Monthly Trends</div></div>
                <div id="insight-trends-table"></div>
              </div>

              {/* Legacy markdown fallback */}
              <div id="insight-legacy-body" style={{display:'none'}}>
                <div className="insight-body" id="insight-body-text"></div>
              </div>
            </div>
          </section>

          {/* ── Savings (Buckets + Goals) ── */}
          <section id="view-savings" className="view">
            <div className="page-header">
              <div>
                <div className="page-title">Savings</div>
                <div className="page-sub">Track and allocate your savings</div>
              </div>
              <div className="page-header-actions">
                <button className="btn btn-gold" id="btn-add-bucket">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                  New Bucket
                </button>
              </div>
            </div>

            <div id="unassigned-savings-nudge" style={{display:'none', marginBottom:'16px', padding:'12px 16px', background:'var(--card)', border:'1px solid var(--border)', borderRadius:'10px', alignItems:'center', justifyContent:'space-between', gap:'12px'}}>
              <span style={{fontSize:'13px', color:'var(--muted)'}}>You have unassigned savings transactions.</span>
              <button className="btn btn-outline btn-sm" id="btn-assign-unassigned">View Unassigned →</button>
            </div>

            <div id="buckets-empty" className="empty-state" style={{display:'none'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              <div className="empty-title">No savings buckets yet</div>
              <div>Create a bucket to start tracking your savings goals</div>
            </div>

            <div className="goals-grid" id="buckets-grid"></div>

            <div className="section-title" style={{marginTop:'28px', marginBottom:'16px'}}>Financial Goals</div>

            <div className="page-header-actions" style={{marginBottom:'16px'}}>
              <button className="btn btn-gold" id="btn-add-goal">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                Add Goal
              </button>
            </div>

            <div id="goals-empty" className="empty-state" style={{display:'none'}}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
              <div className="empty-title">No goals yet</div>
              <div>Add a savings goal to start tracking your progress</div>
            </div>

            <div className="goals-grid" id="goals-grid"></div>
          </section>

          {/* ── Settings ── */}
          <section id="view-settings" className="view">
            <div className="page-header">
              <div>
                <div className="page-title">Settings</div>
                <div className="page-sub">Income sources and transaction rules</div>
              </div>
            </div>

            {/* Income Sources */}
            <div className="card" style={{marginBottom:'20px'}}>
              <div className="section-title" style={{marginBottom:'8px'}}>Income Sources</div>
              <p style={{fontSize:'13px',color:'var(--muted)',marginBottom:'16px',lineHeight:'1.6'}}>
                Define your salary and income sources. Any transaction whose merchant matches a keyword will always be tagged with the correct category —
                and will never be confused with credit card payments or internal transfers.
              </p>
              <div id="income-sources-list" style={{marginBottom:'16px'}}></div>
              <div style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'10px',padding:'16px'}}>
                <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'flex-end'}}>
                  <div style={{flex:'1',minWidth:'140px'}}>
                    <label className="form-label">Source Name</label>
                    <input className="form-input" id="is-name" type="text" placeholder="e.g. Tribe Network" />
                  </div>
                  <div style={{flex:'2',minWidth:'200px'}}>
                    <label className="form-label">Keywords <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(comma-separated, match against merchant)</span></label>
                    <input className="form-input" id="is-keywords" type="text" placeholder="e.g. TRIBE NETWORK, TRIBE" />
                  </div>
                  <div style={{minWidth:'120px'}}>
                    <label className="form-label">Category</label>
                    <select className="form-input" id="is-category">
                      <option value="Salary">Salary</option>
                      <option value="Income">Income</option>
                    </select>
                  </div>
                  <button className="btn btn-gold" id="btn-add-income-source">Add</button>
                </div>
              </div>
            </div>

            {/* Savings Destinations */}
            <div className="card" style={{marginBottom:'20px'}}>
              <div className="section-title" style={{marginBottom:'8px'}}>Savings Destinations</div>
              <p style={{fontSize:'13px',color:'var(--muted)',marginBottom:'16px',lineHeight:'1.6'}}>
                Define your investment accounts. Any debit whose merchant matches a keyword will be tagged as <strong style={{color:'var(--text)'}}>Savings</strong> — not counted as an expense.
                Works for Wealthsimple, RRSP, TFSA, or any brokerage account.
              </p>
              <div id="savings-destinations-list" style={{marginBottom:'16px'}}></div>
              <div style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'10px',padding:'16px'}}>
                <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'flex-end'}}>
                  <div style={{flex:'1',minWidth:'140px'}}>
                    <label className="form-label">Destination Name</label>
                    <input className="form-input" id="sd-name" type="text" placeholder="e.g. Wealthsimple Investments" />
                  </div>
                  <div style={{flex:'2',minWidth:'200px'}}>
                    <label className="form-label">Keywords <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(comma-separated, match against merchant)</span></label>
                    <input className="form-input" id="sd-keywords" type="text" placeholder="e.g. WEALTHSIMPLE, WSI TRANSFER" />
                  </div>
                  <button className="btn btn-gold" id="btn-add-savings-dest">Add</button>
                </div>
              </div>
            </div>

            {/* AI Provider */}
            <div className="card" style={{marginBottom:'20px'}}>
              <div className="section-title" style={{marginBottom:'8px'}}>AI Provider</div>
              <p style={{fontSize:'13px',color:'var(--muted)',marginBottom:'16px',lineHeight:'1.6'}}>
                Required for AI features: statement import, AI Insights, and goal suggestions.
                Choose your preferred AI provider and paste your API key below — stored locally only, never shared.
              </p>
              <div style={{display:'flex',gap:'8px',marginBottom:'8px',flexWrap:'wrap'}}>
                <select id="settings-ai-provider" className="form-input" style={{flex:'0 0 auto',width:'auto'}}>
                  <option value="anthropic">Anthropic Claude</option>
                  <option value="openai">OpenAI GPT-4o</option>
                </select>
                <input type="password" id="settings-api-key" className="form-input" placeholder="Paste your API key…" style={{flex:1,minWidth:'160px'}} />
                <button className="btn btn-gold btn-sm" id="btn-save-api-key">Save</button>
              </div>
              <div id="settings-api-key-status" style={{fontSize:'12px',marginTop:'4px',color:'var(--muted)'}}></div>
              <div id="settings-provider-link" style={{fontSize:'12px',marginTop:'4px',color:'var(--muted)'}}></div>
            </div>

            {/* Payment Filtering */}
            <div className="card">
              <div className="section-title" style={{marginBottom:'8px'}}>Automatic Payment Filtering</div>
              <p style={{fontSize:'13px',color:'var(--muted)',lineHeight:'1.6',marginBottom:'14px'}}>
                Credit card statements show payments from your bank as credits — they look like income but they are not.
                FinBase automatically flags these as <strong style={{color:'var(--text)'}}>Transfers</strong> instead.
                The button below re-applies all rules to your existing transactions.
              </p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'16px'}}>
                {['Payment Received','Payment Thank You','Autopay','Online Payment','ACH Payment','Bill Pay','Balance Transfer','Minimum Payment','E-Payment','Direct Pay'].map(p => (
                  <span key={p} className="td-cat">{p}</span>
                ))}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <button className="btn btn-outline" id="btn-apply-income-rules">Apply Rules to All Transactions</button>
                <span style={{color:'var(--muted)',fontSize:'12px'}} id="apply-rules-status"></span>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* ── Edit Transaction Modal ── */}
      <div className="modal-backdrop" id="edit-modal">
        <div className="modal">
          <div className="modal-title">
            Edit Transaction
            <button className="modal-close" id="modal-close">×</button>
          </div>
          <input type="hidden" id="m-id" />
          <div className="form-group">
            <label className="form-label">Date</label>
            <input className="form-input" id="m-date" type="date" />
          </div>
          <div className="form-group">
            <label className="form-label">Merchant</label>
            <input className="form-input" id="m-merchant" type="text" />
          </div>
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input className="form-input mono" id="m-amount" type="number" step="0.01" />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" id="m-category"></select>
          </div>
          <div className="form-group">
            <label className="form-label">Note</label>
            <input className="form-input" id="m-note" type="text" />
          </div>
          <div className="form-group" id="m-bucket-group" style={{display:'none'}}>
            <label className="form-label">Savings Bucket</label>
            <div style={{display:'flex', gap:'8px'}}>
              <select className="form-input" id="m-bucket-id" style={{flex:1}}>
                <option value="">— Unassigned —</option>
              </select>
              <button className="btn btn-outline btn-sm" id="btn-modal-new-bucket" type="button">+ New</button>
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-danger" id="btn-delete-tx">Delete</button>
            <button className="btn btn-outline" id="btn-modal-cancel">Cancel</button>
            <button className="btn btn-gold" id="btn-modal-save">Save</button>
          </div>
        </div>
      </div>

      {/* ── Add Holding Modal ── */}
      <div className="modal-backdrop" id="add-holding-modal">
        <div className="modal">
          <div className="modal-title">
            Add Holding
            <button className="modal-close" data-modal="add-holding-modal">×</button>
          </div>
          <div className="form-group">
            <label className="form-label">Asset Name</label>
            <input className="form-input" id="h-name" type="text" placeholder="e.g. Apple Stock, Vanguard S&P 500, Bitcoin" />
          </div>
          <div className="form-group">
            <label className="form-label">Ticker Symbol <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional — for auto price updates)</span></label>
            <input className="form-input mono" id="h-ticker" type="text" placeholder="AAPL · VFV.TO · BTC-USD (add .TO for TSX)" style={{textTransform:'uppercase'}} />
          </div>
          <div className="form-group">
            <label className="form-label">Quantity <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional — shares, units, coins)</span></label>
            <input className="form-input mono" id="h-quantity" type="number" step="0.0001" placeholder="e.g. 10.5" />
          </div>
          <div className="form-group">
            <label className="form-label">Amount Invested / Cost Basis ($) <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
            <input className="form-input mono" id="h-cost" type="number" step="0.01" placeholder="e.g. 4000.00 — what you originally paid" />
          </div>
          <div className="form-group">
            <label className="form-label">Current Value ($)</label>
            <input className="form-input mono" id="h-value" type="number" step="0.01" placeholder="e.g. 5000.00 — what it's worth today" />
          </div>
          <div className="form-group">
            <label className="form-label">Notes <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
            <input className="form-input" id="h-notes" type="text" placeholder="Brokerage, account, etc." />
          </div>
          <div className="modal-actions">
            <button className="btn btn-outline" data-modal-cancel="add-holding-modal">Cancel</button>
            <button className="btn btn-gold" id="btn-save-holding">Add Holding</button>
          </div>
        </div>
      </div>

      {/* ── Edit Holding Modal ── */}
      <div className="modal-backdrop" id="edit-holding-modal">
        <div className="modal">
          <div className="modal-title">
            Edit Holding
            <button className="modal-close" data-modal="edit-holding-modal">×</button>
          </div>
          <input type="hidden" id="eh-id" />
          <div className="form-group">
            <label className="form-label">Asset Name</label>
            <input className="form-input" id="eh-name" type="text" />
          </div>
          <div className="form-group">
            <label className="form-label">Ticker Symbol <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
            <input className="form-input mono" id="eh-ticker" type="text" style={{textTransform:'uppercase'}} />
          </div>
          <div className="form-group">
            <label className="form-label">Quantity <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
            <input className="form-input mono" id="eh-quantity" type="number" step="0.0001" />
          </div>
          <div className="form-group">
            <label className="form-label">Amount Invested / Cost Basis ($) <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
            <input className="form-input mono" id="eh-cost" type="number" step="0.01" />
          </div>
          <div className="form-group">
            <label className="form-label">Current Value ($)</label>
            <input className="form-input mono" id="eh-value" type="number" step="0.01" />
          </div>
          <div className="form-group">
            <label className="form-label">Notes <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
            <input className="form-input" id="eh-notes" type="text" />
          </div>
          <div className="modal-actions">
            <button className="btn btn-danger" id="btn-delete-holding">Delete</button>
            <button className="btn btn-outline" data-modal-cancel="edit-holding-modal">Cancel</button>
            <button className="btn btn-gold" id="btn-update-holding">Save Changes</button>
          </div>
        </div>
      </div>

      {/* ── Add Goal Modal ── */}
      <div className="modal-backdrop" id="add-goal-modal">
        <div className="modal">
          <div className="modal-title">
            Add Goal
            <button className="modal-close" data-modal="add-goal-modal">×</button>
          </div>
          <div className="form-group">
            <label className="form-label">Goal Name</label>
            <input className="form-input" id="g-name" type="text" placeholder="e.g. Emergency Fund, Vacation" />
          </div>
          <div className="form-group">
            <label className="form-label">Target Amount ($)</label>
            <input className="form-input mono" id="g-amount" type="number" step="0.01" placeholder="10000" />
          </div>
          <div className="form-group">
            <label className="form-label">Target Date</label>
            <input className="form-input" id="g-date" type="date" />
          </div>
          <div className="modal-actions">
            <button className="btn btn-outline" data-modal-cancel="add-goal-modal">Cancel</button>
            <button className="btn btn-gold" id="btn-save-goal">Add Goal</button>
          </div>
        </div>
      </div>

      {/* ── Goal AI Suggestions Modal ── */}
      <div className="modal-backdrop" id="goal-suggestions-modal">
        <div className="modal modal-wide">
          <div className="modal-title">
            <span id="suggestions-modal-title">AI Suggestions</span>
            <button className="modal-close" data-modal="goal-suggestions-modal">×</button>
          </div>
          <div id="suggestions-spinner" style={{textAlign:'center',padding:'24px',display:'none'}}>
            <div className="spinner" style={{width:'24px',height:'24px',display:'inline-block'}}></div>
            <div style={{marginTop:'8px',color:'var(--muted)',fontSize:'13px'}}>Analyzing your spending with AI…</div>
          </div>
          <div id="suggestions-content" style={{display:'none'}}>
            <div style={{fontSize:'12px',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em',color:'var(--muted)',marginBottom:'10px'}}>Suggestions</div>
            <div id="suggestions-list"></div>
            <div id="cuts-section" style={{display:'none'}}>
              <div style={{fontSize:'12px',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em',color:'var(--muted)',margin:'16px 0 10px'}}>Categories to Cut</div>
              <div id="cuts-list"></div>
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-outline" data-modal="goal-suggestions-modal">Close</button>
          </div>
        </div>
      </div>

      {/* ── Add Bucket Modal ── */}
      <div className="modal-backdrop" id="add-bucket-modal">
        <div className="modal">
          <div className="modal-title">
            New Savings Bucket
            <button className="modal-close" data-modal="add-bucket-modal">×</button>
          </div>
          <div className="form-group">
            <label className="form-label">Bucket Name</label>
            <input className="form-input" id="b-name" type="text" placeholder="e.g. Emergency Fund, Travel, Car" />
          </div>
          <div className="form-group">
            <label className="form-label">Target Amount ($) <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
            <input className="form-input mono" id="b-target" type="number" step="0.01" placeholder="Leave blank if no target" />
          </div>
          <div className="modal-actions">
            <button className="btn btn-outline" data-modal-cancel="add-bucket-modal">Cancel</button>
            <button className="btn btn-gold" id="btn-save-bucket">Create Bucket</button>
          </div>
        </div>
      </div>

      {/* ── Edit Bucket Modal ── */}
      <div className="modal-backdrop" id="edit-bucket-modal">
        <div className="modal">
          <div className="modal-title">
            Edit Bucket
            <button className="modal-close" data-modal="edit-bucket-modal">×</button>
          </div>
          <input type="hidden" id="eb-id" />
          <div className="form-group">
            <label className="form-label">Bucket Name</label>
            <input className="form-input" id="eb-name" type="text" />
          </div>
          <div className="form-group">
            <label className="form-label">Target Amount ($) <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
            <input className="form-input mono" id="eb-target" type="number" step="0.01" placeholder="Leave blank if no target" />
          </div>
          <div className="modal-actions">
            <button className="btn btn-danger" id="btn-delete-bucket">Delete</button>
            <button className="btn btn-outline" data-modal-cancel="edit-bucket-modal">Cancel</button>
            <button className="btn btn-gold" id="btn-update-bucket">Save</button>
          </div>
        </div>
      </div>

      {/* ── Add Entry Modal ── */}
      <div className="modal-backdrop" id="add-entry-modal">
        <div className="modal">
          <div className="modal-title">
            <span id="entry-modal-title">Add Contribution</span>
            <button className="modal-close" data-modal="add-entry-modal">×</button>
          </div>
          <input type="hidden" id="entry-bucket-id" />
          <div className="form-group">
            <label className="form-label">Amount ($)</label>
            <input className="form-input mono" id="entry-amount" type="number" step="0.01" placeholder="e.g. 500.00" />
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input className="form-input" id="entry-date" type="date" />
          </div>
          <div className="form-group">
            <label className="form-label">Note <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
            <input className="form-input" id="entry-note" type="text" placeholder="e.g. Monthly contribution" />
          </div>
          <div className="modal-actions">
            <button className="btn btn-outline" data-modal-cancel="add-entry-modal">Cancel</button>
            <button className="btn btn-gold" id="btn-save-entry">Add Contribution</button>
          </div>
        </div>
      </div>

      {/* ── Bucket Detail Modal ── */}
      <div className="modal-backdrop" id="bucket-detail-modal">
        <div className="modal modal-wide">
          <div className="modal-title">
            <span id="bucket-detail-title">Bucket History</span>
            <button className="modal-close" data-modal="bucket-detail-modal">×</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Note</th>
                  <th className="right">Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="bucket-detail-list"></tbody>
            </table>
          </div>
          <div className="modal-actions">
            <button className="btn btn-outline" data-modal="bucket-detail-modal">Close</button>
          </div>
        </div>
      </div>

      {/* ── Buckets Onboarding Modal ── */}
      <div className="modal-backdrop" id="buckets-onboarding-modal">
        <div className="modal modal-wide">
          <div className="modal-title">
            Welcome to Savings Buckets
            <button className="modal-close" data-modal="buckets-onboarding-modal">×</button>
          </div>
          <p style={{fontSize:'13px',color:'var(--muted)',marginBottom:'16px',lineHeight:'1.6'}}>
            Savings Buckets let you allocate your savings to specific goals — like an emergency fund, travel, or a down payment.
            Select the buckets you&apos;d like to start with:
          </p>
          <div id="onboarding-suggestions"></div>
          <div className="modal-actions">
            <button className="btn btn-outline" id="btn-onboarding-skip">Skip for now</button>
            <button className="btn btn-gold" id="btn-onboarding-create">Create Selected</button>
          </div>
        </div>
      </div>

      {/* ── Connect AI Modal ── */}
      <div className="modal-backdrop" id="ai-connect-modal">
        <div className="modal">
          <div className="modal-title">
            <span id="ai-connect-modal-title">Connect Your AI</span>
            <button className="modal-close" id="ai-connect-modal-close">×</button>
          </div>
          <p id="ai-connect-modal-desc" style={{fontSize:'13px',color:'var(--muted)',marginBottom:'20px',lineHeight:'1.6'}}>
            FinBase uses AI to parse bank statements, generate spending insights, and suggest goal strategies.
            Choose your provider and add your API key to unlock these features.
          </p>
          <div className="form-group">
            <label className="form-label">AI Provider</label>
            <select id="modal-ai-provider" className="form-input">
              <option value="anthropic">Anthropic Claude</option>
              <option value="openai">OpenAI GPT-4o</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">API Key</label>
            <input type="password" id="modal-api-key" className="form-input" placeholder="Paste your API key…" />
            <div id="modal-provider-link" style={{fontSize:'12px',marginTop:'6px',color:'var(--muted)'}}></div>
          </div>
          <div id="modal-api-key-error" style={{fontSize:'12px',color:'var(--neg)',marginBottom:'8px',display:'none'}}></div>
          <div className="modal-actions">
            <button className="btn btn-outline" id="ai-connect-modal-skip">Skip for now</button>
            <button className="btn btn-gold" id="btn-modal-save-ai-key">Save & Connect</button>
          </div>
        </div>
      </div>

      {/* Hidden file input for import */}
      <input type="file" id="file-input" accept=".pdf,.csv" style={{display:'none'}} />

      <Script id="finbase-app" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  currentView: 'dashboard',
  categories: [],
  txPage: 1,
  txPageSize: 50,
  txTotalPages: 1,
  txTotal: 0,
  txFilters: { month: '', category: '', search: '' },
  searchDebounce: null,
  charts: {},
  dashMonth: new Date().toISOString().slice(0,7),
  chartColors: ['#2ED59A','#F0C040','#F05054','#6479F8','#C27BA0','#FB923C','#60C7F4','#86EFAC','#FFA654','#A78BFA','#F97316','#34D399','#FBBF24','#60A5FA','#F472B6'],
  buckets: [],
  bucketsShowAll: false,
  editingBucketId: null,
  addingEntryBucketId: null,
  chartsData: null,
  flowData: null,
  expandedChart: null,
};

// ─── Format helpers ───────────────────────────────────────────────────────────
function fmtMoney(n) {
  const abs = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (n >= 0 ? '+' : '-') + '$' + abs;
}
function fmtMoneyPlain(n) {
  const abs = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (n < 0 ? '-' : '') + '$' + abs;
}
function fmtDollars(n) {
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtPct(n) {
  return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
}
function timeAgo(ts) {
  const secs = Math.floor(Date.now() / 1000) - ts;
  if (secs < 60) return 'just now';
  if (secs < 3600) return Math.floor(secs / 60) + ' minutes ago';
  if (secs < 86400) return Math.floor(secs / 3600) + ' hours ago';
  return Math.floor(secs / 86400) + ' days ago';
}

// ─── Escape HTML ──────────────────────────────────────────────────────────────
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function navigate(viewId) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.view === viewId));
  document.querySelectorAll('.view').forEach(el => {
    const active = el.id === 'view-' + viewId;
    if (active) {
      el.classList.add('active');
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    } else {
      el.classList.remove('active');
    }
  });
  state.currentView = viewId;
  if (viewId === 'dashboard') loadDashboard();
  if (viewId === 'transactions') loadTransactions();
  if (viewId === 'investments') loadInvestments();
  if (viewId === 'insights') loadInsights();
  if (viewId === 'savings') loadSavings();
  if (viewId === 'settings') loadSettings();
}

document.querySelectorAll('.nav-item').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.view));
});

// ─── Dashboard ────────────────────────────────────────────────────────────────
function destroyChart(key) {
  if (state.charts[key]) { state.charts[key].destroy(); delete state.charts[key]; }
}

function chartTheme() {
  const isDark = document.documentElement.dataset.theme !== 'light';
  return {
    isDark,
    grid: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)',
    text: isDark ? '#E4E6EE' : '#111420',
    muted: isDark ? '#5B6375' : '#636878',
    gold: isDark ? '#F0C040' : '#B88A0A',
    pos: isDark ? '#2ED59A' : '#0EA877',
    neg: isDark ? '#F05054' : '#E03034',
    tooltip: isDark ? { bg: '#161823', border: 'rgba(255,255,255,0.1)', title: '#E4E6EE', body: '#5B6375' } : { bg: '#FFFFFF', border: 'rgba(0,0,0,0.1)', title: '#111420', body: '#636878' },
  };
}

function drawTrendChart(trendData) {
  destroyChart('trend');
  const canvas = document.getElementById('chart-trend');
  if (!canvas) return;
  const t = chartTheme();
  const last6 = trendData.slice(-6);
  state.charts['trend'] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: last6.map(d => d.month),
      datasets: [
        { label: 'Income',   data: last6.map(d => d.income),   backgroundColor: t.pos + 'C0', borderRadius: 5, borderSkipped: false },
        { label: 'Expenses', data: last6.map(d => d.expenses), backgroundColor: t.neg + 'C0', borderRadius: 5, borderSkipped: false },
        { label: 'Savings',  data: last6.map(d => d.savings),  backgroundColor: t.gold + 'C0', borderRadius: 5, borderSkipped: false },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      plugins: {
        legend: {
          labels: { color: t.muted, font: { size: 11, family: 'DM Sans, Inter, sans-serif' }, boxWidth: 10, boxHeight: 10, borderRadius: 3, useBorderRadius: true, padding: 16 }
        },
        tooltip: {
          backgroundColor: t.tooltip.bg, borderColor: t.tooltip.border, borderWidth: 1,
          titleColor: t.tooltip.title, bodyColor: t.tooltip.body,
          padding: 10, cornerRadius: 8,
          callbacks: { label: ctx => '  ' + ctx.dataset.label + ': $' + ctx.parsed.y.toLocaleString('en-US', {minimumFractionDigits:0}) }
        }
      },
      scales: {
        x: { grid: { color: t.grid, drawBorder: false }, ticks: { color: t.muted, font: { size: 11 } }, border: { display: false } },
        y: { grid: { color: t.grid, drawBorder: false }, ticks: { color: t.muted, font: { size: 11 }, callback: v => '$' + v.toLocaleString() }, border: { display: false } }
      }
    }
  });
}

function drawNetFlowChart(trendData) {
  destroyChart('netflow');
  const canvas = document.getElementById('chart-netflow');
  if (!canvas) return;
  const t = chartTheme();
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 230);
  grad.addColorStop(0, t.gold + '55');
  grad.addColorStop(1, t.gold + '00');
  const nets = trendData.map(d => (d.income || 0) - (d.expenses || 0));
  state.charts['netflow'] = new Chart(canvas, {
    type: 'line',
    data: {
      labels: trendData.map(d => d.month),
      datasets: [{
        label: 'Net Flow',
        data: nets,
        borderColor: t.gold,
        backgroundColor: grad,
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: nets.map(n => n >= 0 ? t.pos : t.neg),
        pointBorderColor: 'transparent',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: t.gold,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: t.tooltip.bg, borderColor: t.tooltip.border, borderWidth: 1,
          titleColor: t.tooltip.title, bodyColor: t.tooltip.body,
          padding: 10, cornerRadius: 8,
          callbacks: { label: ctx => '  Net: $' + ctx.parsed.y.toLocaleString('en-US', {minimumFractionDigits:0}) }
        }
      },
      scales: {
        x: { grid: { color: t.grid, drawBorder: false }, ticks: { color: t.muted, font: { size: 11 } }, border: { display: false } },
        y: { grid: { color: t.grid, drawBorder: false }, ticks: { color: t.muted, font: { size: 11 }, callback: v => '$' + v.toLocaleString() }, border: { display: false } }
      }
    }
  });
}

function drawDonutChart(categoryData) {
  destroyChart('donut');
  const canvas = document.getElementById('chart-donut');
  const legend = document.getElementById('donut-legend');
  if (!canvas) return;
  const t = chartTheme();
  const colors = state.chartColors.slice(0, categoryData.length);
  state.charts['donut'] = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: categoryData.map(d => d.category),
      datasets: [{
        data: categoryData.map(d => d.total),
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: t.isDark ? '#0F1017' : '#FFFFFF',
        hoverBorderColor: t.isDark ? '#161823' : '#F2F4F9',
        hoverOffset: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '70%',
      animation: { animateRotate: true, duration: 700, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: t.tooltip.bg, borderColor: t.tooltip.border, borderWidth: 1,
          titleColor: t.tooltip.title, bodyColor: t.tooltip.body,
          padding: 10, cornerRadius: 8,
          callbacks: { label: ctx => '  ' + ctx.label + ': $' + ctx.parsed.toLocaleString('en-US', {minimumFractionDigits:0}) }
        }
      }
    }
  });
  if (legend) {
    legend.innerHTML = categoryData.map((d, i) =>
      '<div class="donut-legend-item"><div class="donut-legend-dot" style="background:' + colors[i] + '"></div>' + esc(d.category) + '</div>'
    ).join('');
  }
}

function drawMerchantsChart(merchantData) {
  destroyChart('merchants');
  const canvas = document.getElementById('chart-merchants');
  if (!canvas) return;
  const t = chartTheme();
  state.charts['merchants'] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: merchantData.map(d => d.merchant),
      datasets: [{
        label: 'Total Spent',
        data: merchantData.map(d => d.total),
        backgroundColor: t.neg + 'A0',
        borderRadius: 5,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 500, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: t.tooltip.bg, borderColor: t.tooltip.border, borderWidth: 1,
          titleColor: t.tooltip.title, bodyColor: t.tooltip.body,
          padding: 10, cornerRadius: 8,
          callbacks: { label: ctx => '  $' + ctx.parsed.x.toLocaleString('en-US', {minimumFractionDigits:0}) }
        }
      },
      scales: {
        x: { grid: { color: t.grid, drawBorder: false }, ticks: { color: t.muted, font: { size: 11 }, callback: v => '$' + v.toLocaleString() }, border: { display: false } },
        y: { grid: { display: false }, ticks: { color: t.muted, font: { size: 11 } }, border: { display: false } }
      }
    }
  });
}

function drawDailyChart(dailyData) {
  destroyChart('daily');
  const canvas = document.getElementById('chart-daily');
  if (!canvas) return;
  const t = chartTheme();
  state.charts['daily'] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: dailyData.map(d => d.date.slice(8)),
      datasets: [{
        label: 'Spent',
        data: dailyData.map(d => d.spent),
        backgroundColor: t.gold + 'B0',
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 500, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: t.tooltip.bg, borderColor: t.tooltip.border, borderWidth: 1,
          titleColor: t.tooltip.title, bodyColor: t.tooltip.body,
          padding: 10, cornerRadius: 8,
          callbacks: { label: ctx => '  $' + ctx.parsed.y.toLocaleString('en-US', {minimumFractionDigits:0}) }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: t.muted, font: { size: 10 } }, border: { display: false } },
        y: { grid: { color: t.grid, drawBorder: false }, ticks: { color: t.muted, font: { size: 10 }, callback: v => '$' + v.toLocaleString() }, border: { display: false } }
      }
    }
  });
}

function drawSankey(data, svgId = 'sankey-svg', emptyId = 'sankey-empty') {
  const svg = document.getElementById(svgId);
  const emptyEl = document.getElementById(emptyId);
  if (!svg) return;
  if (!data.totalIncome && !data.totalOutflow) {
    svg.style.display = 'none';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  svg.style.display = 'block';

  const t = chartTheme();
  const W = svg.parentElement.offsetWidth || 600;
  const numInc = (data.incomeSources || []).length;
  const numExp = (data.expenseCategories || []).length + (data.retained > 0 ? 1 : 0);
  const H = Math.max(300, Math.min(600, Math.max(numInc + 1, numExp + 1) * 28 + 100));
  svg.setAttribute('width', W);
  svg.setAttribute('height', H);
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

  const padTop = 30, padBot = 20, padLeft = 148, padRight = 148, colW = 14;
  const usableH = H - padTop - padBot;
  const totalIncome = data.totalIncome || 1;
  const col0x = padLeft;
  const col2x = W - padRight - colW;
  const col1x = Math.round((col0x + col2x + colW) / 2);
  const accLeft = col1x - Math.round(colW / 2);

  function scaleH(amount) { return Math.max(6, usableH * amount / totalIncome); }

  function layoutNodes(nodes) {
    const totalH = nodes.reduce((s, n) => s + scaleH(n.amount), 0);
    const gap = nodes.length > 1 ? Math.min(8, Math.max(2, (usableH - totalH) / (nodes.length - 1))) : 0;
    const totalWithGaps = totalH + gap * Math.max(0, nodes.length - 1);
    let y = padTop + (usableH - totalWithGaps) / 2;
    nodes.forEach(n => { n.h = scaleH(n.amount); n.y = y; y += n.h + gap; });
  }

  function nodeColor(type) {
    if (type === 'income') return t.pos;
    if (type === 'savings') return t.gold;
    if (type === 'retained') return t.isDark ? '#4B5268' : '#9CA3AF';
    return t.neg;
  }

  const incNodes = (data.incomeSources || []).map(s => ({ name: s.category, amount: s.total, type: 'income' }));
  const expNodes = (data.expenseCategories || [])
    .filter(c => c.category !== 'Savings')
    .map(c => ({ name: c.category, amount: c.total, type: 'expense' }));
  if (data.savings > 0) expNodes.push({ name: 'Savings', amount: data.savings, type: 'savings' });
  if (data.retained > 0) expNodes.push({ name: 'Retained', amount: data.retained, type: 'retained' });

  layoutNodes(incNodes);
  layoutNodes(expNodes);

  const accountH = scaleH(totalIncome);
  const accountY = padTop + (usableH - accountH) / 2;

  const parts = [];

  function bezierBand(x0, y0mid, bh0, x1, y1mid, bh1, fill, dataTip) {
    const h0 = bh0 / 2, h1 = bh1 / 2, mx = (x0 + x1) / 2;
    const d = 'M ' + x0.toFixed(1) + ',' + (y0mid - h0).toFixed(1) +
      ' C ' + mx.toFixed(1) + ',' + (y0mid - h0).toFixed(1) + ' ' + mx.toFixed(1) + ',' + (y1mid - h1).toFixed(1) + ' ' + x1.toFixed(1) + ',' + (y1mid - h1).toFixed(1) +
      ' L ' + x1.toFixed(1) + ',' + (y1mid + h1).toFixed(1) +
      ' C ' + mx.toFixed(1) + ',' + (y1mid + h1).toFixed(1) + ' ' + mx.toFixed(1) + ',' + (y0mid + h0).toFixed(1) + ' ' + x0.toFixed(1) + ',' + (y0mid + h0).toFixed(1) + ' Z';
    parts.push('<path d="' + d + '" fill="' + fill + '" opacity="0.3" data-tip="' + dataTip + '"/>');
  }

  function svgRect(x, y, w, h, fill, dataTip) {
    parts.push('<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w + '" height="' + h.toFixed(1) + '" fill="' + fill + '" rx="2" data-tip="' + dataTip + '"/>');
  }

  function svgText(x, y, text, anchor, extraAttrs) {
    parts.push('<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="' + anchor + '" fill="' + t.muted + '" font-size="11" font-family="DM Sans,Inter,sans-serif"' + (extraAttrs || '') + '>' + text + '</text>');
  }

  // Income → Account flows
  let accIncY = accountY;
  incNodes.forEach(n => {
    const bh = Math.max(2, scaleH(n.amount));
    const y0mid = n.y + n.h / 2;
    const y1mid = accIncY + bh / 2;
    accIncY += bh;
    bezierBand(col0x + colW, y0mid, bh, accLeft, y1mid, bh, t.pos, esc(n.name) + ': $' + Math.round(n.amount).toLocaleString() + ' -> Account');
  });

  // Account → Expense flows
  let accExpY = accountY;
  expNodes.forEach(n => {
    const bh = Math.max(2, scaleH(n.amount));
    const y0mid = accExpY + bh / 2;
    accExpY += bh;
    const y1mid = n.y + n.h / 2;
    bezierBand(accLeft + colW, y0mid, bh, col2x, y1mid, bh, nodeColor(n.type), 'Account -> ' + esc(n.name) + ': $' + Math.round(n.amount).toLocaleString());
  });

  // Income nodes (left)
  incNodes.forEach(n => {
    const tip = esc(n.name) + ': $' + Math.round(n.amount).toLocaleString();
    svgRect(col0x, n.y, colW, n.h, t.pos, tip);
    const lx = col0x - 6;
    if (n.h >= 30) {
      svgText(lx, n.y + n.h / 2 - 5, esc(n.name), 'end', '');
      svgText(lx, n.y + n.h / 2 + 9, '$' + Math.round(n.amount).toLocaleString(), 'end', ' opacity="0.7"');
    } else if (n.h >= 18) {
      svgText(lx, n.y + n.h / 2 + 4, '$' + Math.round(n.amount).toLocaleString(), 'end', '');
    }
  });

  // Account node (center)
  svgRect(accLeft, accountY, colW, accountH, t.gold, 'Account: $' + Math.round(totalIncome).toLocaleString());
  parts.push('<text x="' + col1x.toFixed(1) + '" y="' + (accountY - 10).toFixed(1) + '" text-anchor="middle" fill="' + t.text + '" font-size="11" font-weight="700" font-family="DM Sans,Inter,sans-serif">Account</text>');

  // Expense nodes (right)
  expNodes.forEach(n => {
    const col = nodeColor(n.type);
    const tip = esc(n.name) + ': $' + Math.round(n.amount).toLocaleString();
    svgRect(col2x, n.y, colW, n.h, col, tip);
    const lx = col2x + colW + 6;
    if (n.h >= 30) {
      svgText(lx, n.y + n.h / 2 - 5, esc(n.name), 'start', '');
      svgText(lx, n.y + n.h / 2 + 9, '$' + Math.round(n.amount).toLocaleString(), 'start', ' opacity="0.7"');
    } else if (n.h >= 18) {
      svgText(lx, n.y + n.h / 2 + 4, esc(n.name), 'start', '');
    }
  });

  svg.innerHTML = parts.join('');
}

async function loadDashboard() {
  const month = state.dashMonth;
  const [summary, chartsData, flowData, txData, bucketsData] = await Promise.all([
    fetch('/api/dashboard/summary?month=' + month).then(r => r.json()),
    fetch('/api/dashboard/charts?month=' + month).then(r => r.json()),
    fetch('/api/dashboard/money-flow?month=' + month).then(r => r.json()),
    fetch('/api/transactions?' + new URLSearchParams({ page: 1, pageSize: 10, month })).then(r => r.json()),
    fetch('/api/savings-buckets').then(r => r.json()),
  ]);

  document.getElementById('stat-income').textContent = '$' + summary.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('stat-expenses').textContent = '$' + summary.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('stat-savings').textContent = '$' + (summary.savings || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const net = summary.netFlow;
  const netEl = document.getElementById('stat-net');
  netEl.textContent = (net >= 0 ? '+' : '-') + '$' + Math.abs(net).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  netEl.style.color = net >= 0 ? 'var(--pos)' : 'var(--neg)';

  const portEl = document.getElementById('stat-portfolio');
  const portChgEl = document.getElementById('stat-portfolio-change');
  portEl.textContent = fmtDollars(summary.portfolioTotal);
  if (summary.portfolioChange !== 0) {
    portChgEl.textContent = fmtPct(summary.portfolioChange) + ' total return';
    portChgEl.style.color = summary.portfolioChange >= 0 ? 'var(--pos)' : 'var(--neg)';
  } else {
    portChgEl.textContent = '';
  }

  const aiCard = document.getElementById('dash-ai-intel');
  if (summary.pinnedInsight) {
    document.getElementById('dash-ai-summary').textContent = summary.pinnedInsight;
    let actionItems = [];
    if (summary.pinnedInsightFull) {
      try {
        const parsed = JSON.parse(summary.pinnedInsightFull);
        if (parsed.schema_version === 2) actionItems = (parsed.action_items || []).slice(0, 3);
      } catch {}
    }
    document.getElementById('dash-ai-actions').innerHTML = actionItems.map(item => {
      const isDone = localStorage.getItem('finbase_action_done_' + item.id) === '1';
      return '<div class="ai-intel-action-row ' + (isDone ? 'ai-action-done' : '') + '">' +
        '<span class="insight-priority-badge insight-priority-' + esc(item.priority) + '">' + esc(item.priority) + '</span>' +
        '<span class="ai-intel-action-text">' + esc(item.title) + '</span>' +
        '</div>';
    }).join('');
    aiCard.style.display = 'block';
  } else {
    aiCard.style.display = 'none';
  }

  const tbody = document.getElementById('dash-tbody');
  const rows = txData.rows || [];
  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:32px;color:var(--muted);">No transactions yet — import a statement or add one manually</td></tr>';
  } else {
    tbody.innerHTML = rows.map(tx =>
      '<tr>' +
        '<td class="td-merchant">' + esc(tx.merchant) + '</td>' +
        '<td><span class="td-cat">' + esc(tx.category) + '</span></td>' +
        '<td class="td-date">' + esc(tx.date) + '</td>' +
        '<td class="right td-amount" style="color:' + (tx.amount >= 0 ? 'var(--pos)' : tx.category === 'Savings' ? 'var(--gold)' : 'var(--neg)') + '">' + fmtMoneyPlain(tx.amount) + '</td>' +
      '</tr>'
    ).join('');
  }

  state.chartsData = chartsData;
  state.flowData = flowData;

  renderDashBucketsWidget(bucketsData.rows || []);

  const trend = [...chartsData.trend].reverse();
  drawTrendChart(trend);
  drawNetFlowChart(trend);
  drawDonutChart(chartsData.categoryBreakdown || []);
  drawMerchantsChart(chartsData.topMerchants || []);
  drawDailyChart(chartsData.dailySpend || []);
  drawSankey(flowData);
}

// ─── Savings Buckets Widget ───────────────────────────────────────────────────
function renderDashBucketsWidget(buckets) {
  const widget = document.getElementById('dash-buckets-widget');
  const list = document.getElementById('dash-buckets-list');
  const showMoreWrap = document.getElementById('dash-buckets-show-more');
  const toggleBtn = document.getElementById('btn-buckets-toggle');
  if (!widget) return;
  if (buckets.length === 0) {
    widget.style.display = 'none';
    return;
  }
  widget.style.display = '';
  state.buckets = buckets;
  const showAll = state.bucketsShowAll;
  const displayBuckets = showAll ? buckets : buckets.slice(0, 5);

  list.innerHTML = displayBuckets.map(b => {
    const balance = b.balance || 0;
    const target = b.target_amount;
    let barHtml = '';
    let amountLabel = '';
    if (target) {
      const pct = Math.min(100, (balance / target) * 100);
      amountLabel = fmtDollars(balance) + ' / ' + fmtDollars(target);
      barHtml = '<div class="bucket-bar-wrap"><div class="bucket-bar" style="width:' + pct.toFixed(1) + '%"></div></div>';
    } else {
      amountLabel = fmtDollars(balance);
      barHtml = '<div class="bucket-bar-wrap"><div class="bucket-bar bucket-bar-no-target" style="width:40%"></div></div>';
    }
    return '<div class="bucket-progress-row">' +
      '<div class="bucket-progress-header">' +
        '<span class="bucket-name">' + esc(b.name) + '</span>' +
        '<span class="bucket-amount">' + amountLabel + '</span>' +
      '</div>' +
      barHtml +
    '</div>';
  }).join('');

  if (buckets.length > 5) {
    showMoreWrap.style.display = '';
    toggleBtn.textContent = showAll ? 'Show less' : ('Show all ' + buckets.length + ' buckets');
  } else {
    showMoreWrap.style.display = 'none';
  }
}

// ─── Savings View ─────────────────────────────────────────────────────────────
async function loadSavings() {
  const [bucketsData, summary] = await Promise.all([
    fetch('/api/savings-buckets').then(r => r.json()),
    fetch('/api/dashboard/summary').then(r => r.json()),
  ]);
  state.buckets = bucketsData.rows || [];

  const nudge = document.getElementById('unassigned-savings-nudge');
  if (nudge) {
    nudge.style.display = (summary.unassignedSavingsCount > 0) ? 'flex' : 'none';
  }

  const bucketsGrid = document.getElementById('buckets-grid');
  const bucketsEmpty = document.getElementById('buckets-empty');
  if (state.buckets.length === 0) {
    bucketsEmpty.style.display = '';
    bucketsGrid.innerHTML = '';
  } else {
    bucketsEmpty.style.display = 'none';
    bucketsGrid.innerHTML = state.buckets.map(b => renderBucketCard(b)).join('');
    bucketsGrid.querySelectorAll('button[data-bucket-edit]').forEach(btn => {
      btn.addEventListener('click', function(e) { e.stopPropagation(); openEditBucketModal(parseInt(this.dataset.bucketEdit)); });
    });
    bucketsGrid.querySelectorAll('button[data-bucket-entry]').forEach(btn => {
      btn.addEventListener('click', function(e) { e.stopPropagation(); openAddEntryModal(parseInt(this.dataset.bucketEntry), this.dataset.bucketName); });
    });
    bucketsGrid.querySelectorAll('button[data-bucket-detail]').forEach(btn => {
      btn.addEventListener('click', function(e) { e.stopPropagation(); openBucketDetailModal(parseInt(this.dataset.bucketDetail), this.dataset.bucketName); });
    });
  }

  await loadGoals();
}

function renderBucketCard(bucket) {
  const balance = bucket.balance || 0;
  const target = bucket.target_amount;
  let progressHtml = '';
  let pctBadge = '';
  let targetLabel = 'No target';
  if (target) {
    const pct = Math.min(100, (balance / target) * 100);
    pctBadge = '<span class="badge-signal ' + (pct >= 100 ? 'badge-ontrack' : 'badge-behind') + '" style="font-size:11px;padding:2px 8px;">' + pct.toFixed(0) + '%</span>';
    targetLabel = fmtDollars(target);
    progressHtml = '<div style="margin:12px 0 4px;">' +
      '<div class="bucket-bar-wrap"><div class="bucket-bar" style="width:' + pct.toFixed(1) + '%"></div></div>' +
      '<div style="font-size:11px;color:var(--muted);margin-top:4px;">' + fmtDollars(balance) + ' of ' + fmtDollars(target) + '</div>' +
    '</div>';
  } else {
    progressHtml = '<div style="margin:12px 0 4px;">' +
      '<div class="bucket-bar-wrap"><div class="bucket-bar bucket-bar-no-target" style="width:40%"></div></div>' +
      '<div style="font-size:11px;color:var(--muted);margin-top:4px;">' + fmtDollars(balance) + ' saved</div>' +
    '</div>';
  }

  return '<div class="goal-card">' +
    '<div class="goal-card-header">' +
      '<div>' +
        '<div class="goal-name">' + esc(bucket.name) + '</div>' +
        '<div class="goal-date">Target: ' + targetLabel + '</div>' +
      '</div>' +
      pctBadge +
    '</div>' +
    '<div class="goal-target">' + fmtDollars(balance) + '</div>' +
    progressHtml +
    '<div class="goal-actions">' +
      '<button class="btn btn-outline btn-sm" data-bucket-entry="' + bucket.id + '" data-bucket-name="' + esc(bucket.name) + '">+ Contribution</button>' +
      '<button class="btn btn-outline btn-sm" data-bucket-detail="' + bucket.id + '" data-bucket-name="' + esc(bucket.name) + '">History</button>' +
      '<button class="btn btn-outline btn-sm" data-bucket-edit="' + bucket.id + '">Edit</button>' +
    '</div>' +
  '</div>';
}

async function populateBucketSelect(selectId, selectedId) {
  const { rows } = await fetch('/api/savings-buckets').then(r => r.json());
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">— Unassigned —</option>' +
    rows.map(b => '<option value="' + b.id + '"' + (selectedId && b.id === parseInt(selectedId) ? ' selected' : '') + '>' + esc(b.name) + '</option>').join('');
}

// Bucket CRUD
document.getElementById('btn-add-bucket').addEventListener('click', () => {
  document.getElementById('b-name').value = '';
  document.getElementById('b-target').value = '';
  document.getElementById('add-bucket-modal').classList.add('open');
});

document.getElementById('btn-save-bucket').addEventListener('click', async () => {
  const name = document.getElementById('b-name').value.trim();
  const targetVal = document.getElementById('b-target').value;
  if (!name) { alert('Bucket name is required.'); return; }
  await fetch('/api/savings-buckets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, target_amount: targetVal ? parseFloat(targetVal) : null })
  }).then(r => r.json());
  document.getElementById('add-bucket-modal').classList.remove('open');
  if (state.currentView === 'savings') await loadSavings();
  await loadDashboard();
});

function openEditBucketModal(id) {
  const bucket = state.buckets.find(b => b.id === id);
  if (!bucket) return;
  state.editingBucketId = id;
  document.getElementById('eb-id').value = id;
  document.getElementById('eb-name').value = bucket.name;
  document.getElementById('eb-target').value = bucket.target_amount != null ? bucket.target_amount : '';
  document.getElementById('edit-bucket-modal').classList.add('open');
}

document.getElementById('btn-update-bucket').addEventListener('click', async () => {
  const id = parseInt(document.getElementById('eb-id').value);
  const name = document.getElementById('eb-name').value.trim();
  const targetVal = document.getElementById('eb-target').value;
  if (!name) { alert('Bucket name is required.'); return; }
  const fields = { name };
  fields.target_amount = targetVal ? parseFloat(targetVal) : null;
  await fetch('/api/savings-buckets/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  }).then(r => r.json());
  document.getElementById('edit-bucket-modal').classList.remove('open');
  if (state.currentView === 'savings') await loadSavings();
  await loadDashboard();
});

document.getElementById('btn-delete-bucket').addEventListener('click', async () => {
  const id = parseInt(document.getElementById('eb-id').value);
  if (!confirm('Delete this bucket? Linked transactions will become unassigned.')) return;
  await fetch('/api/savings-buckets/' + id, { method: 'DELETE' }).then(r => r.json());
  document.getElementById('edit-bucket-modal').classList.remove('open');
  if (state.currentView === 'savings') await loadSavings();
  await loadDashboard();
});

// Manual entries
function openAddEntryModal(bucketId, bucketName) {
  state.addingEntryBucketId = bucketId;
  document.getElementById('entry-bucket-id').value = bucketId;
  document.getElementById('entry-modal-title').textContent = 'Add Contribution — ' + bucketName;
  document.getElementById('entry-amount').value = '';
  document.getElementById('entry-date').value = new Date().toISOString().slice(0, 10);
  document.getElementById('entry-note').value = '';
  document.getElementById('add-entry-modal').classList.add('open');
}

document.getElementById('btn-save-entry').addEventListener('click', async () => {
  const bucketId = parseInt(document.getElementById('entry-bucket-id').value);
  const amount = parseFloat(document.getElementById('entry-amount').value);
  const date = document.getElementById('entry-date').value;
  const note = document.getElementById('entry-note').value.trim();
  if (!amount || amount <= 0) { alert('Amount must be greater than 0.'); return; }
  if (!date) { alert('Date is required.'); return; }
  await fetch('/api/savings-buckets/' + bucketId + '/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, date, note: note || null })
  }).then(r => r.json());
  document.getElementById('add-entry-modal').classList.remove('open');
  if (state.currentView === 'savings') await loadSavings();
  await loadDashboard();
});

async function openBucketDetailModal(bucketId, bucketName) {
  document.getElementById('bucket-detail-title').textContent = bucketName + ' — History';
  document.getElementById('bucket-detail-modal').classList.add('open');
  await refreshBucketDetailList(bucketId);
}

async function refreshBucketDetailList(bucketId) {
  const { rows } = await fetch('/api/savings-buckets/' + bucketId + '/entries').then(r => r.json());
  const tbody = document.getElementById('bucket-detail-list');
  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:24px;color:var(--muted);">No manual contributions yet</td></tr>';
    return;
  }
  tbody.innerHTML = rows.map(e =>
    '<tr>' +
    '<td class="td-date">' + esc(e.date) + '</td>' +
    '<td style="color:var(--muted);font-size:12px;">' + esc(e.note || '—') + '</td>' +
    '<td class="right td-amount pos">' + fmtDollars(e.amount) + '</td>' +
    '<td style="text-align:right;padding:0 10px;"><button class="btn btn-danger btn-sm" onclick="deleteManualEntry(' + bucketId + ',' + e.id + ')">Remove</button></td>' +
    '</tr>'
  ).join('');
}

async function deleteManualEntry(bucketId, entryId) {
  if (!confirm('Remove this contribution?')) return;
  await fetch('/api/savings-buckets/' + bucketId + '/entries/' + entryId, { method: 'DELETE' }).then(r => r.json());
  await refreshBucketDetailList(bucketId);
  if (state.currentView === 'savings') await loadSavings();
  await loadDashboard();
}

// Dashboard widget manage button
document.getElementById('btn-dash-manage-buckets').addEventListener('click', () => navigate('savings'));
document.getElementById('btn-dash-view-insights').addEventListener('click', () => navigate('insights'));

// Dashboard widget toggle
document.getElementById('btn-buckets-toggle').addEventListener('click', () => {
  state.bucketsShowAll = !state.bucketsShowAll;
  renderDashBucketsWidget(state.buckets);
});

// Assign unassigned button
document.getElementById('btn-assign-unassigned').addEventListener('click', () => {
  state.txFilters.category = 'Savings';
  const catSel = document.getElementById('filter-cat');
  if (catSel) catSel.value = 'Savings';
  navigate('transactions');
});

// Onboarding
const BUCKET_SUGGESTIONS = [
  { name: 'Emergency Fund', target: 10000 },
  { name: 'Travel', target: 3000 },
  { name: 'Car Fund', target: 5000 },
  { name: 'Rainy Day', target: 2000 },
  { name: 'Home Down Payment', target: null },
  { name: 'Education', target: null },
];

async function checkBucketsOnboarding() {
  const setting = await fetch('/api/settings?key=buckets_onboarding_done').then(r => r.ok ? r.json() : null).catch(() => null);
  if (setting && setting.value === '1') return;
  const { rows } = await fetch('/api/savings-buckets').then(r => r.json());
  if (rows.length > 0) { markOnboardingDone(); return; }
  showOnboardingModal();
}

function showOnboardingModal() {
  const container = document.getElementById('onboarding-suggestions');
  container.innerHTML = BUCKET_SUGGESTIONS.map((s, i) =>
    '<label style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer;">' +
      '<input type="checkbox" data-ob-idx="' + i + '"' + (i < 3 ? ' checked' : '') + ' style="width:16px;height:16px;accent-color:var(--gold);" />' +
      '<span style="flex:1;font-size:13px;">' + esc(s.name) + '</span>' +
      (s.target ? '<span style="font-size:12px;color:var(--muted);font-family:monospace;">' + fmtDollars(s.target) + ' target</span>' : '<span style="font-size:12px;color:var(--muted);">No target</span>') +
    '</label>'
  ).join('');
  document.getElementById('buckets-onboarding-modal').classList.add('open');
}

async function markOnboardingDone() {
  await fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'buckets_onboarding_done', value: '1' })
  });
}

document.getElementById('btn-onboarding-skip').addEventListener('click', async () => {
  await markOnboardingDone();
  document.getElementById('buckets-onboarding-modal').classList.remove('open');
});

document.getElementById('btn-onboarding-create').addEventListener('click', async () => {
  const checks = document.querySelectorAll('#onboarding-suggestions input[type=checkbox]:checked');
  const toCreate = Array.from(checks).map(cb => BUCKET_SUGGESTIONS[parseInt(cb.dataset.obIdx)]);
  for (const s of toCreate) {
    await fetch('/api/savings-buckets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: s.name, target_amount: s.target })
    });
  }
  await markOnboardingDone();
  document.getElementById('buckets-onboarding-modal').classList.remove('open');
  if (state.currentView === 'savings') await loadSavings();
  await loadDashboard();
});

// btn-modal-new-bucket in edit transaction modal
document.getElementById('btn-modal-new-bucket').addEventListener('click', () => {
  document.getElementById('b-name').value = '';
  document.getElementById('b-target').value = '';
  document.getElementById('add-bucket-modal').classList.add('open');
});

// ─── Transactions ─────────────────────────────────────────────────────────────
async function loadTransactions() {
  const params = {
    page: state.txPage,
    pageSize: state.txPageSize,
  };
  if (state.txFilters.month) params.month = state.txFilters.month;
  if (state.txFilters.category) params.category = state.txFilters.category;
  if (state.txFilters.search) params.search = state.txFilters.search;

  const { rows, total, totalPages } = await fetch('/api/transactions?' + new URLSearchParams(params)).then(r => r.json());
  state.txTotal = total;
  state.txTotalPages = totalPages;

  const tbody = document.getElementById('tx-tbody');
  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:48px;color:var(--muted);">No transactions found</td></tr>';
  } else {
    tbody.innerHTML = rows.map(tx => {
      let tagCell = '';
      if (tx.is_income_verified) {
        tagCell = '<span title="Manually tagged" style="color:var(--pos);font-size:11px;font-weight:600;">✓ Tagged</span>';
      } else if (tx.amount > 0) {
        tagCell = '<button class="btn btn-outline btn-sm" style="font-size:10px;padding:2px 7px;" data-tx-action="income" data-tx-id="' + tx.id + '">+ Income</button>';
      } else {
        tagCell = '<button class="btn btn-outline btn-sm" style="font-size:10px;padding:2px 7px;" data-tx-action="savings" data-tx-id="' + tx.id + '">+ Savings</button>';
      }
      return '<tr data-id="' + tx.id + '">' +
        '<td class="td-merchant">' + esc(tx.merchant) + '</td>' +
        '<td><span class="td-cat" style="cursor:pointer;" title="Click to recategorize" data-cat-id="' + tx.id + '" data-cat-val="' + esc(tx.category) + '">' + esc(tx.category) + '</span></td>' +
        '<td style="color:var(--muted);font-size:12px;">' + esc(tx.note || '—') + '</td>' +
        '<td class="td-date">' + esc(tx.date) + '</td>' +
        '<td style="color:var(--muted);font-size:11px;text-transform:uppercase;">' + esc(tx.source) + '</td>' +
        '<td class="right td-amount" style="color:' + (tx.amount >= 0 ? 'var(--pos)' : tx.category === 'Savings' ? 'var(--gold)' : 'var(--neg)') + '">' + fmtMoneyPlain(tx.amount) + '</td>' +
        '<td style="white-space:nowrap;">' + tagCell + '</td>' +
      '</tr>';
    }).join('');
    tbody.querySelectorAll('tr').forEach(tr => {
      tr.addEventListener('click', () => openEditModal(parseInt(tr.dataset.id), rows));
    });
    tbody.querySelectorAll('span[data-cat-id]').forEach(badge => {
      badge.addEventListener('click', function(e) {
        e.stopPropagation();
        startInlineCatEdit(e, parseInt(this.dataset.catId), this.dataset.catVal);
      });
    });
    tbody.querySelectorAll('button[data-tx-action]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        markTransaction(parseInt(this.dataset.txId), this.dataset.txAction);
      });
    });
  }

  const start = (state.txPage - 1) * state.txPageSize + 1;
  const end = Math.min(state.txPage * state.txPageSize, total);
  document.getElementById('tx-count-label').textContent = total === 0 ? 'No results' : (start + '–' + end + ' of ' + total);
  document.getElementById('btn-prev').disabled = state.txPage <= 1;
  document.getElementById('btn-next').disabled = state.txPage >= totalPages;
}

async function markTransaction(id, action) {
  await fetch('/api/transactions/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: {
      category: action === 'income' ? 'Income' : 'Savings',
      is_income_verified: 1
    }})
  });
  loadTransactions();
  if (state.currentView === 'dashboard') loadDashboard();
}

// Month filter options
async function initFilters() {
  state.categories = await fetch('/api/categories').then(r => r.json());

  const catSelect = document.getElementById('filter-cat');
  state.categories.forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    catSelect.appendChild(o);
  });

  const fCat = document.getElementById('f-category');
  const mCat = document.getElementById('m-category');
  state.categories.forEach(c => {
    [fCat, mCat].forEach(sel => {
      const o = document.createElement('option');
      o.value = c; o.textContent = c;
      sel.appendChild(o);
    });
  });

  const monthSel = document.getElementById('filter-month');
  const dashMonthSel = document.getElementById('dash-month');
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const val = d.toISOString().slice(0, 7);
    const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const o = document.createElement('option');
    o.value = val; o.textContent = label;
    monthSel.appendChild(o);
    const o2 = document.createElement('option');
    o2.value = val; o2.textContent = label;
    if (val === state.dashMonth) o2.selected = true;
    dashMonthSel.appendChild(o2);
  }

  dashMonthSel.addEventListener('change', e => {
    state.dashMonth = e.target.value;
    loadDashboard();
  });
}

document.getElementById('filter-month').addEventListener('change', e => {
  state.txFilters.month = e.target.value;
  state.txPage = 1;
  loadTransactions();
});
document.getElementById('filter-cat').addEventListener('change', e => {
  state.txFilters.category = e.target.value;
  state.txPage = 1;
  loadTransactions();
});
document.getElementById('filter-search').addEventListener('input', e => {
  clearTimeout(state.searchDebounce);
  state.searchDebounce = setTimeout(() => {
    state.txFilters.search = e.target.value;
    state.txPage = 1;
    loadTransactions();
  }, 300);
});
document.getElementById('btn-prev').addEventListener('click', () => {
  if (state.txPage > 1) { state.txPage--; loadTransactions(); }
});
document.getElementById('btn-next').addEventListener('click', () => {
  if (state.txPage < state.txTotalPages) { state.txPage++; loadTransactions(); }
});

// ─── Edit Transaction Modal ───────────────────────────────────────────────────
let editingTxId = null;

function openEditModal(id, rows) {
  const tx = rows.find(r => r.id === id);
  if (!tx) return;
  editingTxId = id;
  document.getElementById('m-id').value = id;
  document.getElementById('m-date').value = tx.date;
  document.getElementById('m-merchant').value = tx.merchant;
  document.getElementById('m-amount').value = tx.amount;
  document.getElementById('m-category').value = tx.category;
  document.getElementById('m-note').value = tx.note || '';

  const isSavings = tx.category === 'Savings';
  document.getElementById('m-bucket-group').style.display = isSavings ? '' : 'none';
  if (isSavings) populateBucketSelect('m-bucket-id', tx.savings_bucket_id);

  document.getElementById('edit-modal').classList.add('open');
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('btn-modal-cancel').addEventListener('click', closeModal);
document.getElementById('edit-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('edit-modal')) closeModal();
});
function closeModal() {
  document.getElementById('edit-modal').classList.remove('open');
  editingTxId = null;
}

document.getElementById('m-category').addEventListener('change', function() {
  const isSavings = this.value === 'Savings';
  document.getElementById('m-bucket-group').style.display = isSavings ? '' : 'none';
  if (isSavings) populateBucketSelect('m-bucket-id', null);
});

document.getElementById('btn-modal-save').addEventListener('click', async () => {
  if (!editingTxId) return;
  const newCategory = document.getElementById('m-category').value;
  const isSavings = newCategory === 'Savings';
  const bucketIdVal = document.getElementById('m-bucket-id').value;
  const fields = {
    date: document.getElementById('m-date').value,
    merchant: document.getElementById('m-merchant').value,
    amount: parseFloat(document.getElementById('m-amount').value),
    category: newCategory,
    note: document.getElementById('m-note').value,
    savings_bucket_id: isSavings && bucketIdVal ? parseInt(bucketIdVal) : null,
  };
  await fetch('/api/transactions/' + editingTxId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  }).then(r => r.json());
  closeModal();
  loadTransactions();
  if (state.currentView === 'dashboard') loadDashboard();
  if (state.currentView === 'savings') loadSavings();
});

document.getElementById('btn-delete-tx').addEventListener('click', async () => {
  if (!editingTxId) return;
  if (!confirm('Delete this transaction? This cannot be undone.')) return;
  await fetch('/api/transactions/' + editingTxId, { method: 'DELETE' }).then(r => r.json());
  closeModal();
  loadTransactions();
  if (state.currentView === 'dashboard') loadDashboard();
});

// ─── Generic modal close helpers ─────────────────────────────────────────────
document.addEventListener('click', e => {
  if (e.target.dataset.modal) {
    document.getElementById(e.target.dataset.modal).classList.remove('open');
  }
  if (e.target.dataset.modalCancel) {
    document.getElementById(e.target.dataset.modalCancel).classList.remove('open');
  }
  if (e.target.classList.contains('modal-backdrop') && e.target.id !== 'edit-modal') {
    e.target.classList.remove('open');
  }
});

// ─── Import ───────────────────────────────────────────────────────────────────
const dropZone = document.getElementById('drop-zone');
const progressSection = document.getElementById('progress-section');
const importResult = document.getElementById('import-result');

function resetImport() {
  progressSection.classList.remove('visible');
  importResult.classList.remove('visible');
  dropZone.style.display = '';
  document.querySelectorAll('.p-step').forEach(s => s.classList.remove('active', 'done'));
  const bar = document.getElementById('progress-bar');
  bar.style.width = '0%';
  bar.style.background = '';
  document.getElementById('progress-msg').style.color = '';
  document.getElementById('progress-msg').textContent = 'Starting…';
}

document.getElementById('btn-browse').addEventListener('click', () => {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  startImport(file);
  e.target.value = '';
});

dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (!file) return;
  startImport(file);
});

async function startImport(file) {
  dropZone.style.display = 'none';
  importResult.classList.remove('visible');
  progressSection.classList.add('visible');

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/import', { method: 'POST', body: formData });
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const event = JSON.parse(line.slice(6));

      if (event.step === 'error') {
        const bar = document.getElementById('progress-bar');
        const msgEl = document.getElementById('progress-msg');
        bar.style.background = 'var(--neg)';
        bar.style.width = '100%';
        msgEl.style.color = 'var(--neg)';
        msgEl.textContent = event.msg;
      } else {
        const bar = document.getElementById('progress-bar');
        const msgEl = document.getElementById('progress-msg');
        bar.style.width = event.pct + '%';
        msgEl.style.color = '';
        msgEl.textContent = event.msg;

        const steps = ['reading', 'extracting', 'stripping', 'analyzing', 'saving', 'done'];
        document.querySelectorAll('.p-step').forEach(el => {
          const s = el.dataset.step;
          if (s === event.step) {
            el.classList.remove('done'); el.classList.add('active');
          } else if (steps.indexOf(s) < steps.indexOf(event.step)) {
            el.classList.remove('active'); el.classList.add('done');
          }
        });
      }

      if (event.result) {
        importResult.classList.add('visible');
        const resText = document.getElementById('result-text');
        if (event.result.errors && event.result.errors.includes('NO_API_KEY')) {
          document.getElementById('api-warning').style.display = '';
          resText.innerHTML = '<div class="result-error">AI not connected</div><div style="color:var(--muted);font-size:13px;">Connect an AI provider to parse statements. <button class="btn-link" onclick="openConnectAiModal()">Set up now →</button></div>';
        } else if (event.result.errors && event.result.errors.length) {
          resText.innerHTML = '<div class="result-error">Import failed</div><div style="color:var(--muted);font-size:13px;">' + esc(event.result.errors.join('; ')) + '</div>';
        } else {
          resText.innerHTML = '<div class="result-success">Successfully imported ' + event.result.count + ' transaction' + (event.result.count !== 1 ? 's' : '') + '!</div>';
        }
      }
    }
  }
}

document.getElementById('btn-import-again').addEventListener('click', resetImport);
document.getElementById('btn-view-txs').addEventListener('click', () => navigate('transactions'));

// ─── Add Transaction Form ─────────────────────────────────────────────────────
document.getElementById('f-date').value = new Date().toISOString().slice(0, 10);

function validateForm() {
  let valid = true;
  const date = document.getElementById('f-date').value;
  const merchant = document.getElementById('f-merchant').value.trim();
  const amount = document.getElementById('f-amount').value;

  const showErr = (id, errId, show) => {
    document.getElementById(id).classList.toggle('invalid', show);
    document.getElementById(errId).classList.toggle('visible', show);
    if (show) valid = false;
  };

  showErr('f-date', 'e-date', !date);
  showErr('f-merchant', 'e-merchant', !merchant);
  showErr('f-amount', 'e-amount', !amount || isNaN(parseFloat(amount)));
  return valid;
}

document.getElementById('btn-save-tx').addEventListener('click', async () => {
  if (!validateForm()) return;

  const feedback = document.getElementById('form-feedback');
  feedback.style.display = 'none';

  try {
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: document.getElementById('f-date').value,
        merchant: document.getElementById('f-merchant').value.trim(),
        amount: parseFloat(document.getElementById('f-amount').value),
        category: document.getElementById('f-category').value,
        note: document.getElementById('f-note').value.trim(),
      })
    }).then(r => r.json());
    feedback.style.display = 'block';
    feedback.style.color = 'var(--pos)';
    feedback.textContent = 'Transaction saved!';
    clearForm();
    setTimeout(() => { feedback.style.display = 'none'; }, 3000);
  } catch (err) {
    feedback.style.display = 'block';
    feedback.style.color = 'var(--neg)';
    feedback.textContent = 'Error: ' + err.message;
  }
});

document.getElementById('btn-clear-form').addEventListener('click', clearForm);

function clearForm() {
  document.getElementById('f-date').value = new Date().toISOString().slice(0, 10);
  document.getElementById('f-merchant').value = '';
  document.getElementById('f-amount').value = '';
  document.getElementById('f-note').value = '';
  document.getElementById('f-category').value = state.categories[state.categories.length - 1] || '';
  document.querySelectorAll('#view-add .form-input').forEach(el => el.classList.remove('invalid'));
  document.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));
}

// ─── Investments ──────────────────────────────────────────────────────────────
async function loadInvestments(autoRefresh) {
  if (autoRefresh === undefined) autoRefresh = true;
  if (autoRefresh) {
    const data = await fetch('/api/holdings').then(r => r.json());
    const now = Math.floor(Date.now() / 1000);
    const hasStale = data.rows.some(r => r.ticker && r.quantity && (!r.price_fetched_at || now - r.price_fetched_at > 3600));
    if (hasStale) {
      setRefreshStatus('Updating live prices…', false);
      refreshPrices(false);
      return;
    }
  }

  const data = await fetch('/api/holdings').then(r => r.json());
  const { rows, totalValue, totalCost, totalGainLoss } = data;

  document.getElementById('inv-total-value').textContent = fmtDollars(totalValue);

  const hasCostData = totalCost > 0;
  document.getElementById('inv-cost-basis').textContent = hasCostData ? fmtDollars(totalCost) : '—';

  const glDollarEl = document.getElementById('inv-gain-dollar');
  const glPctEl    = document.getElementById('inv-gain-pct');
  if (hasCostData) {
    glDollarEl.textContent = (totalGainLoss >= 0 ? '+$' : '-$') + Math.abs(totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    glDollarEl.style.color = totalGainLoss >= 0 ? 'var(--pos)' : 'var(--neg)';
    const pct = (totalGainLoss / totalCost) * 100;
    glPctEl.textContent = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
    glPctEl.style.color = pct >= 0 ? 'var(--pos)' : 'var(--neg)';
  } else {
    glDollarEl.textContent = '—'; glDollarEl.style.color = '';
    glPctEl.textContent = '—';   glPctEl.style.color = '';
  }

  const tbody = document.getElementById('holdings-tbody');
  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:48px;color:var(--muted);">No holdings yet — add your first position</td></tr>';
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  tbody.innerHTML = rows.map(h => {
    const hasCost = h.cost_basis != null && h.cost_basis > 0;
    const glDollar = hasCost ? h.current_value - h.cost_basis : null;
    const glPct    = hasCost ? ((h.current_value - h.cost_basis) / h.cost_basis) * 100 : null;
    const glColor  = glDollar >= 0 ? 'var(--pos)' : 'var(--neg)';

    const qtyDisplay = h.quantity != null
      ? h.quantity.toLocaleString('en-US', { maximumFractionDigits: 6 })
      : '<span style="color:var(--muted)">—</span>';

    let priceLabel = '';
    if (h.ticker && h.quantity) {
      if (h.price_fetched_at) {
        const ageMin = Math.round((now - h.price_fetched_at) / 60);
        const ageStr = ageMin < 1 ? 'just now' : ageMin < 60 ? ageMin + 'm ago' : Math.round(ageMin/60) + 'h ago';
        priceLabel = '<div style="font-size:10px;color:var(--pos);margin-top:2px;">● Live · ' + ageStr + '</div>';
      } else {
        priceLabel = '<div style="font-size:10px;color:var(--muted);margin-top:2px;">No price yet — click Refresh</div>';
      }
    }

    const tickerDisplay = h.ticker
      ? '<span class="td-cat" style="font-family:\\'JetBrains Mono\\',monospace;font-size:11px;">' + esc(h.ticker) + '</span>'
      : '<span style="color:var(--muted)">—</span>';

    const updatedDate = new Date(h.updated_at * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const notesHtml = h.notes ? '<br><span style="color:var(--muted);font-size:11px;">' + esc(h.notes) + '</span>' : '';

    return '<tr>' +
      '<td class="td-merchant">' + esc(h.name) + notesHtml + '</td>' +
      '<td>' + tickerDisplay + '</td>' +
      '<td class="mono" style="font-size:13px;">' + qtyDisplay + '</td>' +
      '<td class="right mono" style="font-size:13px;">' + (hasCost ? fmtDollars(h.cost_basis) : '<span style="color:var(--muted)">—</span>') + '</td>' +
      '<td class="right" style="font-size:13px;">' + fmtDollars(h.current_value) + priceLabel + '</td>' +
      '<td class="right mono" style="font-size:13px;color:' + (glDollar !== null ? glColor : 'inherit') + ';">' +
        (glDollar !== null ? (glDollar >= 0 ? '+$' : '-$') + Math.abs(glDollar).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '<span style="color:var(--muted)">—</span>') +
      '</td>' +
      '<td class="right mono" style="font-size:13px;color:' + (glPct !== null ? glColor : 'inherit') + ';">' +
        (glPct !== null ? (glPct >= 0 ? '+' : '') + glPct.toFixed(2) + '%' : '<span style="color:var(--muted)">—</span>') +
      '</td>' +
      '<td style="color:var(--muted);font-size:12px;">' + updatedDate + '</td>' +
      '<td class="right" style="padding:0 10px;"><button class="btn btn-outline btn-sm" onclick="openEditHoldingModal(' + h.id + ', ' + JSON.stringify(h).replace(/"/g, '&quot;') + ')">Edit</button></td>' +
      '</tr>';
  }).join('');
}

function setRefreshStatus(msg, done) {
  const el = document.getElementById('inv-price-status');
  if (!el) return;
  el.textContent = msg;
  el.style.color = done ? 'var(--pos)' : 'var(--muted)';
}

async function refreshPrices(showBtn) {
  if (showBtn === undefined) showBtn = true;
  const btn = document.getElementById('btn-refresh-prices');
  if (showBtn && btn) btn.disabled = true;
  setRefreshStatus('Fetching live prices from Yahoo Finance…', false);
  try {
    const result = await fetch('/api/holdings/refresh-prices', { method: 'POST' }).then(r => r.json());
    if (result.updated && result.updated.length) {
      setRefreshStatus('Updated: ' + result.updated.map(r => r.ticker).join(', ') + ' · ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), true);
    } else if (result.failed && result.failed.length) {
      setRefreshStatus('Could not fetch: ' + result.failed.join(', ') + ' — check ticker symbols', false);
    } else {
      setRefreshStatus(result.skipped || 'Nothing to refresh', false);
    }
    await loadInvestments(false);
  } catch (e) {
    setRefreshStatus('Error: ' + e.message, false);
  }
  if (showBtn && btn) btn.disabled = false;
}

document.getElementById('btn-refresh-prices').addEventListener('click', () => refreshPrices(true));

function openAddHoldingModal() {
  ['h-name','h-ticker','h-quantity','h-cost','h-value','h-notes'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('add-holding-modal').classList.add('open');
}
document.getElementById('btn-add-holding').addEventListener('click', openAddHoldingModal);

document.getElementById('btn-save-holding').addEventListener('click', async () => {
  const name = document.getElementById('h-name').value.trim();
  const ticker = document.getElementById('h-ticker').value.trim().toUpperCase() || null;
  const quantity = document.getElementById('h-quantity').value ? parseFloat(document.getElementById('h-quantity').value) : null;
  const cost_basis = document.getElementById('h-cost').value ? parseFloat(document.getElementById('h-cost').value) : null;
  const current_value = parseFloat(document.getElementById('h-value').value);
  const notes = document.getElementById('h-notes').value.trim();

  if (!name || isNaN(current_value) || current_value < 0) {
    alert('Please enter an asset name and a valid current value.');
    return;
  }
  await fetch('/api/holdings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, ticker, quantity, cost_basis, current_value, notes })
  }).then(r => r.json());
  document.getElementById('add-holding-modal').classList.remove('open');
  await loadInvestments(false);
  if (ticker && quantity) refreshPrices(false);
});

function openEditHoldingModal(id, holding) {
  document.getElementById('eh-id').value = id;
  document.getElementById('eh-name').value = holding.name || '';
  document.getElementById('eh-ticker').value = holding.ticker || '';
  document.getElementById('eh-quantity').value = holding.quantity != null ? holding.quantity : '';
  document.getElementById('eh-cost').value = holding.cost_basis != null ? holding.cost_basis : '';
  document.getElementById('eh-value').value = holding.current_value || '';
  document.getElementById('eh-notes').value = holding.notes || '';
  document.getElementById('edit-holding-modal').classList.add('open');
}

document.getElementById('btn-update-holding').addEventListener('click', async () => {
  const id = parseInt(document.getElementById('eh-id').value);
  const fields = {
    name: document.getElementById('eh-name').value.trim(),
    ticker: document.getElementById('eh-ticker').value.trim().toUpperCase() || null,
    quantity: document.getElementById('eh-quantity').value ? parseFloat(document.getElementById('eh-quantity').value) : null,
    cost_basis: document.getElementById('eh-cost').value ? parseFloat(document.getElementById('eh-cost').value) : null,
    current_value: parseFloat(document.getElementById('eh-value').value),
    notes: document.getElementById('eh-notes').value.trim(),
  };
  if (!fields.name || isNaN(fields.current_value)) {
    alert('Asset name and current value are required.');
    return;
  }
  await fetch('/api/holdings/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  }).then(r => r.json());
  document.getElementById('edit-holding-modal').classList.remove('open');
  await loadInvestments(false);
  if (fields.ticker && fields.quantity) refreshPrices(false);
});

document.getElementById('btn-delete-holding').addEventListener('click', async () => {
  const id = parseInt(document.getElementById('eh-id').value);
  if (!confirm('Delete this holding? This cannot be undone.')) return;
  await fetch('/api/holdings/' + id, { method: 'DELETE' }).then(r => r.json());
  document.getElementById('edit-holding-modal').classList.remove('open');
  await loadInvestments();
});

// ─── Insights ─────────────────────────────────────────────────────────────────
async function loadInsights() {
  const allMonths = await fetch('/api/insights/all').then(r => r.json()).catch(() => []);
  const sel = document.getElementById('insight-month-select');
  sel.innerHTML = '<option value="">Latest</option>' +
    allMonths.map(m => '<option value="' + esc(m.month) + '">' + esc(m.month) + '</option>').join('');

  sel.addEventListener('change', async (e) => {
    const month = e.target.value;
    if (!month) { loadInsights(); return; }
    const row = await fetch('/api/insights/all?month=' + encodeURIComponent(month)).then(r => r.json());
    if (row) renderInsight({ ...row, cached: true });
  });

  const insight = await fetch('/api/insights/latest').then(r => r.json());
  if (insight) {
    renderInsight(insight);
  } else {
    document.getElementById('insight-empty-title').textContent = 'No insights yet';
    document.getElementById('insight-empty-body').textContent = 'Click "Generate Insights" to analyze your spending with AI';
    document.getElementById('insight-empty').style.display = '';
    document.getElementById('insight-content').style.display = 'none';
    document.getElementById('insight-meta-bar').style.display = 'none';
  }
}

async function generateInsights() {
  document.getElementById('insight-empty').style.display = 'none';
  document.getElementById('insight-content').style.display = 'none';
  document.getElementById('insight-meta-bar').style.display = 'none';
  document.getElementById('insight-spinner').style.display = 'block';
  document.getElementById('btn-generate-insight').disabled = true;

  try {
    const result = await fetch('/api/insights/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ months: 3 })
    }).then(r => r.json());
    if (result.error) throw new Error(result.error);
    document.getElementById('insight-spinner').style.display = 'none';
    renderInsight(result);
  } catch (e) {
    document.getElementById('insight-spinner').style.display = 'none';
    document.getElementById('insight-empty').style.display = '';
    if (e.message === 'NO_API_KEY') {
      document.getElementById('insight-empty-title').textContent = 'AI Not Connected';
      document.getElementById('insight-empty-body').innerHTML = 'AI Insights require an API key. Connect your preferred AI provider to get started.';
      const goBtn = document.createElement('button');
      goBtn.className = 'btn btn-gold btn-sm';
      goBtn.style.marginTop = '12px';
      goBtn.textContent = 'Connect AI';
      goBtn.addEventListener('click', function() { openConnectAiModal(); });
      document.getElementById('insight-empty-body').appendChild(goBtn);
    } else {
      document.getElementById('insight-empty-title').textContent = 'Error generating insights';
      document.getElementById('insight-empty-body').textContent = e.message;
    }
  }
  document.getElementById('btn-generate-insight').disabled = false;
}

function renderInsight(insight) {
  document.getElementById('insight-empty').style.display = 'none';
  document.getElementById('insight-spinner').style.display = 'none';
  document.getElementById('insight-content').style.display = 'block';
  document.getElementById('insight-meta-bar').style.display = 'flex';

  const ageSeconds = Math.floor(Date.now() / 1000) - insight.generated_at;
  document.getElementById('insight-generated-label').textContent = 'Generated ' + timeAgo(insight.generated_at);
  document.getElementById('insight-cached-label').textContent = insight.cached ? '· Cached' : '· Fresh';
  document.getElementById('insight-stale-label').style.display = ageSeconds > 82800 ? '' : 'none';

  let data = null;
  try {
    let txt = insight.insight_text;
    // Strip markdown fences or leading/trailing text if present
    if (txt && !txt.trimStart().startsWith('{')) {
      const fence = txt.match(/\`\`\`(?:json)?\\s*([\\s\\S]*?)\`\`\`/);
      if (fence) { txt = fence[1].trim(); }
      else {
        const s = txt.indexOf('{'), e = txt.lastIndexOf('}');
        if (s !== -1 && e > s) txt = txt.slice(s, e + 1);
      }
    }
    const parsed = JSON.parse(txt);
    if (parsed && parsed.schema_version === 2) data = parsed;
  } catch {}

  // Show/hide the right containers
  document.getElementById('insight-legacy-body').style.display = data ? 'none' : 'block';
  document.getElementById('insight-summary-card').style.display = data ? 'flex' : 'none';
  document.getElementById('insight-alerts-section').style.display = 'none';
  document.getElementById('insight-actions-list').innerHTML = '';
  document.getElementById('insight-categories-list').innerHTML = '';
  document.getElementById('insight-subscriptions-list').innerHTML = '';
  document.getElementById('insight-savings-opps-list').innerHTML = '';
  document.getElementById('insight-investment-context').innerHTML = '';
  document.getElementById('insight-trends-table').innerHTML = '';

  if (data) renderInsightJSON(data);
  else renderInsightMarkdown(insight.insight_text);
}

function renderInsightJSON(data) {
  // Summary
  document.getElementById('insight-summary-text').textContent = data.summary || '';

  // Alerts
  if (data.key_alerts && data.key_alerts.length > 0) {
    document.getElementById('insight-alerts-section').style.display = 'block';
    document.getElementById('insight-alerts-list').innerHTML = data.key_alerts.map(a =>
      '<div class="insight-alert insight-alert-' + esc(a.severity) + '">' + esc(a.message) + '</div>'
    ).join('');
  }

  // Action items
  document.getElementById('insight-actions-list').innerHTML = (data.action_items || []).map(item => {
    const isDone = localStorage.getItem('finbase_action_done_' + item.id) === '1';
    const impactStr = item.estimated_impact
      ? '$' + Math.abs(item.estimated_impact).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + '/' + (item.impact_period || 'month')
      : '';
    const dueStr = item.due_date ? 'Due ' + item.due_date : '';
    return '<div class="insight-action-item ' + (isDone ? 'insight-action-done' : '') + '" data-action-id="' + esc(item.id) + '">' +
      '<label class="insight-action-check">' +
        '<input type="checkbox" class="insight-checkbox" ' + (isDone ? 'checked' : '') + ' data-action-id="' + esc(item.id) + '">' +
        '<span class="insight-checkbox-custom"></span>' +
      '</label>' +
      '<div class="insight-action-body">' +
        '<div class="insight-action-title">' + esc(item.title) + '</div>' +
        (item.description ? '<div class="insight-action-desc">' + esc(item.description) + '</div>' : '') +
        '<div class="insight-action-meta">' +
          '<span class="insight-priority-badge insight-priority-' + esc(item.priority) + '">' + esc(item.priority) + '</span>' +
          (item.category ? '<span class="insight-category-tag">' + esc(item.category) + '</span>' : '') +
          (impactStr ? '<span class="insight-action-impact">' + esc(impactStr) + '</span>' : '') +
          (dueStr ? '<span class="insight-action-due">' + esc(dueStr) + '</span>' : '') +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  // Wire checkboxes
  document.getElementById('insight-actions-list').querySelectorAll('.insight-checkbox').forEach(cb => {
    cb.addEventListener('change', function() {
      const id = this.dataset.actionId;
      localStorage.setItem('finbase_action_done_' + id, this.checked ? '1' : '0');
      const row = this.closest('.insight-action-item');
      if (row) row.classList.toggle('insight-action-done', this.checked);
    });
  });

  // Categories
  document.getElementById('insight-categories-list').innerHTML = (data.top_categories || []).map(c => {
    const dir = c.trend_dir || 'flat';
    const pct = c.trend_pct ? Math.abs(c.trend_pct).toFixed(0) + '%' : '';
    return '<div class="insight-cat-row">' +
      '<span class="insight-cat-name">' + esc(c.category) + '</span>' +
      '<span class="insight-cat-note">' + esc(c.note || '') + '</span>' +
      '<span class="insight-cat-amount-wrap">' +
        '<span class="insight-cat-amount">$' + (c.amount || 0).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + '</span>' +
        '<span class="insight-trend-badge trend-' + esc(dir) + '">' + (dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→') + (pct ? ' ' + pct : '') + '</span>' +
      '</span>' +
    '</div>';
  }).join('');

  // Subscriptions
  document.getElementById('insight-subscriptions-list').innerHTML = (data.subscriptions || []).map(s =>
    '<div class="insight-sub-row">' +
      '<div>' +
        '<div class="insight-sub-merchant">' + esc(s.merchant) + '</div>' +
        '<div class="insight-sub-reason">' + esc(s.reason || '') + '</div>' +
      '</div>' +
      '<div class="insight-sub-right">' +
        '<span class="insight-sub-amount">$' + (s.amount_monthly || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '/mo</span>' +
        '<span class="insight-rec-badge rec-' + esc(s.recommendation) + '">' + esc(s.recommendation) + '</span>' +
      '</div>' +
    '</div>'
  ).join('');

  // Savings opportunities
  document.getElementById('insight-savings-opps-list').innerHTML = (data.savings_opportunities || []).map(o =>
    '<div class="insight-opp-row">' +
      '<div class="insight-opp-title">' + esc(o.title) + '</div>' +
      '<div class="insight-opp-detail">' + esc(o.detail || '') + '</div>' +
      (o.estimated_monthly_savings ? '<div class="insight-opp-savings">Save ~$' + o.estimated_monthly_savings.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + '/mo</div>' : '') +
    '</div>'
  ).join('');

  // Investment context
  const ic = data.investment_context || {};
  let icHtml = '';
  if (ic.hysa_rate_current) {
    icHtml += '<div class="insight-ic-row"><span class="insight-ic-label">HYSA Rate</span><span class="insight-ic-value">' + ic.hysa_rate_current + '%</span>' + (ic.hysa_source ? '<span class="insight-ic-source">via ' + esc(ic.hysa_source) + '</span>' : '') + '</div>';
  }
  if (ic.market_notes) {
    icHtml += '<div class="insight-ic-row"><span class="insight-ic-label">Market</span><span class="insight-ic-notes">' + esc(ic.market_notes) + '</span></div>';
  }
  if (ic.portfolio_feedback) {
    icHtml += '<div class="insight-ic-row"><span class="insight-ic-label">Portfolio</span><span class="insight-ic-feedback">' + esc(ic.portfolio_feedback) + '</span></div>';
  }
  if (ic.suggestions && ic.suggestions.length > 0) {
    icHtml += '<div class="insight-ic-row"><span class="insight-ic-label">Ideas</span><ul class="insight-ic-suggestions">' + ic.suggestions.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul></div>';
  }
  document.getElementById('insight-investment-context').innerHTML = icHtml || '<div style="font-size:12px;color:var(--muted);">No investment data available.</div>';

  // Monthly trends table
  const trends = data.monthly_trends || [];
  if (trends.length > 0) {
    let tblHtml = '<table class="insight-trends-tbl"><thead><tr>' +
      '<th>Month</th><th>Income</th><th>Expenses</th><th>Savings</th><th>Net Flow</th>' +
      '</tr></thead><tbody>';
    tblHtml += trends.map(t => {
      const net = t.net_flow || 0;
      return '<tr>' +
        '<td>' + esc(t.month) + '</td>' +
        '<td style="color:var(--pos)">$' + (t.total_income || 0).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + '</td>' +
        '<td style="color:var(--neg)">$' + (t.total_expenses || 0).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + '</td>' +
        '<td style="color:var(--gold)">$' + (t.total_savings || 0).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + '</td>' +
        '<td style="color:' + (net >= 0 ? 'var(--pos)' : 'var(--neg)') + '">' + (net >= 0 ? '+' : '') + '$' + Math.abs(net).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + '</td>' +
      '</tr>';
    }).join('');
    tblHtml += '</tbody></table>';
    document.getElementById('insight-trends-table').innerHTML = tblHtml;
  }
}

function renderInsightMarkdown(text) {
  const html = esc(text)
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^\\* (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\\/li>\\n?)+/g, m => '<ul>' + m + '</ul>')
    .replace(/\\n\\n/g, '<br><br>')
    .replace(/\\n/g, '<br>');
  document.getElementById('insight-body-text').innerHTML = html;
}

document.getElementById('btn-generate-insight').addEventListener('click', generateInsights);

// ─── Goals ────────────────────────────────────────────────────────────────────
async function loadGoals() {
  const { rows } = await fetch('/api/goals').then(r => r.json());
  const grid = document.getElementById('goals-grid');
  const empty = document.getElementById('goals-empty');

  if (rows.length === 0) {
    empty.style.display = '';
    grid.innerHTML = '';
    return;
  }
  empty.style.display = 'none';

  const projections = await Promise.all(rows.map(g => fetch('/api/goals/' + g.id + '/projection').then(r => r.json()).catch(() => null)));

  Object.keys(state.charts).forEach(k => {
    if (k.startsWith('goal-')) {
      state.charts[k].destroy();
      delete state.charts[k];
    }
  });

  grid.innerHTML = rows.map((g, i) => renderGoalCard(g, projections[i])).join('');

  grid.querySelectorAll('button[data-goal-suggest]').forEach(btn => {
    btn.addEventListener('click', function() {
      loadGoalSuggestions(parseInt(this.dataset.goalSuggest), this.dataset.goalName);
    });
  });
  grid.querySelectorAll('button[data-goal-delete]').forEach(btn => {
    btn.addEventListener('click', function() {
      confirmDeleteGoal(parseInt(this.dataset.goalDelete));
    });
  });

  rows.forEach((g, i) => {
    const proj = projections[i];
    if (proj && proj.chartData) {
      drawProjectionChart('goal-chart-' + g.id, proj.chartData);
    }
  });
}

function renderGoalCard(goal, projection) {
  const onTrack = projection ? projection.onTrack : null;
  const monthlyNeeded = projection ? projection.monthlyNeeded : null;
  const currentRate = projection ? projection.currentSavingsRate : null;

  const trackBadge = onTrack === null ? '' :
    onTrack
      ? '<span class="badge-signal badge-ontrack" style="font-size:11px;padding:2px 8px;">On Track</span>'
      : '<span class="badge-signal badge-behind" style="font-size:11px;padding:2px 8px;">Behind</span>';

  return '<div class="goal-card">' +
    '<div class="goal-card-header">' +
      '<div>' +
        '<div class="goal-name">' + esc(goal.name) + '</div>' +
        '<div class="goal-date">Target: ' + esc(goal.target_date) + '</div>' +
      '</div>' +
      trackBadge +
    '</div>' +
    '<div class="goal-target">' + fmtDollars(goal.target_amount) + '</div>' +
    '<div class="goal-stats">' +
      (monthlyNeeded !== null ? '<span>Need: <strong>' + fmtDollars(monthlyNeeded) + '/mo</strong></span>' : '') +
      (currentRate !== null ? '<span>Saving: <strong>' + fmtDollars(currentRate) + '/mo</strong></span>' : '') +
    '</div>' +
    '<div class="goal-chart-wrap">' +
      '<canvas id="goal-chart-' + goal.id + '" style="width:100%;height:100%;"></canvas>' +
    '</div>' +
    '<div class="goal-actions">' +
      '<button class="btn btn-outline btn-sm" data-goal-suggest="' + goal.id + '" data-goal-name="' + esc(goal.name) + '">AI Suggestions</button>' +
      '<button class="btn btn-danger btn-sm" data-goal-delete="' + goal.id + '">Delete</button>' +
    '</div>' +
  '</div>';
}

function drawProjectionChart(canvasId, chartData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (state.charts[canvasId]) {
    state.charts[canvasId].destroy();
  }

  const t = chartTheme();
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 120);
  grad.addColorStop(0, t.pos + '40');
  grad.addColorStop(1, t.pos + '00');

  state.charts[canvasId] = new Chart(canvas, {
    type: 'line',
    data: {
      labels: chartData.map(d => d.month),
      datasets: [
        {
          label: 'Projected',
          data: chartData.map(d => d.projected),
          borderColor: t.pos,
          backgroundColor: grad,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 4,
          pointBackgroundColor: t.pos,
        },
        {
          label: 'Needed',
          data: chartData.map(d => d.needed),
          borderColor: t.gold,
          borderWidth: 2,
          borderDash: [4, 4],
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 500 },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: t.tooltip.bg, borderColor: t.tooltip.border, borderWidth: 1,
          titleColor: t.tooltip.title, bodyColor: t.tooltip.body,
          padding: 8, cornerRadius: 6,
          callbacks: {
            label: ctx => '  ' + ctx.dataset.label + ': $' + ctx.parsed.y.toLocaleString('en-US', {minimumFractionDigits:0})
          }
        }
      },
      scales: {
        x: {
          grid: { color: t.grid, drawBorder: false },
          ticks: { color: t.muted, font: { size: 10 } },
          border: { display: false }
        },
        y: {
          grid: { color: t.grid, drawBorder: false },
          ticks: { color: t.muted, font: { size: 10 }, callback: v => '$' + v.toLocaleString() },
          border: { display: false }
        }
      }
    }
  });
}

async function loadGoalSuggestions(goalId, goalName) {
  document.getElementById('suggestions-modal-title').textContent = 'AI Suggestions — ' + goalName;
  document.getElementById('suggestions-spinner').style.display = 'block';
  document.getElementById('suggestions-content').style.display = 'none';
  document.getElementById('goal-suggestions-modal').classList.add('open');

  try {
    const result = await fetch('/api/goals/' + goalId + '/suggest', { method: 'POST' }).then(r => r.json());
    document.getElementById('suggestions-spinner').style.display = 'none';
    document.getElementById('suggestions-content').style.display = 'block';

    document.getElementById('suggestions-list').innerHTML = (result.suggestions || []).map(s =>
      '<div class="suggestion-item">' + esc(s) + '</div>'
    ).join('');

    const cuts = result.categoriesToCut || [];
    if (cuts.length) {
      document.getElementById('cuts-section').style.display = '';
      document.getElementById('cuts-list').innerHTML = cuts.map(c =>
        '<div class="cut-item"><span>' + esc(c.category) + '</span><span class="cut-saving">Save ~$' + c.potentialSaving + '/mo</span></div>'
      ).join('');
    } else {
      document.getElementById('cuts-section').style.display = 'none';
    }
  } catch (e) {
    document.getElementById('suggestions-spinner').style.display = 'none';
    document.getElementById('suggestions-content').style.display = 'block';
    document.getElementById('suggestions-list').innerHTML = '<div class="suggestion-item" style="color:var(--neg);">Error: ' + esc(e.message) + '</div>';
  }
}

async function confirmDeleteGoal(id) {
  if (!confirm('Delete this goal? This cannot be undone.')) return;
  await fetch('/api/goals/' + id, { method: 'DELETE' }).then(r => r.json());
  await loadGoals();
}

document.getElementById('btn-add-goal').addEventListener('click', () => {
  document.getElementById('g-name').value = '';
  document.getElementById('g-amount').value = '';
  document.getElementById('g-date').value = '';
  document.getElementById('add-goal-modal').classList.add('open');
});

document.getElementById('btn-save-goal').addEventListener('click', async () => {
  const name = document.getElementById('g-name').value.trim();
  const amount = parseFloat(document.getElementById('g-amount').value);
  const date = document.getElementById('g-date').value;

  if (!name || !amount || !date) {
    alert('Please fill in all fields.');
    return;
  }

  await fetch('/api/goals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, target_amount: amount, target_date: date })
  }).then(r => r.json());
  document.getElementById('add-goal-modal').classList.remove('open');
  await loadGoals();
});

// ─── Inline Category Edit ─────────────────────────────────────────────────────
function startInlineCatEdit(event, id, currentCat) {
  event.stopPropagation();
  const badge = event.currentTarget;
  const cell = badge.parentElement;

  const sel = document.createElement('select');
  sel.className = 'form-input';
  sel.style.cssText = 'padding:3px 8px;font-size:11px;height:28px;display:inline-block;min-width:130px;';
  state.categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    if (c === currentCat) opt.selected = true;
    sel.appendChild(opt);
  });

  cell.innerHTML = '';
  cell.appendChild(sel);
  sel.focus();

  let saved = false;
  sel.addEventListener('change', async () => {
    saved = true;
    const newCat = sel.value;
    sel.disabled = true;
    try {
      await fetch('/api/transactions/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: { category: newCat } })
      });
    } catch(e) {}
    renderInlineBadge(cell, id, newCat);
    if (state.currentView === 'dashboard') loadDashboard();
  });
  sel.addEventListener('blur', () => {
    if (!saved) renderInlineBadge(cell, id, currentCat);
  });
}

function renderInlineBadge(cell, id, category) {
  cell.innerHTML = '';
  const badge = document.createElement('span');
  badge.className = 'td-cat';
  badge.style.cursor = 'pointer';
  badge.title = 'Click to recategorize';
  badge.textContent = category;
  badge.onclick = (e) => startInlineCatEdit(e, id, category);
  cell.appendChild(badge);
}

// ─── Settings ─────────────────────────────────────────────────────────────────
async function loadSettings() {
  await Promise.all([loadIncomeSources(), loadSavingsDestinations(), loadApiKeyStatus()]);
}

const PROVIDER_LINKS = {
  anthropic: { label: 'Get a free key at console.anthropic.com', url: 'https://console.anthropic.com' },
  openai:    { label: 'Get a key at platform.openai.com', url: 'https://platform.openai.com/api-keys' }
};

function updateProviderLink(selectId, linkId) {
  const provider = document.getElementById(selectId)?.value || 'anthropic';
  const info = PROVIDER_LINKS[provider] || PROVIDER_LINKS.anthropic;
  const el = document.getElementById(linkId);
  if (el) el.innerHTML = 'Get your key at <a href="' + info.url + '" target="_blank" style="color:var(--gold)">' + info.url.replace('https://', '') + '</a>';
}

async function loadApiKeyStatus() {
  const s = await fetch('/api/settings').then(r => r.json()).catch(() => ({}));
  const statusEl = document.getElementById('settings-api-key-status');
  const inputEl = document.getElementById('settings-api-key');
  const providerSel = document.getElementById('settings-ai-provider');
  const hasKey = s.ai_api_key || s.anthropic_api_key;
  if (hasKey) {
    const key = s.ai_api_key || s.anthropic_api_key;
    inputEl.placeholder = '••••••••' + key.slice(-4);
    statusEl.textContent = 'API key saved ✓';
    statusEl.style.color = 'var(--pos)';
  } else {
    statusEl.textContent = 'No API key saved';
    statusEl.style.color = '';
    inputEl.placeholder = 'Paste your API key…';
  }
  if (s.ai_provider && providerSel) providerSel.value = s.ai_provider;
  updateProviderLink('settings-ai-provider', 'settings-provider-link');
}

document.getElementById('settings-ai-provider')?.addEventListener('change', () => {
  updateProviderLink('settings-ai-provider', 'settings-provider-link');
});

async function loadIncomeSources() {
  const sources = await fetch('/api/income-sources').then(r => r.json());
  const list = document.getElementById('income-sources-list');
  if (!sources.length) {
    list.innerHTML = '<p style="color:var(--muted);font-size:13px;padding:4px 0;">No income sources defined yet. Add one below.</p>';
    return;
  }
  list.innerHTML =
    '<table style="width:100%;border-collapse:collapse;">' +
    '<thead><tr>' +
    '<th style="text-align:left;padding:8px 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);border-bottom:1px solid var(--border);">Name</th>' +
    '<th style="text-align:left;padding:8px 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);border-bottom:1px solid var(--border);">Keywords</th>' +
    '<th style="text-align:left;padding:8px 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);border-bottom:1px solid var(--border);">Category</th>' +
    '<th style="border-bottom:1px solid var(--border);"></th>' +
    '</tr></thead><tbody>' +
    sources.map(s =>
      '<tr>' +
      '<td style="padding:10px 12px;font-size:13px;font-weight:500;">' + esc(s.name) + '</td>' +
      '<td class="mono" style="padding:10px 12px;font-size:12px;color:var(--muted);">' + esc(s.keywords) + '</td>' +
      '<td style="padding:10px 12px;"><span class="td-cat">' + esc(s.category) + '</span></td>' +
      '<td style="padding:10px 12px;text-align:right;"><button class="btn btn-danger btn-sm" onclick="deleteIncomeSource(' + s.id + ')">Remove</button></td>' +
      '</tr>'
    ).join('') +
    '</tbody></table>';
}

document.getElementById('btn-add-income-source').addEventListener('click', async () => {
  const name = document.getElementById('is-name').value.trim();
  const keywords = document.getElementById('is-keywords').value.trim();
  const category = document.getElementById('is-category').value;
  if (!name || !keywords) { alert('Please enter a name and at least one keyword.'); return; }
  await fetch('/api/income-sources', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, keywords, category })
  });
  document.getElementById('is-name').value = '';
  document.getElementById('is-keywords').value = '';
  await loadIncomeSources();
});

async function deleteIncomeSource(id) {
  if (!confirm('Remove this income source?')) return;
  await fetch('/api/income-sources/' + id, { method: 'DELETE' });
  await loadIncomeSources();
}

async function loadSavingsDestinations() {
  const dests = await fetch('/api/savings-destinations').then(r => r.json());
  const list = document.getElementById('savings-destinations-list');
  if (!dests.length) {
    list.innerHTML = '<p style="color:var(--muted);font-size:13px;padding:4px 0;">No savings destinations defined yet. Add one below.</p>';
    return;
  }
  list.innerHTML =
    '<table style="width:100%;border-collapse:collapse;">' +
    '<thead><tr>' +
    '<th style="text-align:left;padding:8px 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);border-bottom:1px solid var(--border);">Name</th>' +
    '<th style="text-align:left;padding:8px 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);border-bottom:1px solid var(--border);">Keywords</th>' +
    '<th style="border-bottom:1px solid var(--border);"></th>' +
    '</tr></thead><tbody>' +
    dests.map(d =>
      '<tr>' +
      '<td style="padding:10px 12px;font-size:13px;font-weight:500;">' + esc(d.name) + '</td>' +
      '<td class="mono" style="padding:10px 12px;font-size:12px;color:var(--muted);">' + esc(d.keywords) + '</td>' +
      '<td style="padding:10px 12px;text-align:right;"><button class="btn btn-danger btn-sm" onclick="deleteSavingsDest(' + d.id + ')">Remove</button></td>' +
      '</tr>'
    ).join('') +
    '</tbody></table>';
}

document.getElementById('btn-add-savings-dest').addEventListener('click', async () => {
  const name = document.getElementById('sd-name').value.trim();
  const keywords = document.getElementById('sd-keywords').value.trim();
  if (!name || !keywords) { alert('Please enter a name and at least one keyword.'); return; }
  await fetch('/api/savings-destinations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, keywords })
  });
  document.getElementById('sd-name').value = '';
  document.getElementById('sd-keywords').value = '';
  await loadSavingsDestinations();
});

async function deleteSavingsDest(id) {
  if (!confirm('Remove this savings destination?')) return;
  await fetch('/api/savings-destinations/' + id, { method: 'DELETE' });
  await loadSavingsDestinations();
}

document.getElementById('btn-save-api-key').addEventListener('click', async () => {
  const key = document.getElementById('settings-api-key').value.trim();
  const provider = document.getElementById('settings-ai-provider').value;
  if (!key) return;
  await Promise.all([
    fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'ai_api_key', value: key }) }),
    fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'ai_provider', value: provider }) })
  ]);
  document.getElementById('settings-api-key').value = '';
  document.getElementById('settings-api-key').placeholder = '••••••••' + key.slice(-4);
  const statusEl = document.getElementById('settings-api-key-status');
  statusEl.textContent = 'API key saved ✓';
  statusEl.style.color = 'var(--pos)';
});

document.getElementById('btn-apply-income-rules').addEventListener('click', async () => {
  const btn = document.getElementById('btn-apply-income-rules');
  const status = document.getElementById('apply-rules-status');
  btn.disabled = true;
  status.textContent = 'Scanning…';
  const result = await fetch('/api/transactions/apply-income-rules', { method: 'POST' }).then(r => r.json());
  status.textContent = result.updated + ' transaction' + (result.updated !== 1 ? 's' : '') + ' updated';
  btn.disabled = false;
});

// ─── Connect AI Modal ─────────────────────────────────────────────────────────
function openConnectAiModal(title, desc) {
  const modal = document.getElementById('ai-connect-modal');
  if (title) document.getElementById('ai-connect-modal-title').textContent = title;
  if (desc) document.getElementById('ai-connect-modal-desc').textContent = desc;
  document.getElementById('modal-api-key').value = '';
  document.getElementById('modal-api-key-error').style.display = 'none';
  updateProviderLink('modal-ai-provider', 'modal-provider-link');
  modal.classList.add('open');
}

document.getElementById('modal-ai-provider').addEventListener('change', () => {
  updateProviderLink('modal-ai-provider', 'modal-provider-link');
});

document.getElementById('ai-connect-modal-close').addEventListener('click', () => {
  document.getElementById('ai-connect-modal').classList.remove('open');
});
document.getElementById('ai-connect-modal-skip').addEventListener('click', () => {
  document.getElementById('ai-connect-modal').classList.remove('open');
});

document.getElementById('btn-modal-save-ai-key').addEventListener('click', async () => {
  const key = document.getElementById('modal-api-key').value.trim();
  const provider = document.getElementById('modal-ai-provider').value;
  const errEl = document.getElementById('modal-api-key-error');
  if (!key) { errEl.textContent = 'Please paste your API key.'; errEl.style.display = ''; return; }
  errEl.style.display = 'none';
  await Promise.all([
    fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'ai_api_key', value: key }) }),
    fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'ai_provider', value: provider }) })
  ]);
  document.getElementById('ai-connect-modal').classList.remove('open');
  document.getElementById('api-warning').style.display = 'none';
  // refresh settings UI if currently on settings view
  if (state.currentView === 'settings') loadApiKeyStatus();
});

document.getElementById('btn-api-warning-connect').addEventListener('click', () => {
  openConnectAiModal('Connect AI for Import', 'Statement parsing uses AI to extract transactions from your PDF or CSV. Add your API key to enable this feature.');
});

async function checkApiKeyOnInit() {
  const s = await fetch('/api/settings').then(r => r.json()).catch(() => ({}));
  if (!s.ai_api_key && !s.anthropic_api_key && !s.ai_provider) {
    openConnectAiModal('Welcome to FinBase', 'FinBase uses AI to parse bank statements, generate spending insights, and suggest goal strategies. Connect your preferred AI provider to unlock these features — or skip and add it later in Settings.');
  }
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
const MOON_SVG = '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75 9.75 9.75 0 018.25 6c0-1.33.267-2.597.748-3.752A9.75 9.75 0 1021.752 15z"/>';
const SUN_SVG  = '<circle cx="12" cy="12" r="4"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (theme === 'light') {
    icon.innerHTML = SUN_SVG;
    label.textContent = 'Dark';
  } else {
    icon.innerHTML = MOON_SVG;
    label.textContent = 'Light';
  }
  localStorage.setItem('finbase-theme', theme);
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.documentElement.dataset.theme || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
  if (state.currentView === 'dashboard') loadDashboard();
});

// ─── Sankey tooltip ───────────────────────────────────────────────────────────
(function() {
  const container = document.getElementById('sankey-container');
  const tooltip = document.getElementById('sankey-tooltip');
  if (!container || !tooltip) return;
  container.addEventListener('mousemove', function(e) {
    const tip = e.target && e.target.dataset && e.target.dataset.tip ? e.target.dataset.tip : null;
    if (tip) {
      const r = container.getBoundingClientRect();
      tooltip.style.display = 'block';
      tooltip.style.left = (e.clientX - r.left + 12) + 'px';
      tooltip.style.top = (e.clientY - r.top - 10) + 'px';
      tooltip.textContent = tip;
    } else {
      tooltip.style.display = 'none';
    }
  });
  container.addEventListener('mouseleave', function() {
    tooltip.style.display = 'none';
  });
})();

// ─── Chart Expand ─────────────────────────────────────────────────────────────
function openChartExpand(key) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('view-chart-expand');
  el.classList.add('active');
  el.style.animation = 'none'; el.offsetHeight; el.style.animation = '';
  state.expandedChart = key;
  state.currentView = 'chart-expand';
  renderExpandedChart(key);
}

document.getElementById('expand-back').addEventListener('click', () => {
  destroyChart('expand');
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  document.getElementById('view-dashboard').classList.add('active');
  document.querySelector('[data-view="dashboard"]').classList.add('active');
  state.currentView = 'dashboard';
  state.expandedChart = null;
  if (state.chartsData) {
    const trend = [...state.chartsData.trend].reverse();
    drawTrendChart(trend);
    drawNetFlowChart(trend);
    drawDonutChart(state.chartsData.categoryBreakdown || []);
    drawMerchantsChart(state.chartsData.topMerchants || []);
    drawDailyChart(state.chartsData.dailySpend || []);
    drawSankey(state.flowData || {});
  }
});

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-chart-expand]');
  if (btn) openChartExpand(btn.dataset.chartExpand);
});

function renderExpandedChart(key) {
  const titles = { trend: 'Monthly Trend', netflow: 'Net Flow', donut: 'Spending by Category', merchants: 'Top Merchants', sankey: 'Money Flow', daily: 'Daily Spending' };
  document.getElementById('expand-title').textContent = titles[key] || '';
  document.getElementById('expand-period-label').textContent = state.dashMonth || 'All Time';

  const canvasWrap = document.getElementById('expand-chart-wrap');
  const sankeyWrap = document.getElementById('expand-sankey-wrap');
  const donutLegend = document.getElementById('expand-donut-legend');

  destroyChart('expand');
  canvasWrap.innerHTML = '<canvas id="expand-canvas"></canvas>';

  if (key === 'sankey') {
    canvasWrap.style.display = 'none';
    sankeyWrap.style.display = '';
    donutLegend.style.display = 'none';
    setTimeout(() => drawSankey(state.flowData || {}, 'expand-sankey-svg', 'expand-sankey-empty'), 50);
  } else {
    canvasWrap.style.display = '';
    sankeyWrap.style.display = 'none';
    if (key === 'donut') {
      donutLegend.style.display = 'flex';
      drawExpandDonut();
    } else {
      donutLegend.style.display = 'none';
      if (key === 'trend')     drawExpandTrend();
      if (key === 'netflow')   drawExpandNetflow();
      if (key === 'merchants') drawExpandMerchants();
      if (key === 'daily')     drawExpandDaily();
    }
  }
  renderExpandInsights(key);
}

function drawExpandTrend() {
  const canvas = document.getElementById('expand-canvas');
  if (!canvas || !state.chartsData) return;
  const t = chartTheme();
  const data = [...state.chartsData.trend].reverse();
  state.charts['expand'] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.map(d => d.month),
      datasets: [
        { label: 'Income',   data: data.map(d => d.income || 0),   backgroundColor: t.pos + 'C0', borderRadius: 4, borderSkipped: false },
        { label: 'Expenses', data: data.map(d => d.expenses || 0), backgroundColor: t.neg + 'C0', borderRadius: 4, borderSkipped: false },
        { label: 'Savings',  data: data.map(d => d.savings || 0),  backgroundColor: t.gold + 'C0', borderRadius: 4, borderSkipped: false },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: t.text, font: { family: 'DM Sans,Inter,sans-serif', size: 12 } } },
        tooltip: { callbacks: { label: ctx => ' $' + ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } }
      },
      scales: {
        x: { ticks: { color: t.muted, font: { size: 11 } }, grid: { color: t.grid } },
        y: { ticks: { color: t.muted, font: { size: 11 }, callback: v => '$' + (v/1000).toFixed(0) + 'k' }, grid: { color: t.grid } }
      }
    }
  });
}

function drawExpandNetflow() {
  const canvas = document.getElementById('expand-canvas');
  if (!canvas || !state.chartsData) return;
  const t = chartTheme();
  const data = [...state.chartsData.trend].reverse();
  const nets = data.map(d => (d.income || 0) - (d.expenses || 0));
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 420);
  grad.addColorStop(0, t.gold + '55'); grad.addColorStop(1, t.gold + '00');
  state.charts['expand'] = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map(d => d.month),
      datasets: [{ label: 'Net Flow', data: nets, borderColor: t.gold, backgroundColor: grad, borderWidth: 2, pointRadius: 4, pointBackgroundColor: t.gold, fill: true, tension: 0.35 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ' $' + ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } }
      },
      scales: {
        x: { ticks: { color: t.muted, font: { size: 11 } }, grid: { color: t.grid } },
        y: { ticks: { color: t.muted, font: { size: 11 }, callback: v => '$' + (v/1000).toFixed(0) + 'k' }, grid: { color: t.grid } }
      }
    }
  });
}

function drawExpandDonut() {
  const canvas = document.getElementById('expand-canvas');
  if (!canvas || !state.chartsData) return;
  const t = chartTheme();
  const data = state.chartsData.categoryBreakdown || [];
  const colors = state.chartColors.slice(0, data.length);
  state.charts['expand'] = new Chart(canvas, {
    type: 'doughnut',
    data: { labels: data.map(d => d.category), datasets: [{ data: data.map(d => d.total), backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }] },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '62%',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ' $' + ctx.parsed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } }
      }
    }
  });
  const legend = document.getElementById('expand-donut-legend');
  if (legend) legend.innerHTML = data.map((d, i) =>
    '<div class="donut-legend-item"><div class="donut-legend-dot" style="background:' + colors[i] + '"></div>' + esc(d.category) + '</div>'
  ).join('');
}

function drawExpandMerchants() {
  const canvas = document.getElementById('expand-canvas');
  if (!canvas || !state.chartsData) return;
  const t = chartTheme();
  const data = [...(state.chartsData.topMerchants || [])].reverse();
  state.charts['expand'] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.map(d => d.merchant),
      datasets: [{ label: 'Total Spent', data: data.map(d => d.total), backgroundColor: t.neg + 'C0', borderRadius: 4, borderSkipped: false }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ' $' + ctx.parsed.x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } }
      },
      scales: {
        x: { ticks: { color: t.muted, font: { size: 11 }, callback: v => '$' + v.toLocaleString() }, grid: { color: t.grid } },
        y: { ticks: { color: t.text, font: { size: 11 } }, grid: { display: false } }
      }
    }
  });
}

function drawExpandDaily() {
  const canvas = document.getElementById('expand-canvas');
  if (!canvas || !state.chartsData) return;
  const t = chartTheme();
  const data = state.chartsData.dailySpend || [];
  state.charts['expand'] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.map(d => d.date),
      datasets: [{ label: 'Spent', data: data.map(d => d.spent), backgroundColor: t.neg + 'C0', borderRadius: 3, borderSkipped: false }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ' $' + ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } }
      },
      scales: {
        x: { ticks: { color: t.muted, font: { size: 10 }, maxRotation: 45 }, grid: { display: false } },
        y: { ticks: { color: t.muted, font: { size: 11 }, callback: v => '$' + v.toLocaleString() }, grid: { color: t.grid } }
      }
    }
  });
}

function renderExpandInsights(key) {
  const el = document.getElementById('expand-insights');
  if (!el || !state.chartsData) return;
  const cd = state.chartsData;
  const fd = state.flowData || {};
  const t = chartTheme();

  function statCards(items) {
    return '<div class="stat-grid" style="margin-bottom:16px;">' +
      items.map(s => '<div class="stat-card"><div class="stat-label">' + s.label + '</div><div class="stat-value mono" style="font-size:18px;' + (s.color ? 'color:' + s.color : '') + '">' + s.value + '</div></div>').join('') +
    '</div>';
  }
  function table(headers, rows) {
    return '<div class="card" style="padding:0;overflow:hidden"><div class="table-wrap"><table style="width:100%">' +
      '<thead><tr>' + headers.map(h => '<th' + (h.right ? ' class="right"' : '') + '>' + h.label + '</th>').join('') + '</tr></thead>' +
      '<tbody>' + rows.map(r => '<tr>' + r.map((c, i) => '<td' + (headers[i]?.right ? ' class="right mono"' : '') + ' style="font-size:12px;">' + c + '</td>').join('') + '</tr>').join('') + '</tbody>' +
    '</table></div></div>';
  }

  if (key === 'trend') {
    const all = [...cd.trend].reverse();
    const totalInc = all.reduce((s, d) => s + (d.income || 0), 0);
    const totalExp = all.reduce((s, d) => s + (d.expenses || 0), 0);
    const totalSav = all.reduce((s, d) => s + (d.savings || 0), 0);
    const avgRate = totalInc > 0 ? (totalSav / totalInc * 100).toFixed(1) : '0.0';
    el.innerHTML = statCards([
      { label: 'Total Income', value: fmtDollars(totalInc), color: 'var(--pos)' },
      { label: 'Total Expenses', value: fmtDollars(totalExp), color: 'var(--neg)' },
      { label: 'Total Savings', value: fmtDollars(totalSav), color: 'var(--gold)' },
      { label: 'Avg Savings Rate', value: avgRate + '%', color: 'var(--gold)' },
    ]) + table(
      [{ label: 'Month' }, { label: 'Income', right: true }, { label: 'Expenses', right: true }, { label: 'Savings', right: true }, { label: 'Net Flow', right: true }, { label: 'Savings Rate', right: true }],
      all.map(d => {
        const net = (d.income || 0) - (d.expenses || 0);
        const rate = d.income > 0 ? (((d.savings || 0) / d.income) * 100).toFixed(1) + '%' : '—';
        return [d.month, fmtDollars(d.income || 0), fmtDollars(d.expenses || 0), fmtDollars(d.savings || 0),
          '<span style="color:' + (net >= 0 ? 'var(--pos)' : 'var(--neg)') + '">' + (net >= 0 ? '+' : '') + fmtDollars(net) + '</span>', rate];
      })
    );

  } else if (key === 'netflow') {
    const all = [...cd.trend].reverse();
    const nets = all.map(d => (d.income || 0) - (d.expenses || 0));
    const avg = nets.length ? nets.reduce((a, b) => a + b, 0) / nets.length : 0;
    const best = nets.reduce((a, b) => a > b ? a : b, -Infinity);
    const worst = nets.reduce((a, b) => a < b ? a : b, Infinity);
    const bestMonth = all[nets.indexOf(best)]?.month || '—';
    const worstMonth = all[nets.indexOf(worst)]?.month || '—';
    const positiveCount = nets.filter(n => n > 0).length;
    el.innerHTML = statCards([
      { label: 'Avg Monthly Net', value: (avg >= 0 ? '+' : '') + fmtDollars(avg), color: avg >= 0 ? 'var(--pos)' : 'var(--neg)' },
      { label: 'Best Month', value: bestMonth, color: 'var(--pos)' },
      { label: 'Worst Month', value: worstMonth, color: 'var(--neg)' },
      { label: 'Positive Months', value: positiveCount + ' / ' + nets.length },
    ]) + table(
      [{ label: 'Month' }, { label: 'Income', right: true }, { label: 'Expenses', right: true }, { label: 'Net Flow', right: true }],
      all.map((d, i) => {
        const net = nets[i];
        return [d.month, fmtDollars(d.income || 0), fmtDollars(d.expenses || 0),
          '<span style="color:' + (net >= 0 ? 'var(--pos)' : 'var(--neg)') + '">' + (net >= 0 ? '+' : '') + fmtDollars(net) + '</span>'];
      })
    );

  } else if (key === 'donut') {
    const cats = cd.categoryBreakdown || [];
    const total = cats.reduce((s, c) => s + c.total, 0);
    const topCat = cats[0];
    el.innerHTML = statCards([
      { label: 'Total Spending', value: fmtDollars(total), color: 'var(--neg)' },
      { label: 'Categories', value: cats.length + '' },
      { label: 'Largest Category', value: topCat ? topCat.category : '—' },
      { label: 'Largest Amount', value: topCat ? fmtDollars(topCat.total) : '—', color: 'var(--neg)' },
    ]) + table(
      [{ label: '#' }, { label: 'Category' }, { label: 'Amount', right: true }, { label: '% of Total', right: true }, { label: 'Transactions', right: true }],
      cats.map((c, i) => [
        '<span style="color:var(--muted)">' + (i + 1) + '</span>',
        c.category,
        fmtDollars(c.total),
        (total > 0 ? (c.total / total * 100).toFixed(1) : '0.0') + '%',
        c.count
      ])
    );

  } else if (key === 'merchants') {
    const merchants = cd.topMerchants || [];
    const total = merchants.reduce((s, m) => s + m.total, 0);
    el.innerHTML = statCards([
      { label: 'Top Merchants Total', value: fmtDollars(total), color: 'var(--neg)' },
      { label: 'Merchants Shown', value: merchants.length + '' },
      { label: 'Most Visits', value: (merchants.slice().sort((a,b) => b.count - a.count)[0]?.merchant || '—') },
      { label: 'Highest Avg Tx', value: fmtDollars(merchants.reduce((top, m) => (m.total/m.count > top.v) ? { v: m.total/m.count, name: m.merchant } : top, { v: 0, name: '—' }).v) },
    ]) + table(
      [{ label: '#' }, { label: 'Merchant' }, { label: 'Total', right: true }, { label: 'Visits', right: true }, { label: 'Avg / tx', right: true }],
      merchants.map((m, i) => [
        '<span style="color:var(--muted)">' + (i + 1) + '</span>',
        esc(m.merchant),
        fmtDollars(m.total),
        m.count,
        fmtDollars(m.total / m.count)
      ])
    );

  } else if (key === 'sankey') {
    const incTotal = (fd.incomeSources || []).reduce((s, c) => s + c.total, 0);
    const expTotal = (fd.expenseCategories || []).reduce((s, c) => s + c.total, 0);
    const incRows = (fd.incomeSources || []).map(c => [esc(c.category), fmtDollars(c.total), (incTotal > 0 ? (c.total/incTotal*100).toFixed(1) : '0.0') + '%']);
    const expRows = (fd.expenseCategories || []).map(c => [esc(c.category), fmtDollars(c.total), (expTotal > 0 ? (c.total/expTotal*100).toFixed(1) : '0.0') + '%']);
    el.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">' +
      '<div>' +
        '<div class="section-title" style="margin-bottom:10px">Income Sources</div>' +
        table([{ label: 'Category' }, { label: 'Amount', right: true }, { label: '%', right: true }], incRows) +
      '</div>' +
      '<div>' +
        '<div class="section-title" style="margin-bottom:10px">Expense Breakdown</div>' +
        table([{ label: 'Category' }, { label: 'Amount', right: true }, { label: '%', right: true }], expRows) +
      '</div>' +
    '</div>';

  } else if (key === 'daily') {
    const days = cd.dailySpend || [];
    const total = days.reduce((s, d) => s + d.spent, 0);
    const avg = days.length ? total / days.length : 0;
    const peak = days.reduce((top, d) => d.spent > top.spent ? d : top, { spent: 0, date: '—' });
    const dowTotals = [0,0,0,0,0,0,0]; const dowCounts = [0,0,0,0,0,0,0];
    days.forEach(d => { const dow = new Date(d.date + 'T12:00:00').getDay(); dowTotals[dow] += d.spent; dowCounts[dow]++; });
    const dowNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    el.innerHTML = statCards([
      { label: 'Period Total', value: fmtDollars(total), color: 'var(--neg)' },
      { label: 'Daily Average', value: fmtDollars(avg), color: 'var(--neg)' },
      { label: 'Peak Day', value: peak.date },
      { label: 'Peak Amount', value: fmtDollars(peak.spent), color: 'var(--neg)' },
    ]) + '<div class="section-title" style="margin:16px 0 10px">Avg Spending by Day of Week</div>' +
    table(
      [{ label: 'Day' }, { label: 'Avg Spend', right: true }, { label: 'Days Tracked', right: true }],
      dowNames.map((name, i) => [name, dowCounts[i] ? fmtDollars(dowTotals[i] / dowCounts[i]) : '—', dowCounts[i] + ''])
    );
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {
  applyTheme(localStorage.getItem('finbase-theme') || 'dark');
  await initFilters();
  await loadDashboard();
  await checkBucketsOnboarding();
  await checkApiKeyOnInit();
}

init().catch(console.error);
      `}} />
    </>
  );
}
