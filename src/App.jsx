import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Visualiser from './pages/Visualiser'
import Compare from './pages/Compare'

const s = {
  footer: {
    textAlign: 'center',
    padding: '2rem 1rem',
    marginTop: '3rem',
    borderTop: '1px solid hsl(330, 72%, 92%)',
  },
  footerText: {
    fontFamily: 'var(--ff-mono)',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'hsl(330, 72%, 56%, 0.4)',
  },
}

function Footer() {
  return (
    <footer style={s.footer}>
      <p style={s.footerText}>No algorithms were harmed in the making of this magazine. 💅</p>
    </footer>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <Routes>
          <Route path="/"        element={<><Visualiser /><Footer /></>} />
          <Route path="/compare" element={<><Compare /><Footer /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}