```javascript
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
      
      // Calculate stats
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
<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
  <div style={{ fontSize: '14px', opacity: 0.7 }}>
    {stats.total} clips • {stats.thisWeek} this week
  </div>
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
    
      {/* Header */}
      
        
          
            
              🦄 Zdravo AI
            
          
          
          
            
              {stats.total} clips • {stats.thisWeek} this week
            
            
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
                Upgrade to Pro
              
            
          
        
      

      
        {/* Search & Filters */}
        
          
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
            
              Search
            
          

          
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
              
            ))}
          
        

        {/* Clips Grid */}
        {loading ? (
          
            ⏳
            Loading your clips...
          
        ) : clips.length === 0 ? (
          
            📋
            No clips yet
            
              Install the Chrome extension and start capturing!
            
            
              
                Install Extension
              
            
          
        ) : (
          
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
                
                  
                    
                      {clip.title}
                    
                    
                      
                        {clip.platform}
                      
                      {clip.is_code && (
                        
                          {clip.language || 'code'}
                        
                      )}
                      {clip.tags?.map(tag => (
                        
                          {tag}
                        
                      ))}
                    
                  
                

                {/* Content Preview */}
                
                  {clip.content.slice(0, 200)}...
                

                {/* Actions */}
                
                  
                    {new Date(clip.created_at).toLocaleDateString()}
                  
                  
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
                    
                  
                
              
            ))}
          
        )}
      
    
  )
}
```
