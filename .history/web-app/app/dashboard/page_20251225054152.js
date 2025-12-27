'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [clips, setClips] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [stats, setStats] = useState({ total: 0, thisWeek: 0 })

  // Load clips whenever filter changes
  useEffect(() => {
    loadClips()
  }, [filter])

  // Fetch clips
  const loadClips = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/clips?userId=1&filter=${encodeURIComponent(filter)}`)
      const data = await response.json()
      setClips(data.clips || [])

      // Calculate stats
      const total = data.clips.length
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      const thisWeek = data.clips.filter(c => new Date(c.created_at).getTime() > weekAgo).length
      setStats({ total, thisWeek })
    } catch (error) {
      console.error('Load clips error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadClips()
      return
    }

    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  // Delete clip
  const deleteClip = async (id) => {
    if (!confirm('Delete this clip?')) return
    try {
      await fetch(`/api/clips?id=${id}&userId=1`, { method: 'DELETE' })
      loadClips()
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  // Download clip
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)', padding: '2rem', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>🦄 Zdravo AI</h1>
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
          <button style={{
            padding: '8px 16px',
            background: 'rgba(102,126,234,0.2)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Upgrade to Pro
          </button>
        </div>
      </header>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
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
            padding: '12px 16px',
            background: 'rgba(102,126,234,0.2)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Search
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
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

      {/* Clips Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>⏳ Loading your clips...</div>
      ) : clips.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No clips yet</div>
          <div style={{ opacity: 0.7, marginBottom: '2rem' }}>Install the Chrome extension and start capturing!</div>
          <button style={{
            padding: '12px 24px',
            background: '#667eea',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Install Extension
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
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
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>{clip.title || 'Untitled'}</h2>
              <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '1rem' }}>
                {clip.platform} {clip.is_code && `• ${clip.language || 'code'}`} {clip.tags?.map(tag => ` • ${tag}`).join('')}
              </div>
              <pre style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '0.75rem',
                borderRadius: '6px',
                fontSize: '13px',
                marginBottom: '1rem',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                maxHeight: '150px',
                overflow: 'hidden'
              }}>
                {clip.content.slice(0, 200)}...
              </pre>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '11px', opacity: 0.5 }}>{new Date(clip.created_at).toLocaleDateString()}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(clip.content)
                      alert('✓ Copied to clipboard!')
                    }}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(102,126,234,0.2)',
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
                      background: 'rgba(76,175,80,0.2)',
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
                      background: 'rgba(244,67,54,0.2)',
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
  )
}