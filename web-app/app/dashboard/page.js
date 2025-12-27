'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [clips, setClips] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showPaywall, setShowPaywall] = useState(false)
  const [stats, setStats] = useState({ total: 0, thisWeek: 0 })

  useEffect(() => {
    loadClips()
  }, [filter])

  const loadClips = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/clips?userId=1&filter=${filter}`)
      const data = await response.json()
      setClips(data.clips || [])
      
      const total = data.clips.length
      const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
      const thisWeek = data.clips.filter(c => 
        new Date(c.created_at).getTime() > weekAgo
      ).length
      
      setStats({ total, thisWeek })
    } catch (error) {
      console.error('Load clips error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadClips()
      return
    }

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, userId: 1 })
      })
      const data = await response.json()
      setClips(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const deleteClip = async (id) => {
    if (!confirm('Delete this clip?')) return
    
    try {
      await fetch(`/api/clips?id=${id}&userId=1`, { method: 'DELETE' })
      loadClips()
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const downloadClip = (clip) => {
    const ext = clip.is_code ? (clip.language || 'txt') : 'txt'
    const blob = new Blob([clip.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `clip-${clip.id}.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{ 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem' 
            }}>
              <img 
                src="/logo-white.png" 
                alt="Zdravo AI" 
                style={{ height: '32px' }}
              />
              <span style={{ fontSize: '24px' }}>Zdravo AI</span>
            </div>
          </Link>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', opacity: 0.7 }}>
              {stats.total} clips • {stats.thisWeek} this week
            </div>
            <Link href="/stats">
              <button style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📊 Stats
              </button>
            </Link>
            <Link href="/pricing">
              <button style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Upgrade to Pro
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Search & Filters */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '1.5rem',
          borderRadius: '16px',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="🔍 Search your clips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '12px 24px',
                background: '#667eea',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['all', 'code', 'text'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 16px',
                  background: filter === f ? '#667eea' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Clips Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <div>Loading your clips...</div>
          </div>
        ) : clips.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <img 
                src="/logo-white.png" 
                alt="Zdravo AI" 
                style={{ height: '64px', opacity: 0.5 }}
              />
            </div>
            <h2>No clips yet</h2>
            <p style={{ color: '#999', marginBottom: '2rem' }}>
              Install the Chrome extension and start capturing!
            </p>
            <a href="https://chrome.google.com/webstore">
              <button style={{
                padding: '12px 24px',
                background: '#667eea',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Install Extension
              </button>
            </a>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {clips.map(clip => (
              <div
                key={clip.id}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Clip Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '16px' }}>
                      {clip.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        padding: '4px 8px',
                        background: 'rgba(102, 126, 234, 0.2)',
                        borderRadius: '4px',
                        fontSize: '11px'
                      }}>
                        {clip.platform}
                      </span>
                      {clip.is_code && (
                        <span style={{
                          padding: '4px 8px',
                          background: 'rgba(76, 175, 80, 0.2)',
                          borderRadius: '4px',
                          fontSize: '11px'
                        }}>
                          {clip.language || 'code'}
                        </span>
                      )}
                      {clip.tags?.map(tag => (
                        <span key={tag} style={{
                          padding: '4px 8px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          fontSize: '11px'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Preview */}
                <pre style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontSize: '13px',
                  maxHeight: '150px',
                  overflow: 'hidden',
                  margin: '0 0 1rem 0',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}>
                  {clip.content.slice(0, 200)}...
                </pre>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '12px', color: '#999' }}>
                    {new Date(clip.created_at).toLocaleDateString()}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => navigator.clipboard.writeText(clip.content)}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(102, 126, 234, 0.2)',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => downloadClip(clip)}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(76, 175, 80, 0.2)',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Download
                    </button>
                    <button
                      onClick={() => deleteClip(clip.id)}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(244, 67, 54, 0.2)',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
