import { Link } from 'react-router-dom'
import { ALGORITHMS, ALGORITHM_ORDER } from '../data/algorithms'

const display = { fontFamily: 'var(--ff-display)' }
const mono    = { fontFamily: 'var(--ff-mono)' }
const body    = { fontFamily: 'var(--ff-body)' }

const statLabel = { ...mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(330 72% 56% / 0.6)' }

function Card({ children, style }) {
  return (
    <div style={{ background: '#fff', borderRadius: '1rem', padding: '1.25rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--primary-lt)', ...style }}>
      {children}
    </div>
  )
}

function Badge({ children, bg, color }) {
  return (
    <span style={{ ...mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', background: bg || 'var(--primary-lt)', color: color || 'var(--primary)', padding: '4px 12px', borderRadius: 999 }}>
      {children}
    </span>
  )
}

function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0.5rem 0 1.5rem' }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, hsl(330 72% 56% / 0.3), transparent)' }} />
      {label && <Badge>{label}</Badge>}
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, hsl(330 72% 56% / 0.3), transparent)' }} />
    </div>
  )
}

function Tick({ value }) {
  return <span style={{ ...mono, fontWeight: 700, fontSize: 14, color: value ? 'var(--mint-dk)' : 'hsl(0 60% 55%)' }}>{value ? '✓' : '✗'}</span>
}

function ComplexityPill({ value }) {
  const good = value.includes('log') || value === 'O(n)' || value === 'O(log n)'
  return (
    <span style={{
      ...mono, fontSize: 11, fontWeight: 700,
      padding: '3px 8px', borderRadius: 6, display: 'inline-block',
      background: good ? 'hsl(165 45% 72% / 0.25)' : 'var(--lav-lt)',
      color: good ? 'var(--mint-dk)' : 'var(--lav)',
    }}>
      {value}
    </span>
  )
}

const CHEAT_QA = [
  { q: 'Fastest in worst case (guaranteed)?', a: 'Merge Sort - always O(n log n).' },
  { q: 'Fastest in practice (average case)?', a: 'Quicksort - lower constants, excellent cache performance.' },
  { q: 'Best for small or nearly-sorted data?', a: 'Insertion Sort - adaptive, O(n) on nearly-sorted input.' },
  { q: 'Which are stable?', a: 'Bubble, Insertion, Merge. Quicksort is NOT stable.' },
  { q: 'Which needs extra memory?', a: 'Merge Sort - O(n) space. The rest are O(1) or O(log n).' },
  { q: 'Which does Python\'s Timsort use?', a: 'Merge Sort + Insertion Sort (hybrid).' },
  { q: 'Worst case for Quicksort?', a: 'O(n²) - pivot always lands at min or max element.' },
  { q: 'How to fix Quicksort\'s worst case?', a: 'Randomise the pivot, or use median-of-three selection.' },
]

