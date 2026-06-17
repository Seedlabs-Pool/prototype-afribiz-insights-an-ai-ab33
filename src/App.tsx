import React, { useState, useMemo } from 'react';

type Role = 'Corporate Strategist' | 'Fund Analyst' | 'Development Agency' | 'Business Educator';

type Briefing = {
  id: number;
  title: string;
  discipline: string;
  summary: string;
  takeaways: string[];
  citation: string;
  region: string;
  roles: Role[];
  trend: number;
};

const palette = {
  bg: '#0d1b2a',
  panel: '#13283d',
  card: '#ffffff',
  ink: '#0d1b2a',
  sub: '#3c5066',
  accent: '#e8772e',
  accent2: '#1b9e77',
  line: '#e2e8f0',
  soft: '#f4f7fb',
};

const roles: Role[] = ['Corporate Strategist', 'Fund Analyst', 'Development Agency', 'Business Educator'];

const briefings: Briefing[] = [
  {
    id: 1,
    title: 'Mobile money penetration is reshaping SME credit access in East Africa',
    discipline: 'Business Finance & Investment',
    summary:
      'Synthesis of 14 AJBM studies finds that mobile-money transaction histories now serve as alternative credit data, cutting SME loan approval times by up to 60% across Kenya, Tanzania and Uganda.',
    takeaways: [
      'Alternative credit scoring lowers default risk by 18% vs. traditional methods',
      'Fintech partnerships outperform standalone bank digitization',
      'Regulatory sandboxes accelerated adoption in 3 of 5 markets',
    ],
    citation: 'Afr. J. Bus. Manag., synthesis of 14 articles (2021–2024)',
    region: 'East Africa',
    roles: ['Fund Analyst', 'Development Agency', 'Corporate Strategist'],
    trend: 87,
  },
  {
    id: 2,
    title: 'Localized branding outperforms global templates in West African FMCG',
    discipline: 'Marketing',
    summary:
      'Cross-paper analysis shows brands adapting messaging to regional languages and community structures see 2.3x higher repurchase rates than those running standardized continental campaigns.',
    takeaways: [
      'Vernacular packaging lifts trial rates among first-time buyers',
      'Community influencers beat broadcast media on cost-per-conversion',
      'Trust signals matter more than price in informal retail channels',
    ],
    citation: 'Afr. J. Bus. Manag., synthesis of 9 articles (2022–2024)',
    region: 'West Africa',
    roles: ['Corporate Strategist', 'Business Educator'],
    trend: 72,
  },
  {
    id: 3,
    title: 'Governance reforms correlate with FDI resilience during commodity shocks',
    discipline: 'Public Policy',
    summary:
      'Meta-review links anti-corruption institutional reforms to a 31% smaller decline in foreign direct investment during the 2020–2023 commodity downturn across 11 economies.',
    takeaways: [
      'Predictable contract enforcement is the strongest single FDI driver',
      'Sovereign risk premiums fell fastest where reforms were independently audited',
      'Diversified economies absorbed shocks with less policy intervention',
    ],
    citation: 'Afr. J. Bus. Manag., synthesis of 12 articles (2020–2024)',
    region: 'Pan-African',
    roles: ['Development Agency', 'Fund Analyst'],
    trend: 79,
  },
  {
    id: 4,
    title: 'Hybrid work adoption lifts retention in African professional services',
    discipline: 'Organizational Behaviour',
    summary:
      'Distilled findings indicate firms offering structured hybrid models retained mid-career talent 26% longer, with the strongest effect in Lagos, Nairobi and Johannesburg hubs.',
    takeaways: [
      'Outcome-based management beat hours-based supervision on output',
      'Connectivity stipends materially reduced productivity variance',
      'Mentorship gaps emerged as the top hybrid-model risk',
    ],
    citation: 'Afr. J. Bus. Manag., synthesis of 7 articles (2022–2024)',
    region: 'Pan-African',
    roles: ['Corporate Strategist', 'Business Educator'],
    trend: 64,
  },
  {
    id: 5,
    title: 'Agritech platforms compress supply chains in Southern Africa',
    discipline: 'Operations',
    summary:
      'Combined evidence shows digital aggregation platforms removing 2–3 intermediary layers, raising smallholder margins 22% while improving traceability for export buyers.',
    takeaways: [
      'Cold-chain visibility was the highest-ROI digital investment',
      'Cooperative onboarding outpaced individual farmer onboarding',
      'Payment digitization reduced post-harvest leakage',
    ],
    citation: 'Afr. J. Bus. Manag., synthesis of 10 articles (2021–2024)',
    region: 'Southern Africa',
    roles: ['Development Agency', 'Corporate Strategist', 'Fund Analyst'],
    trend: 70,
  },
  {
    id: 6,
    title: 'Strategic alliances drive renewable scale-up across the Sahel',
    discipline: 'Strategic Management',
    summary:
      'Synthesis highlights public-private alliances as the dominant model for mini-grid expansion, with blended finance structures de-risking early deployment.',
    takeaways: [
      'Blended finance shortened payback periods by an average of 2.1 years',
      'Local maintenance ecosystems determined long-term viability',
      'Tariff design was the decisive policy lever for investor entry',
    ],
    citation: 'Afr. J. Bus. Manag., synthesis of 8 articles (2022–2024)',
    region: 'Sahel',
    roles: ['Fund Analyst', 'Development Agency'],
    trend: 68,
  },
];

