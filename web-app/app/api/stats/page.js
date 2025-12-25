'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StatsPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7') // days

  useEffect(() => {
    loadStats()
  }, [timeRange])

  const loadStats = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/stats?days=${timeRange}`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <div>Loading stats...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              🦄 Zdravo AI - Usage Stats
            </div>
          </Link>
          <Link href="/dashboard">
            <button style={{
              padding: '8px 16px',
              background: '#667eea',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}>
              Back to Dashboard
            </button>
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Time Range Selector */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '1rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem'
        }}>
          {['7', '30', '90'].map(days => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              style={{
                padding: '8px 16px',
                background: timeRange === days ? '#667eea' : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Last {days} days
            </button>
          ))}
        </div>

        {/* Overview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Total Captures */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '0.5rem' }}>
              Total Captures
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
              {stats?.totalCaptures || 0}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '0.5rem' }}>
              All time
            </div>
          </div>

          {/* OpenAI Costs */}
          <div style={{
            background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
            padding: '2rem',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '0.5rem' }}>
              OpenAI Costs
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
              ${stats?.estimatedCosts?.toFixed(2) || '0.00'}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '0.5rem' }}>
              Last {timeRange} days
            </div>
          </div>

          {/* Pro Users */}
          <div style={{
            background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
            padding: '2rem',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '0.5rem' }}>
              Pro Users
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
              {stats?.proUsers || 0}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '0.5rem' }}>
              Active subscriptions
            </div>
          </div>

          {/* MRR */}
          <div style={{
            background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
            padding: '2rem',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '0.5rem' }}>
              Monthly Revenue
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
              ${stats?.mrr || 0}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '0.5rem' }}>
              MRR
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Captures by Plan */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '2rem',
            borderRadius: '16px'
          }}>
            <h2 style={{ marginTop: 0 }}>Captures by Plan</h2>
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                marginBottom: '0.5rem'
              }}>
                <span>Free Tier:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {stats?.capturesByPlan?.free || 0} 
                  <span style={{ 
                    marginLeft: '1rem', 
                    color: '#4caf50',
                    fontSize: '14px'
                  }}>
                    ($0.00)
                  </span>
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px'
              }}>
                <span>Pro Tier:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {stats?.capturesByPlan?.pro || 0}
                  <span style={{ 
                    marginLeft: '1rem', 
                    color: '#ff9800',
                    fontSize: '14px'
                  }}>
                    (${((stats?.capturesByPlan?.pro || 0) * 0.00022).toFixed(4)})
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '2rem',
            borderRadius: '16px'
          }}>
            <h2 style={{ marginTop: 0 }}>Cost Breakdown</h2>
            <div style={{ marginTop: '1.5rem' }}>
              {[
                { label: 'Title Generation', cost: (stats?.capturesByPlan?.pro || 0) * 0.0001 },
                { label: 'Tag Generation', cost: (stats?.capturesByPlan?.pro || 0) * 0.0001 },
                { label: 'Embeddings', cost: (stats?.capturesByPlan?.pro || 0) * 0.00002 }
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  marginBottom: '0.5rem'
                }}>
                  <span>{item.label}:</span>
                  <span style={{ fontWeight: 'bold' }}>
                    ${item.cost.toFixed(4)}
                  </span>
                </div>
              ))}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(76, 175, 80, 0.2)',
                borderRadius: '8px',
                marginTop: '1rem',
                borderTop: '2px solid rgba(76, 175, 80, 0.5)'
              }}>
                <span style={{ fontWeight: 'bold' }}>Total:</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  ${stats?.estimatedCosts?.toFixed(4) || '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profit Analysis */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '2rem',
          borderRadius: '16px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginTop: 0 }}>💰 Profit Analysis</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '0.5rem' }}>
                Monthly Revenue
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4caf50' }}>
                ${stats?.mrr || 0}
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '0.5rem' }}>
                Monthly Costs
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff9800' }}>
                ${((stats?.estimatedCosts || 0) * (30 / parseInt(timeRange))).toFixed(2)}
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '0.5rem' }}>
                Net Profit
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196f3' }}>
                ${(stats?.mrr - ((stats?.estimatedCosts || 0) * (30 / parseInt(timeRange)))).toFixed(2)}
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '0.5rem' }}>
                Profit Margin
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9c27b0' }}>
                {stats?.mrr > 0 
                  ? ((1 - ((stats?.estimatedCosts || 0) * (30 / parseInt(timeRange)) / stats?.mrr)) * 100).toFixed(1)
                  : 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Daily Activity Chart */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '2rem',
          borderRadius: '16px'
        }}>
          <h2 style={{ marginTop: 0 }}>Daily Activity</h2>
          <div style={{
            marginTop: '2rem',
            height: '200px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '4px'
          }}>
            {stats?.dailyActivity?.map((day, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                  height: `${(day.count / Math.max(...stats.dailyActivity.map(d => d.count))) * 100}%`,
                  minHeight: '4px',
                  borderRadius: '4px 4px 0 0',
                  position: 'relative'
                }}
                title={`${day.date}: ${day.count} captures`}
              />
            ))}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
            fontSize: '12px',
            opacity: 0.7
          }}>
            <span>{stats?.dailyActivity?.[0]?.date || '-'}</span>
            <span>Today</span>
          </div>
        </div>

        {/* OpenAI Usage Alert */}
        {stats?.estimatedCosts > 10 && (
          <div style={{
            background: 'rgba(255, 152, 0, 0.1)',
            border: '2px solid #ff9800',
            padding: '1.5rem',
            borderRadius: '12px',
            marginTop: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>⚠️</span>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#ff9800' }}>
                  High OpenAI Usage Detected
                </h3>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  Your OpenAI costs are ${stats.estimatedCosts.toFixed(2)} this period. 
                  Consider setting usage alerts at platform.openai.com
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}