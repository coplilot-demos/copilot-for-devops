import React, { useState, useEffect, useCallback, useMemo } from 'react'

/**
 * Copilot for DevOps — Main React Component
 * Features: greeting, theme selector, jokes/tips, deployment counter
 */
export default function App() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('No greeting yet.')
  const [count, setCount] = useState(0)
  const [copilotReply, setCopilotReply] = useState('Ask me for a joke or a deployment tip...')
  const [copilotType, setCopilotType] = useState('tip')
  const [theme, setTheme] = useState('cloudy')

  const copilotResponses = useMemo(() => [
    { text: 'Why do DevOps engineers wear glasses? Because they cannot C#.', type: 'joke' },
    { text: 'I fixed the YAML - in my dreams.', type: 'tip' },
    { text: 'Why did the container go to therapy? It had too many layers.', type: 'joke' },
    { text: 'I have left a helpful comment on your pipeline. You are welcome.', type: 'tip' },
    { text: 'Deployment succeeded - except in alternate timelines.', type: 'tip' },
    { text: 'Permission denied. Also, have you tried coffee?', type: 'joke' },
    { text: 'Auto-scaling while you nap. Nice plan. 😴➡️🚀', type: 'tip' },
  ], [])

  const handleGreet = useCallback(() => {
    const n = name.trim() || 'Stranger'
    setGreeting(`Hello, ${n}! Copilot is ready to assist. 👋`)
  }, [name])

  const askCopilot = useCallback(() => {
    const pick = copilotResponses[Math.floor(Math.random() * copilotResponses.length)]
    setCopilotReply(pick.text)
    setCopilotType(pick.type)
  }, [copilotResponses])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <main className="container">
      <header className="hero">
        <h1>Copilot for DevOps — Fun Demo</h1>
        <p className="lead">A tiny, silly React app that knows a little about pipelines and a lot about jokes.</p>
      </header>

      <div className="controls card">
        <label htmlFor="theme">Background theme</label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          aria-label="Select background theme"
        >
          <option value="cloudy">Cloudy (Calm)</option>
          <option value="matrix">Matrix (Terminal vibes)</option>
          <option value="sunset">Sunset (Pretty)</option>
        </select>
      </div>

      <section className="card">
        <h2>Say hi to Copilot</h2>
        <label htmlFor="nameInput">Your name</label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGreet()}
          placeholder="DevOps Hero"
          aria-label="Enter your name"
        />
        <div className="row">
          <button onClick={handleGreet} aria-label="Greet button">Greet</button>
          <button
            className="secondary"
            onClick={askCopilot}
            title="Ask Copilot to tell you a joke"
            aria-label="Ask Copilot for a joke"
          >
            Ask Copilot for a joke 🤖😂
          </button>
        </div>
        <div className="output" aria-live="polite" aria-atomic="true">
          {greeting}
        </div>
        <div className="copilotReply">
          💬 <strong>Copilot:</strong> <span className={`badge ${copilotType}`}>{copilotType.toUpperCase()}</span> {copilotReply}
        </div>
      </section>

      <section className="card">
        <h2>Deployment Counter</h2>
        <p className="muted">Track how many times you (pretend to) deploy — each click grants +1 CI drama.</p>
        <div className="counter-row">
          <button aria-label="Decrement counter" onClick={() => setCount((c) => c - 1)}>−</button>
          <span id="count" role="status" aria-label={`Deployment count: ${count}`}>{count}</span>
          <button aria-label="Increment counter" onClick={() => setCount((c) => c + 1)}>+</button>
        </div>
        <div className="output" aria-live="polite">
          Deployment attempts: {count} — {count === 0 ? 'All green so far.' : count < 0 ? 'Time travel detected.' : 'Good luck!'}
        </div>
      </section>

      <footer>
        <small>Run locally: <code>npm install</code> then <code>npm run dev</code></small>
      </footer>
    </main>
  )
}