const trendTopics = [
  { label: 'Mobile money & embedded finance', value: 92 },
  { label: 'Blended & climate finance', value: 81 },
  { label: 'Localized go-to-market', value: 74 },
  { label: 'Governance & FDI resilience', value: 71 },
  { label: 'Agritech supply chains', value: 66 },
  { label: 'Hybrid talent models', value: 58 },
];

const knowledgeAnswers: { q: string; a: string; cites: string[] }[] = [
  {
    q: 'What is driving SME credit access in East Africa?',
    a: 'Mobile-money transaction data is increasingly used as alternative credit scoring, cutting approval times by up to 60% and reducing default risk by ~18% versus traditional methods. Fintech-bank partnerships and regulatory sandboxes are the leading enablers.',
    cites: ['Briefing #1 — Business Finance & Investment', 'AJBM synthesis of 14 articles (2021–2024)'],
  },
  {
    q: 'How should FMCG brands enter West African markets?',
    a: 'Evidence favours localized branding over standardized continental campaigns: vernacular packaging, community influencers, and trust signals outperform price-led broadcast strategies, yielding up to 2.3x higher repurchase rates.',
    cites: ['Briefing #2 — Marketing', 'AJBM synthesis of 9 articles (2022–2024)'],
  },
  {
    q: 'What protects FDI during commodity shocks?',
    a: 'Independent, audited governance and anti-corruption reforms correlate with a 31% smaller FDI decline during downturns. Predictable contract enforcement is the single strongest FDI driver identified across the literature.',
    cites: ['Briefing #3 — Public Policy', 'AJBM synthesis of 12 articles (2020–2024)'],
  },
];

function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" role="img" aria-label="AfriBiz Insights logo">
      <circle cx="24" cy="24" r="22" fill="#13283d" />
      <path d="M24 8c8.8 0 16 7.2 16 16s-7.2 16-16 16S8 32.8 8 24" fill="none" stroke="#e8772e" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 30l5-9 5 5 7-12" fill="none" stroke="#1b9e77" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="14" r="2.5" fill="#e8772e" />
    </svg>
  );
}

function Icon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'digest':
      return (<svg {...common}><path d="M4 5h16M4 12h16M4 19h10" /></svg>);
    case 'trend':
      return (<svg {...common}><path d="M3 17l6-6 4 4 8-8" /><path d="M21 7v5h-5" /></svg>);
    case 'search':
      return (<svg {...common}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>);
    case 'globe':
      return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" /></svg>);
    default:
      return null;
  }
}

