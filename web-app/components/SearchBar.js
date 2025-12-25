'use client'
import { useState } from 'react'

export default function SearchBar({ onSearch, isPro }) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      padding: '1.5rem',
      borderRadius: '16px',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder={isPro ? "🔍 AI-powered search..." : "🔍 Search clips..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
      
      {!isPro && query && (
        <div style={{
          padding: '12px',
          background: 'rgba(255, 193, 7, 0.1)',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#ffc107'
        }}>
          💡 Upgrade to Pro for AI-powered semantic search!
        </div>
      )}
    </div>
  )
}
