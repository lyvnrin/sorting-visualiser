const mono = { fontFamily: 'var(--ff-mono)' }
const display = { fontFamily: 'var(--ff-display)' }

export default function Controls({ state, speed, setSpeed, onStart, onReset }) {
  const { isRunning, isDone, steps, swaps } = state

  const statusLabel = isDone ? '✓ done' : isRunning ? '⟳ running' : '— idle'
  const statusColor = isDone ? 'var(--mint-dk)' : isRunning ? 'var(--primary)' : 'hsl(330 72% 56% / 0.4)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* SPEED */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ ...mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(330 72% 56% / 0.6)' }}>
            Speed
          </span>
          <span style={{ ...mono, fontSize: 10, color: 'hsl(330 72% 56% / 0.6)' }}>
            {speed < 34 ? 'slow 🐢' : speed < 67 ? 'medium 🐇' : 'fast ⚡'}
          </span>
        </div>
        <input
          type="range" min={1} max={100} value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          aria-label="animation speed"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <span style={{ ...mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(330 72% 56% / 0.4)' }}>slower</span>
          <span style={{ ...mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(330 72% 56% / 0.4)' }}>faster</span>
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={onStart}
          disabled={isRunning || isDone}
          style={{
            flex: 1, padding: '0.75rem', borderRadius: '1rem',
            ...display, fontWeight: 600, fontSize: '1rem',
            background: isRunning || isDone ? 'var(--primary-lt)' : 'var(--primary)',
            color: isRunning || isDone ? 'hsl(330 72% 56% / 0.5)' : '#fff',
            boxShadow: isRunning || isDone ? 'none' : 'var(--shadow-glow)',
            cursor: isRunning || isDone ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            border: 'none',
          }}
        >
          {isDone ? 'Done! 🎉' : isRunning ? 'Running…' : 'Go ▶️'}
        </button>

        <button
          onClick={onReset}
          disabled={isRunning}
          style={{
            flex: 1, padding: '0.75rem', borderRadius: '1rem',
            ...display, fontWeight: 600, fontSize: '1rem',
            background: '#fff',
            color: isRunning ? 'hsl(330 72% 56% / 0.3)' : 'var(--primary)',
            border: '2px solid var(--primary-lt)',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Shuffle 🔀
        </button>
      </div>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
        {[
          { label: 'Status', value: statusLabel, valueStyle: { ...display, fontSize: '1.1rem', fontWeight: 600, color: statusColor } },
          { label: 'Steps',  value: steps,       valueStyle: { ...display, fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)' } },
          { label: 'Swaps',  value: swaps,       valueStyle: { ...display, fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)' } },
        ].map(({ label, value, valueStyle }) => (
          <div key={label} style={{ background: '#fff', borderRadius: '1rem', padding: '0.75rem', textAlign: 'center', boxShadow: 'var(--shadow-card)', border: '1px solid var(--primary-lt)' }}>
            <p style={{ ...mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(330 72% 56% / 0.6)', marginBottom: 4 }}>{label}</p>
            <p style={valueStyle}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}