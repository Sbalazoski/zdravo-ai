'use client'

import Link from 'next/link'
import { Check, Sparkles, Zap, Shield, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'per month',
      desc: 'Essential features for AI casuals.',
      features: [
        '50 Monthly Clips',
        'Basic Keyword Search',
        'Passive Local Storage',
        'Chrome & Claude Support'
      ],
      cta: 'Start Now',
      link: '/dashboard',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      desc: 'The complete AI memory for power users.',
      features: [
        'Everything in Free',
        'Unlimited AI Clips',
        'Semantic AI Search',
        'Vector Brain Integration',
        'Priority Global Sync'
      ],
      cta: 'Unleash Power',
      link: '/dashboard',
      popular: true
    },
    {
      name: 'Team',
      price: '$29',
      period: 'per month',
      desc: 'Shared intelligence for small teams.',
      features: [
        'Everything in Pro',
        'Shared Team Library',
        'Collaboration Tools',
        'Admin Controls',
        'Priority API Support'
      ],
      cta: 'Request Access',
      link: '/dashboard',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-24">
          <Link href="/" className="inline-flex items-center gap-2 group mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Zdravo<span className="text-primary-400">.AI</span></span>
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
            Elevate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary">Intelligence</span>.
          </h1>
          <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
            Choose a plan that scales with your curiosity. From solo power users to elite teams.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`
                relative glass-card p-10 flex flex-col items-start text-left
                ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/10' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-white/50">{plan.desc}</p>
              </div>

              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                <span className="text-sm text-white/30 font-medium">/{plan.period}</span>
              </div>

              <div className="space-y-4 mb-12 flex-1 w-full">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-medium text-white/80">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Check className="w-3 h-3 text-primary-400" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href={plan.link}
                className={`
                  w-full py-4 rounded-xl font-bold transition-all text-center
                  ${plan.popular ? 'bg-primary hover:bg-primary-600 shadow-xl shadow-primary/20' : 'bg-white/5 border border-white/10 hover:bg-white/10'}
                `}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-40">
          <div className="space-y-4">
            <Zap className="text-primary-400 w-8 h-8 mb-4" />
            <h4 className="text-xl font-bold">Lightning Sync</h4>
            <p className="text-sm text-white/40 leading-relaxed">Passive capture engine works in real-time. No manual effort required.</p>
          </div>
          <div className="space-y-4">
            <Shield className="text-secondary w-8 h-8 mb-4" />
            <h4 className="text-xl font-bold">Encrypted Brain</h4>
            <p className="text-sm text-white/40 leading-relaxed">Your data is stored with bank-grade encryption. Search is private and local-first.</p>
          </div>
          <div className="space-y-4">
            <Globe className="text-primary-400 w-8 h-8 mb-4" />
            <h4 className="text-xl font-bold">Cross-Platform</h4>
            <p className="text-sm text-white/40 leading-relaxed">One soul, many bodies. Unified memory for ChatGPT, Claude, and Gemini.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
