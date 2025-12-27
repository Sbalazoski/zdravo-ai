```javascript
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
    
      
        {/* Header */}
        
          
            
              🦄 Zdravo AI
            
          
          
            Simple, Transparent Pricing
          
          
            Start free. Upgrade when you need more power.
          
        

        {/* Pricing Cards */}
        
          {plans.map(plan => (
            
              {plan.popular && (
                
                  ⭐ MOST POPULAR
                
              )}

              
                {plan.name}
              
              
              
                
                  {plan.price}
                
                
                  /{plan.period}
                
              

              
                {plan.features.map(feature => (
                  
                    ✓
                    {feature}
                  
                ))}
                {plan.limitations.map(limitation => (
                  
                    ✗
                    {limitation}
                  
                ))}
              

              
                
                  {plan.cta}
                
              
            
          ))}
        

        {/* FAQ */}
        
          
            Frequently Asked Questions
          
          
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
            
              {faq.q}
              {faq.a}
            
          ))}
        
      
    
  )
}
```