export default function Compare() {
  const algos = ALGORITHM_ORDER.map(id => ALGORITHMS[id])

  const TABLE_ROWS = [
    { label: 'Best Case',  render: a => <ComplexityPill value={a.timeComplexity.best} /> },
    { label: 'Average',    render: a => <ComplexityPill value={a.timeComplexity.average} /> },
    { label: 'Worst Case', render: a => <ComplexityPill value={a.timeComplexity.worst} /> },
    { label: 'Space',      render: a => <ComplexityPill value={a.spaceComplexity} /> },
    { label: 'Stable',     render: a => <Tick value={a.stable} /> },
    { label: 'In-place',   render: a => <Tick value={a.inPlace} /> },
    { label: 'Adaptive',   render: a => <Tick value={a.adaptive} /> },
    { label: 'Method',     render: a => <span style={{ ...mono, fontSize: 11, color: 'hsl(330 15% 55%)' }}>{a.method}</span> },
  ]

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 1rem 4rem' }}>

      {/* HEADER */}
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="fade-up">
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Badge bg="var(--lav-lt)" color="var(--lav)">★ Issue No. 02</Badge>
          <Badge>Comparison Edition</Badge>
        </div>

        <h1 style={{ ...display, fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: '0.75rem' }}>
          Head-to-Head.
        </h1>

        <p style={{ ...body, fontSize: 14, color: 'hsl(330 15% 55%)', marginBottom: '1rem' }}>
          all four algorithms, side by side. no favourites. (ok, slight favourites.)
        </p>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, hsl(330 72% 56% / 0.3), hsl(290 50% 58% / 0.3), transparent)', width: '60%', margin: '0 auto 1rem' }} />

        <Link to="/" style={{ ...body, fontSize: 14, color: 'hsl(330 15% 55%)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          ← back to visualiser
        </Link>
      </header>

      {/* TABLE */}
      <section style={{ marginBottom: '3rem' }} className="fade-up2">
        <Divider label="📊 comparison table" />
        <div style={{ overflowX: 'auto', borderRadius: '1rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--primary-lt)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--primary-lt)' }}>
                <th style={{ ...statLabel, textAlign: 'left', padding: '12px 16px', width: 110 }}>Property</th>
                {algos.map(a => (
                  <th key={a.id} style={{ ...display, fontSize: 15, fontWeight: 600, color: 'var(--primary)', padding: '12px', textAlign: 'center' }}>
                    {a.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? '#fff' : 'hsl(330 30% 98%)' }}>
                  <td style={{ ...statLabel, padding: '12px 16px' }}>{row.label}</td>
                  {algos.map(a => (
                    <td key={a.id} style={{ padding: '12px', textAlign: 'center' }}>{row.render(a)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* VIBE */}
      <section style={{ marginBottom: '3rem' }} className="fade-up3">
        <Divider label="💅 vibe check" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {algos.map(a => (
            <div key={a.id} style={{ borderRadius: '1rem', padding: '1.25rem', border: '1px solid var(--primary-lt)', boxShadow: 'var(--shadow-card)', background: `linear-gradient(135deg, white, ${a.accentColor})` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ ...display, fontSize: '1.1rem', fontWeight: 600, color: a.color }}>{a.name}</h3>
                <span style={{ ...mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', background: a.accentColor, color: a.color, padding: '3px 8px', borderRadius: 999 }}>{a.personality}</span>
              </div>
              <p style={{ ...body, fontSize: 12, fontStyle: 'italic', color: 'hsl(330 15% 55%)', marginBottom: 8 }}>{a.tagline}</p>
              <p style={{ ...body, fontSize: 13, color: 'hsl(330 15% 40%)', lineHeight: 1.6 }}>{a.vibeCheck}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHEN TO USE */}
      <section style={{ marginBottom: '3rem' }} className="fade-up3">
        <Divider label="🗂 when to use what" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { scenario: 'General-purpose, large dataset',  winner: 'Quicksort',       reason: 'Best average-case constants, in-place, cache-friendly.' },
            { scenario: 'Need guaranteed O(n log n)',       winner: 'Merge Sort',      reason: 'Only algorithm here with no worst-case cliff.' },
            { scenario: 'Small or nearly-sorted data',     winner: 'Insertion Sort',  reason: 'Adaptive - O(n) on almost-sorted input. Python\'s Timsort uses it.' },
            { scenario: 'Teaching / simplest code',        winner: 'Bubble Sort',     reason: 'Clearest mental model. Use for demos, not production.' },
            { scenario: 'Sorting linked lists',            winner: 'Merge Sort',      reason: 'No random access needed; merge is natural for linked structures.' },
            { scenario: 'Memory-constrained environment',  winner: 'Quicksort',       reason: 'O(log n) stack space. Merge sort\'s O(n) auxiliary is too costly.' },
          ].map(({ scenario, winner, reason }) => (
            <Card key={scenario} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, padding: '0.875rem 1.25rem' }}>
              <p style={{ ...body, fontSize: 14, color: 'hsl(330 15% 40%)' }}>{scenario}</p>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{ ...mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--primary-lt)', color: 'var(--primary)', padding: '3px 10px', borderRadius: 999, display: 'block', marginBottom: 4 }}>{winner}</span>
                <p style={{ ...body, fontSize: 11, color: 'hsl(330 15% 55%)' }}>{reason}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CHEAT SHEET */}
      <section className="fade-up4">
        <Divider label="🧪 exam cheat sheet" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {CHEAT_QA.map(({ q, a }, i) => (
            <div key={i} style={{ borderRadius: '1rem', padding: '1rem 1.25rem', background: i % 2 === 0 ? '#fff' : 'hsl(330 72% 56% / 0.03)' }}>
              <p style={{ ...display, fontSize: 14, fontWeight: 600, color: 'hsl(330 15% 35%)', marginBottom: 4 }}>Q: {q}</p>
              <p style={{ ...body, fontSize: 13, color: 'hsl(330 15% 55%)' }}>→ {a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}