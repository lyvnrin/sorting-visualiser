const LEGEND = [
  { color: 'hsl(330, 55%, 82%)', label: 'Unsorted' },
  { color: 'hsl(330, 72%, 40%)', label: 'Comparing' },
  { color: 'hsl(290, 50%, 58%)', label: 'Swapping' },
  { color: 'hsl(330, 72%, 56%)', label: 'Sorted' },
]

function getBarColor(i, comparing, swapping, sorted) {
  if (sorted.includes(i))    return 'hsl(330, 72%, 56%)'
  if (swapping.includes(i))  return 'hsl(290, 50%, 58%)'
  if (comparing.includes(i)) return 'hsl(330, 72%, 40%)'
  return 'hsl(330, 55%, 82%)'
}

function getBarGlow(i, comparing, swapping, sorted) {
  if (swapping.includes(i))  return '0 0 14px hsl(290 50% 58% / 0.7)'
  if (comparing.includes(i)) return '0 0 10px hsl(330 72% 50% / 0.6)'
  if (sorted.includes(i))    return '0 0 6px hsl(330 72% 56% / 0.3)'
  return 'none'
}

export default function BarChart({ array, comparing, swapping, sorted }) {
  const max = Math.max(...array, 1)

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {LEGEND.map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(330 72% 56% / 0.6)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 220, width: '100%' }}>
        {array.map((value, i) => (
          <div
            key={i}
            className="sort-bar"
            style={{
              height: `${(value / max) * 100}%`,
              backgroundColor: getBarColor(i, comparing, swapping, sorted),
              boxShadow: getBarGlow(i, comparing, swapping, sorted),
            }}
            title={`[${i}] = ${value}`}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        {array.map((_, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--ff-mono)', fontSize: 8, color: 'hsl(330 72% 56% / 0.3)' }}>
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}