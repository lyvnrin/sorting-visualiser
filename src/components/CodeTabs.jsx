import { useState } from 'react'

const TABS = ['python', 'java', 'pseudo']
const TAB_LABELS = { python: 'Python 🐍', java: 'Java ☕', pseudo: 'Pseudocode 📝' }

function highlight(code, lang) {
  if (lang === 'pseudo') {
    return code
      .replace(/(RETURN|IF|ELSE|FOR|WHILE|TO|AND|NOT|BREAK|SWAP|DO)/g, '<span class="code-keyword">$1</span>')
      .replace(/(←.*)/g, '<span class="code-comment">$1</span>')
      .replace(/(\b\d+\b)/g, '<span class="code-num">$1</span>')
  }
  if (lang === 'python') {
    return code
      .replace(/(def |return |for |while |if |else:|elif |not |in |and |or |break|True|False|None)/g, '<span class="code-keyword">$1</span>')
      .replace(/(#.*)/g, '<span class="code-comment">$1</span>')
      .replace(/(\b\d+\b)/g, '<span class="code-num">$1</span>')
      .replace(/(merge_sort|bubble_sort|insertion_sort|quicksort|partition|merge)(?=\()/g, '<span class="code-fn">$1</span>')
  }
  if (lang === 'java') {
    return code
      .replace(/(public|static|void|int|return|for|while|if|else|new|private)/g, '<span class="code-keyword">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')
      .replace(/(\b\d+\b)/g, '<span class="code-num">$1</span>')
      .replace(/(mergeSort|bubbleSort|insertionSort|quickSort|partition|merge)(?=\()/g, '<span class="code-fn">$1</span>')
  }
  return code
}

export default function CodeTabs({ code }) {
  const [active, setActive] = useState('python')

  return (
    <div>
      {/* TAB BAR */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--primary-lt)', borderRadius: '0.75rem 0.75rem 0 0', padding: 4 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              flex: 1, padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '0.04em',
              background: active === tab ? '#fff' : 'transparent',
              color: active === tab ? 'var(--primary)' : 'hsl(330 72% 56% / 0.6)',
              fontWeight: active === tab ? 700 : 400,
              boxShadow: active === tab ? '0 1px 4px hsl(330 72% 56% / 0.1)' : 'none',
              transition: 'all 0.15s',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div
        className="code-block"
        dangerouslySetInnerHTML={{ __html: highlight(code[active] || '', active) }}
      />
    </div>
  )
}