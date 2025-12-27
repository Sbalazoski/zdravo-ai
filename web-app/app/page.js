'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Zap, Database, Share2, Sparkles, Chrome } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Database className="w-6 h-6 text-primary-400" />,
      title: 'Universal AI Memory',
      desc: 'Automatically capture conversations from ChatGPT, Claude, Gemini, and Copilot without lifting a finger.'
    },
    {
      icon: <Search className="w-6 h-6 text-primary-400" />,
      title: 'Global Search',
      desc: 'Find that one specific code snippet or insight across all your AI history with lightning-fast semantic search.'
    },
    {
      icon: <Zap className="w-6 h-6 text-primary-400" />,
      title: 'Real-time Sync',
      desc: 'Your data is instantly available across your devices, organized and ready for action.'
    },
    {
      icon: <Share2 className="w-6 h-6 text-primary-400" />,
      title: 'Team Brain',
      desc: 'Share valuable AI insights and prompts with your team to multiply collective intelligence.'
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/20 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] -z-10" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Zdravo<span className="text-primary-400">.AI</span></span>
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/pricing" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Pricing</Link>
            <Link href="/dashboard" className="glass-button">
              Go to Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-400 text-sm font-medium mb-8"
          >
            <Chrome className="w-4 h-4" />
            The Ultimate Extension for AI Power Users
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]"
          >
            Your AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary">Universal Memory</span> Layer.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
          >
            Zdravo captures your conversations across ChatGPT, Claude, and Gemini silently in the background. Stop losing insights and start building your centralized AI knowledge base.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-lg shadow-2xl shadow-primary-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
              <Chrome className="w-6 h-6" />
              Add to Chrome — It's Free
            </button>
            <Link href="/dashboard" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-lg backdrop-blur-xl transition-all">
              Launch Dashboard
            </Link>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32 w-full">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 text-left"
              >
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary-400 w-5 h-5" />
            <span className="font-bold">Zdravo.AI</span>
          </div>
          <p className="text-white/30 text-sm">
            © 2025 Zdravo AI. Built for the future of intelligence.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/30 hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="text-white/30 hover:text-white transition-colors">Discord</Link>
            <Link href="#" className="text-white/30 hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
