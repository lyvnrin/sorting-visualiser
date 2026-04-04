import { Link } from 'react-router-dom'
import { useSortingRunway } from '../hooks/useSortingRunway'
import { ALGORITHMS, ALGORITHM_ORDER } from '../data/algorithms'
import BarChart from '../components/BarChart'
import Controls from '../components/Controls'
import RevisionSheet from '../components/RevisionSheet'

const display = { fontFamily: 'var(--ff-display)' }
const mono    = { fontFamily: 'var(--ff-mono)' }
const body    = { fontFamily: 'var(--ff-body)' }

function Card({ children, style }) {
  return (
    <div style={{ background: '#fff', borderRadius: '1rem', padding: '1.25rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--primary-lt)', ...style }}>
      {children}
    </div>
  )
}

export default function Visualiser() {
  const { algorithm, meta, state, speed, setSpeed, start, reset, switchAlgorithm } = useSortingRunway()

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem 4rem' }}>

      {/* HEADER */}
      <header style={{ textAlign: 'center', marginBottom: '1.5rem' }} className="fade-up">
        <h1 style={{ ...display, fontSize: 'clamp(2.5rem, 10vw, 4rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: '0.4rem' }}>
          Sort It Out.
        </h1>
        <p style={{ ...body, fontSize: 14, color: 'hsl(330 15% 60%)' }}>
          classic algorithms, explained like a smart friend
        </p>
      </header>

      {/* INFORMATION STRIP */}
      <div style={{ marginBottom: '1.25rem' }} className="fade-up2">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: '0.75rem' }}>
          {ALGORITHM_ORDER.map(id => {
            const active = algorithm === id
            const a = ALGORITHMS[id]
            return (
              <button
                key={id}
                onClick={() => switchAlgorithm(id)}
                style={{
                  ...display, fontWeight: 600, fontSize: 13,
                  padding: '7px 18px', borderRadius: 999,
                  border: `2px solid ${active ? 'var(--primary)' : 'var(--primary-lt)'}`,
                  background: active ? 'var(--primary)' : '#fff',
                  color: active ? '#fff' : 'var(--primary)',
                  boxShadow: active ? 'var(--shadow-glow)' : 'none',
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                {a.name}
              </button>
            )
          })}
          <Link
            to="/compare"
            style={{
              ...display, fontWeight: 600, fontSize: 13,
              padding: '7px 18px', borderRadius: 999,
              border: '2px solid var(--primary-lt)',
              background: '#fff', color: 'var(--primary)',
              display: 'inline-flex', alignItems: 'center',
              transition: 'all 0.2s',
            }}
          >
            Compare All ↗
          </Link>
        </div>

        {/* INFORMATION STRIP */}
        {meta && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 8,
            background: '#fff', borderRadius: '1rem',
            padding: '0.75rem 1.25rem',
            boxShadow: 'var(--shadow-card)', border: '1px solid var(--primary-lt)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ ...mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', background: meta.accentColor, color: meta.color, padding: '3px 9px', borderRadius: 999 }}>
                {meta.personality}
              </span>
              <p style={{ ...body, fontSize: 13, fontStyle: 'italic', color: 'hsl(330 15% 55%)' }}>{meta.tagline}</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              {[
                { label: 'best',  value: meta.timeComplexity.best },
                { label: 'avg',   value: meta.timeComplexity.average },
                { label: 'worst', value: meta.timeComplexity.worst },
              ].map(({ label, value }) => (
                <span key={label} style={{ ...mono, fontSize: 11 }}>
                  <span style={{ color: 'hsl(330 72% 56% / 0.45)' }}>{label} </span>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{value}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BAR CHART */}
      <Card style={{ marginBottom: '1rem' }} className="fade-up3">
        <BarChart
          array={state.array}
          comparing={state.comparing}
          swapping={state.swapping}
          sorted={state.sorted}
        />
      </Card>

      {/* CONTROLS */}
      <Card style={{ marginBottom: '1.5rem' }} className="fade-up3">
        <Controls state={state} speed={speed} setSpeed={setSpeed} onStart={start} onReset={reset} />
      </Card>

      {/* TABBED REVISION SHEET */}
      {meta && <RevisionSheet meta={meta} />}
    </div>
  )
}