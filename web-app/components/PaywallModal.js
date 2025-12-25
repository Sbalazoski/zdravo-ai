'use client'
import Link from 'next/link'

export default function PaywallModal({ show, onClose, reason }) {
  if (!show) return null

  const messages = {
    limit: {
      title: '50 Clip Limit Reached',
      description: 'You\'ve reached your free tier limit. Upgrade to Pro for unlimited clips!',
      icon: '📋'
    },
    search: {
      title: 'AI Search is a Pro Feature',
      description: 'Upgrade to Pro to unlock semantic search powered by AI.',
      icon: '🔍'
    },
    tags: {
      title: 'Auto-Tagging is Pro Only',
      description: 'Let AI automatically organize your clips with smart tags.',
      icon: '🏷️'
    }
  }

  const message = messages[reason] || messages.limit

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '3rem',
        maxWidth: '500px',
        width: '100%',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '18px'
          }}
        >
          ×
        </button>

        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {message.icon}
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          {message.title}
        </h2>

        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
          {message.description}
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Pro Features:
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Unlimited clips',
              'AI-powered search',
              'Auto-tagging',
              'Priority support',
              'Export to GitHub/Notion'
            ].map(feature => (
              <li key={feature} style={{
                padding: '0.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#4caf50' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Link href="/pricing">
          <button style={{
            width: '100%',
            padding: '16px',
            background: 'white',
            border: 'none',
            borderRadius: '12px',
            color: '#667eea',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}>
            Upgrade to Pro - $9/month
          </button>
        </Link>

        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            opacity: 0.7,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
