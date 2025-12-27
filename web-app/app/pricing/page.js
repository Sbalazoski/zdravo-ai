import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '50 clips per month',
        'Basic keyword search',
        'Chrome extension',
        'Works on all AI platforms',
        'Export as files'
      ],
      limitations: [
        'No AI auto-tagging',
        'No semantic search',
        'No unlimited clips'
      ],
      cta: 'Get Started',
      link: '/dashboard',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      features: [
        'Unlimited clips',
        'AI-powered auto-tagging',
        'Semantic search',
        'Priority support',
        'Export to GitHub/Notion',
        'Advanced filters',
        'API access'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      link: '/checkout?plan=pro',
      popular: true
    },
    {
      name: 'Team',
      price: '$29',
      period: 'per month',
      features: [
        'Everything in Pro',
        'Team workspaces',
        'Shared collections',
        'Admin dashboard',
        'SSO authentication',
        'Priority support',
        'Custom integrations'
      ],
      limitations: [],
      cta: 'Contact Sales',
      link: '/contact',
      popular: false
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '4rem' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{ 
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <img 
                src="/logo-white.png" 
                alt="Zdravo AI" 
                style={{ height: '48px' }}
              />
              <span style={{ fontSize: '32px', fontWeight: 'bold' }}>Zdravo AI</span>
            </div>
          </Link>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Start free. Upgrade when you need more power.
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {plans.map(plan => (
            <div
              key={plan.name}
              style={{
                background: plan.popular 
                  ? 'white'
                  : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: plan.popular 
                  ? '3px solid #ffd700'
                  : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '24px',
                padding: '2rem',
                position: 'relative',
                color: plan.popular ? '#333' : 'white'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#ffd700',
                  color: '#333',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  ✨ MOST POPULAR
                </div>
              )}

              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {plan.name}
              </h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: '1rem', opacity: 0.7 }}>
                  /{plan.period}
                </span>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '2rem'
              }}>
                {plan.features.map(feature => (
                  <li key={feature} style={{
                    padding: '0.75rem 0',
                    borderBottom: `1px solid ${plan.popular ? '#eee' : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: '#4caf50' }}>✓</span>
                    {feature}
                  </li>
                ))}
                {plan.limitations.map(limitation => (
                  <li key={limitation} style={{
                    padding: '0.75rem 0',
                    borderBottom: `1px solid ${plan.popular ? '#eee' : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: 0.5
                  }}>
                    <span>✗</span>
                    {limitation}
                  </li>
                ))}
              </ul>

              <Link href={plan.link}>
                <button style={{
                  width: '100%',
                  padding: '14px',
                  background: plan.popular 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255,255,255,0.2)',
                  border: plan.popular ? 'none' : '2px solid white',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '3rem',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          
          {[
            {
              q: 'Can I try Pro for free?',
              a: 'Yes! We offer a 14-day free trial of Pro. No credit card required.'
            },
            {
              q: 'What happens if I exceed my limits on the Free plan?',
              a: 'Your existing clips remain accessible. You\'ll be prompted to upgrade to continue capturing.'
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Absolutely. Cancel anytime from your dashboard. No questions asked.'
            },
            {
              q: 'Do you offer refunds?',
              a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.'
            }
          ].map((faq, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{faq.q}</h3>
              <p style={{ opacity: 0.9, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
