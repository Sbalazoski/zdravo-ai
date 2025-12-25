import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f9fafb, white)' }}>
      
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #e5e7eb',
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <nav style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link href="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none'
          }}>
           <Link
  href="/"
  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
>
  <img src="/logo.svg" alt="Zdravo AI logo" style={{ height: '24px' }} />
  Zdravo AI   }}>
</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/pricing" style={{
              color: '#4b5563',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}>
              Pricing
            </Link>
            <Link href="/dashboard" style={{
              padding: '0.5rem 1rem',
              background: '#2563eb',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              transition: 'background 0.2s'
            }}>
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1rem' }}>
        <div style={{ textAlign: 'center' }}>
        <img src="/logo.png" alt="Zdravo AI" style={{ 
  height: '80px', 
  marginBottom: '2rem' 
}} />
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
            fontWeight: 'bold',
            color: '#111827',
            lineHeight: '1.2',
            marginBottom: '2rem'
          }}>
            Never Lose an AI Conversation Again
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#4b5563',
            maxWidth: '42rem',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            Capture, organize, and search AI outputs from ChatGPT, Claude, Gemini, and more. 
            Your personal AI knowledge base.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '5rem'
          }}>
            <Link href="#install" style={{
              padding: '1rem 2rem',
              background: '#2563eb',
              color: 'white',
              borderRadius: '0.5rem',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '1.125rem',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}>
              🚀 Install Chrome Extension
            </Link>
            
            <Link href="/dashboard" style={{
              padding: '1rem 2rem',
              border: '2px solid #d1d5db',
              color: '#374151',
              borderRadius: '0.5rem',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '1.125rem',
              transition: 'all 0.2s'
            }}>
              Try Dashboard
            </Link>
          </div>

          {/* Features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '5rem'
          }}>
            {[
              { icon: '🌍', title: 'Universal Capture', description: 'Works on ChatGPT, Claude, Gemini, Copilot, and more' },
              { icon: '🤖', title: 'AI-Powered', description: 'Auto-tags and organizes your clips intelligently' },
              { icon: '🔍', title: 'Semantic Search', description: 'Find clips by meaning, not just keywords' },
              { icon: '💾', title: 'Never Lose Content', description: 'All your AI conversations in one searchable place' },
              { icon: '⚡', title: 'Lightning Fast', description: 'Capture with one click or keyboard shortcut' },
              { icon: '📤', title: 'Export Anywhere', description: 'Download as files, push to GitHub, or export to tools' }
            ].map((feature, i) => (
              <div key={i} style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                border: '1px solid #f3f4f6',
                transition: 'box-shadow 0.2s'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#4b5563', lineHeight: '1.5' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(to right, #2563eb, #7c3aed)',
        padding: '5rem 1rem',
        marginTop: '5rem'
      }}>
        <div style={{
          maxWidth: '56rem',
          margin: '0 auto',
          textAlign: 'center',
          padding: '0 1rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Ready to get started?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(191,219,254,0.8)',
            marginBottom: '2rem'
          }}>
            Install the extension and start capturing in seconds
          </p>
          <Link href="#install" style={{
            padding: '1rem 2rem',
            background: 'white',
            color: '#2563eb',
            borderRadius: '0.5rem',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '1.125rem',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            transition: 'all 0.2s'
          }}>
            Install Free Extension
          </Link>
        </div>
      </section>
    </div>
  )
}
