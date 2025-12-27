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
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Link href="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '2rem'
          }}>
            Zdravo AI
          </Link>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8' }}>
            Start free. Upgrade when you need more power.
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem'
        }}>
          {plans.map((plan, index) => (
            <div key={index} style={{
              background: plan.popular ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.05)',
              border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1rem',
              padding: '2rem',
              position: 'relative'
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#fbbf24',
                  color: '#000',
                  padding: '0.25rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  ⭐ MOST POPULAR
                </div>
              )}

              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {plan.name}
              </h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: '1rem', color: plan.popular ? 'rgba(255,255,255,0.8)' : '#94a3b8' }}>
                  /{plan.period}
                </span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: '#4ade80' }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <li key={`lim-${i}`} style={{ padding: '0.5rem 0', display: 'flex', gap: '0.5rem', opacity: 0.5 }}>
                    <span>✗</span>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.link} style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.75rem',
                background: plan.popular ? 'white' : 'rgba(102, 126, 234, 0.2)',
                color: plan.popular ? '#667eea' : 'white',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                borderRadius: '0.5rem'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {faq.q}
                </h3>
                <p style={{ color: '#94a3b8' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}