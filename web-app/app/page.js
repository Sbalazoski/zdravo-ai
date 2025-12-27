import Link from 'next/link'

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background:
          'radial-gradient(circle at top, #0ea5e9 0, #1d4ed8 35%, #020617 100%)',
      }}
    >
      {/* Floating background orbs */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Main content wrapper */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header
          style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <img
              src="/logo-white.png"
              alt="Zdravo AI"
              style={{ height: '36px' }}
              className="logo-pulse"
            />
            <span style={{ fontSize: '28px' }}>Zdravo AI</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/pricing">
              <button className="btn-ghost">
                Pricing
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="btn-primary">
                Dashboard
              </button>
            </Link>
          </div>
        </header>

        {/* Hero + Features */}
        <main
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '4rem 2rem 3rem',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <img
              src="/logo-white.png"
              alt="Zdravo AI"
              style={{ height: '80px', marginBottom: '1rem' }}
              className="logo-float"
            />
          </div>

          <p className="pill-beta">
            New · Never lose an AI conversation again
          </p>

          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
            }}
          >
            Never Lose an AI Conversation Again
          </h1>

          <p
            style={{
              fontSize: '1.4rem',
              opacity: 0.95,
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem',
            }}
          >
            Capture, organize, and search AI outputs from ChatGPT, Claude, Gemini, and more.
            Your personal AI knowledge base.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '4rem',
              flexWrap: 'wrap',
            }}
          >
            <a href="https://chrome.google.com/webstore" style={{ textDecoration: 'none' }}>
              <button className="btn-large-primary">
                🚀 Install Chrome Extension
              </button>
            </a>

            <Link href="/dashboard">
              <button className="btn-large-ghost">
                Try Dashboard
              </button>
            </Link>
          </div>

          {/* Features */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '4rem',
            }}
          >
            {[
              {
                icon: '🌍',
                title: 'Universal Capture',
                description: 'Works on ChatGPT, Claude, Gemini, Copilot, and more',
              },
              {
                icon: '🤖',
                title: 'AI-Powered',
                description: 'Auto-tags and organizes your clips intelligently',
              },
              {
                icon: '🔍',
                title: 'Semantic Search',
                description: 'Find clips by meaning, not just keywords',
              },
              {
                icon: '💾',
                title: 'Never Lose Content',
                description: 'All your AI conversations in one searchable place',
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Capture with one click or keyboard shortcut',
              },
              {
                icon: '📤',
                title: 'Export Anywhere',
                description: 'Download as files, push to GitHub, or export to tools',
              },
            ].map((feature, i) => (
              <div key={i} className="feature-card">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {feature.title}
                </h3>
                <p style={{ opacity: 0.9, fontSize: '1rem' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              background: 'rgba(15,23,42,0.8)',
              backdropFilter: 'blur(12px)',
              padding: '3rem 2rem',
              textAlign: 'center',
              color: 'white',
              margin: '4rem 0 0',
              borderRadius: '24px',
            }}
            className="cta-pop"
          >
            <h2 style={{ fontSize: '2.3rem', marginBottom: '1rem' }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
              Install the extension and start capturing in seconds.
            </p>
            <button className="btn-large-primary">
              Install Free Extension
            </button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: '1.25rem 2rem',
          color: 'rgba(226,232,240,0.7)',
          fontSize: '0.9rem',
          borderTop: '1px solid rgba(148,163,184,0.3)',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <span>© 2025 Zdravo.AI · Never lose an AI conversation</span>
      </footer>
    </div>
  )
}