export default function App() {
  const [activeRole, setActiveRole] = useState<Role>('Corporate Strategist');
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<{ a: string; cites: string[] } | null>(null);
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = useMemo(
    () => briefings.filter((b) => b.roles.includes(activeRole)),
    [activeRole]
  );

  function runSearch(q: string) {
    setQuery(q);
    if (!q.trim()) {
      setAnswer(null);
      return;
    }
    const lower = q.toLowerCase();
    const match =
      knowledgeAnswers.find((k) =>
        k.q.toLowerCase().split(' ').some((w) => w.length > 3 && lower.includes(w))
      ) || knowledgeAnswers[0];
    setAnswer({ a: match.a, cites: match.cites });
  }

  function toggleSave(id: number) {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color: palette.ink, background: palette.soft, minHeight: '100vh' }}>
      <style>{`* { box-sizing: border-box; } body { margin: 0; } button { font-family: inherit; cursor: pointer; }`}</style>

      {/* Header */}
      <header style={{ background: palette.bg, color: '#fff', padding: '16px 20px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Logo />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>AfriBiz Insights</div>
              <div style={{ fontSize: 13, color: '#9fb4cc' }}>AI research intelligence for African markets</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 18, fontSize: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#briefings" style={{ color: '#cdd9e6', textDecoration: 'none' }}>Briefings</a>
            <a href="#trends" style={{ color: '#cdd9e6', textDecoration: 'none' }}>Trends</a>
            <a href="#knowledge" style={{ color: '#cdd9e6', textDecoration: 'none' }}>Knowledge Base</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(160deg, ${palette.bg} 0%, ${palette.panel} 100%)`, color: '#fff', padding: '56px 20px 64px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(232,119,46,0.18)', color: '#f4a96e', fontSize: 13, fontWeight: 600, padding: '6px 12px', borderRadius: 999, marginBottom: 18 }}>
              Built on open-access African Journal of Business Management
            </div>
            <h1 style={{ fontSize: 38, lineHeight: 1.12, margin: '0 0 16px', fontWeight: 800, letterSpacing: -0.8 }}>
              Turn a flood of African business research into decisions you can act on.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: '#cdd9e6', margin: '0 0 28px', maxWidth: 520 }}>
              AfriBiz Insights distills high-cadence, open-access scholarship into concise, role-specific briefings, live trend dashboards, and citation-backed answers — so your team stops reading and starts deciding.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a
                data-cta="hero-start-briefing"
                href="#briefings"
                style={{ background: palette.accent, color: '#fff', fontWeight: 700, fontSize: 16, padding: '14px 26px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 8px 24px rgba(232,119,46,0.35)' }}
              >
                Build my briefing
              </a>
              <a href="#trends" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontWeight: 600, fontSize: 16, padding: '14px 26px', borderRadius: 12, textDecoration: 'none' }}>
                View trends
              </a>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: 22 }}>
            <div style={{ fontSize: 13, color: '#9fb4cc', marginBottom: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6 }}>This week, synthesized</div>
            {[
              { n: '24', l: 'new articles ingested' },
              { n: '6', l: 'cross-paper briefings published' },
              { n: '8', l: 'business disciplines covered' },
              { n: '11', l: 'African economies tracked' },
            ].map((s) => (
              <div key={s.l} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: palette.accent, minWidth: 44 }}>{s.n}</span>
                <span style={{ fontSize: 15, color: '#dce6f0' }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${palette.line}`, padding: '18px 20px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: palette.sub, fontWeight: 600 }}>Designed for teams at</span>
          {['McKinsey & Company', 'Boston Consulting Group', 'African Development Bank', 'Standard Bank Group', 'Ecobank'].map((c) => (
            <span key={c} style={{ fontSize: 14, fontWeight: 700, color: palette.ink, opacity: 0.78 }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 20px 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {[
            { icon: 'digest', t: 'Role-specific digests', d: 'Briefings tailored to strategists, analysts, agencies and educators — never generic.' },
            { icon: 'trend', t: 'Emerging-concern dashboards', d: 'Track which African business themes are accelerating across the literature.' },
            { icon: 'search', t: 'Citation-backed answers', d: 'Ask a question, get a synthesized answer with the source articles attached.' },
            { icon: 'globe', t: 'Localized translation', d: 'Distill and translate insights to reach teams across the continent.' },
          ].map((f) => (
            <div key={f.t} style={{ background: palette.card, border: `1px solid ${palette.line}`, borderRadius: 16, padding: 22 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: palette.soft, color: palette.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Icon name={f.icon} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{f.t}</div>
              <div style={{ fontSize: 14.5, color: palette.sub, lineHeight: 1.5 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Briefings */}
      <section id="briefings" style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 20px' }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 6px' }}>Your role-specific briefings</h2>
        <p style={{ fontSize: 15.5, color: palette.sub, margin: '0 0 20px' }}>Pick a role to see the synthesis curated for that workflow.</p>
        <div role="tablist" aria-label="Select role" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          {roles.map((r) => {
            const active = r === activeRole;
            return (
              <button
                key={r}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveRole(r)}
                style={{
                  border: `1px solid ${active ? palette.accent : palette.line}`,
                  background: active ? palette.accent : '#fff',
                  color: active ? '#fff' : palette.ink,
                  fontWeight: 600,
                  fontSize: 14.5,
                  padding: '10px 16px',
                  borderRadius: 999,
                }}
              >
                {r}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {filtered.map((b) => (
            <article key={b.id} style={{ background: palette.card, border: `1px solid ${palette.line}`, borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: palette.accent2, background: '#e6f4ef', padding: '4px 10px', borderRadius: 8 }}>{b.discipline}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: palette.sub }}>{b.region}</span>
              </div>
              <h3 style={{ fontSize: 17.5, lineHeight: 1.3, margin: '0 0 10px', fontWeight: 700 }}>{b.title}</h3>
              <p style={{ fontSize: 14.5, color: palette.sub, lineHeight: 1.55, margin: '0 0 14px' }}>{b.summary}</p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 0, listStyle: 'none' }}>
                {b.takeaways.map((t) => (
                  <li key={t} style={{ display: 'flex', gap: 8, fontSize: 14, color: palette.ink, marginBottom: 8, alignItems: 'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}><path d="M5 13l4 4L19 7" /></svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto' }}>
                <div style={{ height: 6, background: palette.soft, borderRadius: 999, overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ width: `${b.trend}%`, height: '100%', background: palette.accent }} />
                </div>
                <div style={{ fontSize: 12.5, color: palette.sub, marginBottom: 14 }}>Momentum across the literature: {b.trend}%</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: palette.sub, fontStyle: 'italic' }}>{b.citation}</span>
                  <button
                    onClick={() => toggleSave(b.id)}
                    style={{ border: `1px solid ${palette.line}`, background: saved.includes(b.id) ? palette.bg : '#fff', color: saved.includes(b.id) ? '#fff' : palette.ink, fontWeight: 600, fontSize: 13, padding: '8px 14px', borderRadius: 10 }}
                  >
                    {saved.includes(b.id) ? 'Saved' : 'Save to workspace'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trends */}
      <section id="trends" style={{ background: '#fff', borderTop: `1px solid ${palette.line}`, borderBottom: `1px solid ${palette.line}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 20px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 6px' }}>Emerging African business concerns</h2>
          <p style={{ fontSize: 15.5, color: palette.sub, margin: '0 0 24px' }}>Relative attention each theme is receiving across recent AJBM publications.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {trendTopics.map((t) => (
              <div key={t.label} style={{ background: palette.soft, borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14.5, fontWeight: 600 }}>
                  <span>{t.label}</span>
                  <span style={{ color: palette.accent }}>{t.value}</span>
                </div>
                <div style={{ height: 10, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${t.value}%`, height: '100%', background: `linear-gradient(90deg, ${palette.accent2}, ${palette.accent})` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge base */}
      <section id="knowledge" style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 20px' }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 6px' }}>Ask the knowledge base</h2>
        <p style={{ fontSize: 15.5, color: palette.sub, margin: '0 0 20px' }}>Every answer is synthesized from indexed open-access research and returns its sources.</p>

        <div style={{ background: palette.card, border: `1px solid ${palette.line}`, borderRadius: 16, padding: 22 }}>
          <label htmlFor="kb-input" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Your question</label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              id="kb-input"
              value={query}
              onChange={(e) => runSearch(e.target.value)}
              placeholder="e.g. What is driving SME credit access in East Africa?"
              style={{ flex: '1 1 260px', minWidth: 0, fontSize: 15, padding: '12px 14px', borderRadius: 10, border: `1px solid ${palette.line}`, outline: 'none' }}
            />
            <button
              onClick={() => runSearch(query || knowledgeAnswers[0].q)}
              style={{ background: palette.bg, color: '#fff', fontWeight: 700, fontSize: 15, padding: '12px 22px', borderRadius: 10, border: 'none' }}
            >
              Search
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
            {knowledgeAnswers.map((k) => (
              <button key={k.q} onClick={() => runSearch(k.q)} style={{ background: palette.soft, border: `1px solid ${palette.line}`, color: palette.sub, fontSize: 13, padding: '7px 12px', borderRadius: 999 }}>
                {k.q}
              </button>
            ))}
          </div>

          {answer && (
            <div style={{ marginTop: 20, background: palette.soft, borderRadius: 12, padding: 18, borderLeft: `4px solid ${palette.accent}` }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: palette.accent, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>Synthesized answer</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: '0 0 14px' }}>{answer.a}</p>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.sub, marginBottom: 6 }}>Sources</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {answer.cites.map((c) => (
                  <span key={c} style={{ background: '#fff', border: `1px solid ${palette.line}`, fontSize: 12.5, padding: '6px 11px', borderRadius: 8, color: palette.ink }}>{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA band */}
      <section style={{ background: `linear-gradient(160deg, ${palette.panel}, ${palette.bg})`, color: '#fff', padding: '52px 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px' }}>Give your African market team an unfair information edge.</h2>
          <p style={{ fontSize: 16.5, color: '#cdd9e6', lineHeight: 1.55, margin: '0 0 26px' }}>
            Pilot AfriBiz Insights with your strategy, investment or development teams. We curate, synthesize and integrate — you decide faster.
          </p>
          <a
            data-cta="footer-request-pilot"
            href="#briefings"
            style={{ display: 'inline-block', background: palette.accent, color: '#fff', fontWeight: 700, fontSize: 16, padding: '15px 30px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 8px 24px rgba(232,119,46,0.35)' }}
          >
            Request a team pilot
          </a>
        </div>
      </section>

      <footer style={{ background: palette.bg, color: '#9fb4cc', padding: '24px 20px', textAlign: 'center', fontSize: 13.5 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          AfriBiz Insights — curation, analytics & workflow integration over open-access research. Source content remains free and open access.
        </div>
      </footer>
    </div>
  );
}
