import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Header */}
      <header style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          fontWeight: 'bold',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <img 
            src="/logo-white.png" 
            alt="Zdravo AI" 
            style={{ height: '36px' }}
          />
          <span style={{ fontSize: '28px' }}>Zdravo AI</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/pricing">
            <button style={{
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid white',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Pricing
            </button>
          </Link>
          <Link href="/dashboard">
            <button style={{
              padding: '10px 20px',
              background: 'white',
              border: 'none',
              borderRadius: '8px',
              color: '#667eea',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Dashboard
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '6rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <img 
            src="/logo-white.png" 
            alt="Zdravo AI" 
            style={{ height: '80px', marginBottom: '1rem' }}
          />
        </div>
        
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          Never Lose an AI Conversation Again
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          opacity: 0.95,
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          Capture, organize, and search AI outputs from ChatGPT, Claude, Gemini, and more. 
          Your personal AI knowledge base.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '4rem'
        }}>
          <a 
            href="https://chrome.google.com/webstore"
            style={{ textDecoration: 'none' }}
          >
            <button style={{
              padding: '16px 32px',
              background: 'white',
              border: 'none',
              borderRadius: '12px',
              color: '#667eea',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
              🚀 Install Chrome Extension
            </button>
          </a>
          
          <Link href="/dashboard">
            <button style={{
              padding: '16px 32px',
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid white',
              borderRadius: '12px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Try Dashboard
            </button>
          </Link>
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '6rem'
        }}>
          {[
            {
              icon: '🌍',
              title: 'Universal Capture',
              description: 'Works on ChatGPT, Claude, Gemini, Copilot, and more'
            },
            {
              icon: '🤖',
              title: 'AI-Powered',
              description: 'Auto-tags and organizes your clips intelligently'
            },
            {
              icon: '🔍',
              title: 'Semantic Search',
              description: 'Find clips by meaning, not just keywords'
            },
            {
              icon: '💾',
              title: 'Never Lose Content',
              description: 'All your AI conversations in one searchable place'
            },
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Capture with one click or keyboard shortcut'
            },
            {
              icon: '📤',
              title: 'Export Anywhere',
              description: 'Download as files, push to GitHub, or export to tools'
            }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
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
      </div>

      {/* CTA */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white',
        margin: '4rem 2rem',
        borderRadius: '24px'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Ready to get started?
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
          Install the extension and start capturing in seconds
        </p>
        <button style={{
          padding: '16px 32px',
          background: 'white',
          border: 'none',
          borderRadius: '12px',
          color: '#667eea',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Install Free Extension
        </button>
      </div>
    </div>
  )
}
