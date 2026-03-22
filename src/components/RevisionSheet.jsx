import { useState } from 'react'
import CodeTabs from './CodeTabs'

const display = { fontFamily: 'var(--ff-display)' }
const mono    = { fontFamily: 'var(--ff-mono)' }
const body    = { fontFamily: 'var(--ff-body)' }

const TABS = [
  { id: 'how',        label: 'How it Works' },
  { id: 'complexity', label: 'Complexity' },
  { id: 'code',       label: 'Code' },
]

function Card({ children, style }) {
  return (
    <div style={{ background: '#fff', borderRadius: '1rem', padding: '1.25rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--primary-lt)', ...style }}>
      {children}
    </div>
  )
}

function PropRow({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700,
        background: value ? 'hsl(165 45% 72% / 0.4)' : 'hsl(0 80% 90%)',
        color: value ? 'var(--mint-dk)' : 'hsl(0 60% 55%)',
      }}>
        {value ? '✓' : '✗'}
      </div>
      <span style={{ ...body, fontSize: 14, color: 'hsl(330 15% 40%)' }}>{label}</span>
    </div>
  )
}

function HowItWorksTab({ meta }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Steps */}
      <Card>
        <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {meta.howItWorks.map((step, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                background: 'var(--primary-lt)', color: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                ...display, fontSize: 12, fontWeight: 700, marginTop: 1,
              }}>{i + 1}</span>
              <p style={{ ...body, fontSize: 14, color: 'hsl(330 15% 40%)', lineHeight: 1.6 }}>{step}</p>
            </li>
          ))}
        </ol>
      </Card>

      {/* ANALOGY TEXT */}
      <div style={{ borderRadius: '1rem', padding: '1rem 1.25rem', background: 'hsl(330 72% 56% / 0.06)', borderLeft: '4px solid var(--primary)' }}>
        <p style={{ ...mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(330 72% 56% / 0.6)', marginBottom: 6 }}>💡 think of it like…</p>
        <p style={{ ...body, fontSize: 14, color: 'hsl(330 15% 40%)', fontStyle: 'italic', lineHeight: 1.6 }}>{meta.analogy}</p>
      </div>

      {/* WHEN TO USE / AVOID TEXT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card>
          <p style={{ ...display, fontSize: 14, fontWeight: 600, color: 'var(--mint-dk)', marginBottom: 8 }}>✅ when to use</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {meta.whenToUse.map((w, i) => (
              <li key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--mint-dk)', flexShrink: 0 }}>→</span>
                <span style={{ ...body, fontSize: 12, color: 'hsl(330 15% 40%)', lineHeight: 1.5 }}>{w}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p style={{ ...display, fontSize: 14, fontWeight: 600, color: 'hsl(0 60% 55%)', marginBottom: 8 }}>❌ when to avoid</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {meta.whenToAvoid.map((w, i) => (
              <li key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                <span style={{ color: 'hsl(0 60% 70%)', flexShrink: 0 }}>→</span>
                <span style={{ ...body, fontSize: 12, color: 'hsl(330 15% 40%)', lineHeight: 1.5 }}>{w}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* VIBE + EXAM TIP TEXT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ borderRadius: '1rem', padding: '1rem', background: 'linear-gradient(135deg, hsl(330 72% 56% / 0.05), hsl(290 50% 58% / 0.05))' }}>
          <p style={{ ...mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--primary)', marginBottom: 6 }}>💅 vibe</p>
          <p style={{ ...body, fontSize: 12, fontStyle: 'italic', color: 'hsl(330 15% 45%)', lineHeight: 1.5 }}>"{meta.vibeCheck}"</p>
        </div>
        <div style={{ borderRadius: '1rem', padding: '1rem', background: 'hsl(290 50% 58% / 0.06)', borderLeft: '3px solid var(--lav)' }}>
          <p style={{ ...mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--lav)', marginBottom: 6 }}>🧪 exam tip</p>
          <p style={{ ...body, fontSize: 12, color: 'hsl(330 15% 40%)', lineHeight: 1.5 }}>{meta.examTip}</p>
        </div>
      </div>
    </div>
  )
}

function ComplexityTab({ meta }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {[
          { label: 'Best Case',    value: meta.timeComplexity.best,    bg: 'hsl(165 45% 72% / 0.2)', color: 'var(--mint-dk)' },
          { label: 'Average Case', value: meta.timeComplexity.average, bg: 'var(--primary-lt)',       color: 'var(--primary)' },
          { label: 'Worst Case',   value: meta.timeComplexity.worst,   bg: 'var(--lav-lt)',           color: 'var(--lav)' },
          { label: 'Space',        value: meta.spaceComplexity,        bg: 'hsl(0 80% 96%)',          color: 'hsl(0 60% 55%)' },
        ].map(({ label, value, bg, color }) => (
          <div key={label} style={{ background: bg, borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ ...mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: `${color}99`, marginBottom: 6 }}>{label}</p>
            <p style={{ ...mono, fontSize: 15, fontWeight: 700, color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* PROPERTIES TEXT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card>
          <p style={{ ...display, fontSize: 14, fontWeight: 600, color: 'hsl(330 72% 56% / 0.8)', marginBottom: 10 }}>properties</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PropRow label="Stable"   value={meta.stable} />
            <PropRow label="In-place" value={meta.inPlace} />
            <PropRow label="Adaptive" value={meta.adaptive} />
          </div>
        </Card>
        <Card>
          <p style={{ ...display, fontSize: 14, fontWeight: 600, color: 'hsl(330 72% 56% / 0.8)', marginBottom: 10 }}>craftsmanship</p>
          <div style={{ fontSize: 20, letterSpacing: 2, marginBottom: 6 }}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} style={{ color: i < meta.craftsmanshipRating ? 'var(--primary)' : 'var(--primary-lt)' }}>★</span>
            ))}
          </div>
          <p style={{ ...body, fontSize: 12, fontStyle: 'italic', color: 'hsl(330 15% 55%)' }}>
            {meta.craftsmanshipRating === 5 ? 'Elite tier.' :
             meta.craftsmanshipRating >= 4 ? 'Solid. Does the job with style.' :
             meta.craftsmanshipRating >= 3 ? 'Decent. Gets the job done.' :
             'Bless its heart.'}
          </p>
        </Card>
      </div>

      {/* STABILITY TEXT */}
      <Card style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>⚖️</span>
        <div>
          <p style={{ ...display, fontSize: 14, fontWeight: 600, color: 'hsl(330 72% 56% / 0.8)', marginBottom: 4 }}>stability</p>
          <p style={{ ...body, fontSize: 13, color: 'hsl(330 15% 40%)', lineHeight: 1.6 }}>
            A stable sort preserves the relative order of equal elements.{' '}
            {meta.name} is <strong>{meta.stable ? 'stable ✓' : 'unstable ✗'}</strong>.
          </p>
        </div>
      </Card>

      {/* Fun fact */}
      <Card>
        <p style={{ ...mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(330 72% 56% / 0.6)', marginBottom: 6 }}>⭐ fun fact</p>
        <p style={{ ...body, fontSize: 13, color: 'hsl(330 15% 45%)', lineHeight: 1.6 }}>{meta.funFact}</p>
      </Card>
    </div>
  )
}

export default function RevisionSheet({ meta }) {
  const [activeTab, setActiveTab] = useState('how')
  if (!meta) return null

  return (
    <div style={{ marginTop: '0.5rem' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--primary-lt)', borderRadius: '1rem 1rem 0 0', padding: 4, marginBottom: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: '0.6rem 0.5rem',
              borderRadius: '0.65rem',
              ...display, fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500,
              background: activeTab === tab.id ? '#fff' : 'transparent',
              color: activeTab === tab.id ? 'var(--primary)' : 'hsl(330 72% 56% / 0.6)',
              boxShadow: activeTab === tab.id ? 'var(--shadow-card)' : 'none',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ background: 'hsl(330 30% 98%)', borderRadius: '0 0 1rem 1rem', padding: '1rem 0 0' }}>
        {activeTab === 'how'        && <HowItWorksTab meta={meta} />}
        {activeTab === 'complexity' && <ComplexityTab meta={meta} />}
        {activeTab === 'code'       && <CodeTabs code={meta.code} />}
      </div>
    </div>
  )
}