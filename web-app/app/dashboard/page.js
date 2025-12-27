'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Trash2,
  Copy,
  Download,
  ExternalLink,
  Database,
  Code,
  FileText,
  LayoutDashboard,
  Library,
  Settings,
  CreditCard,
  Plus,
  Sparkles,
  Check,
  ChevronRight
} from 'lucide-react'

const PLATFORM_ICONS = {
  chatgpt: <div className="w-6 h-6 bg-[#10a37f] rounded-md flex items-center justify-center text-white text-[10px] font-bold">GPT</div>,
  claude: <div className="w-6 h-6 bg-[#d97757] rounded-md flex items-center justify-center text-white text-[10px] font-bold">CL</div>,
  gemini: <div className="w-6 h-6 bg-[#4285f4] rounded-md flex items-center justify-center text-white text-[10px] font-bold">GM</div>,
  copilot: <div className="w-6 h-6 bg-[#0078d4] rounded-md flex items-center justify-center text-white text-[10px] font-bold">CP</div>,
  default: <Database className="w-5 h-5 text-white/40" />
}

export default function Dashboard() {
  const [clips, setClips] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [stats, setStats] = useState({ total: 0, thisWeek: 0 })
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    loadClips()
  }, [filter])

  const loadClips = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/clips?userId=1&filter=${encodeURIComponent(filter)}`)
      const data = await response.json()
      setClips(data.clips || [])

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

  const deleteClip = async (id) => {
    if (!confirm('Permanently delete this clip?')) return
    try {
      await fetch(`/api/clips?id=${id}&userId=1`, { method: 'DELETE' })
      loadClips()
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const copyToClipboard = (content, id) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadClip = (clip) => {
    const ext = clip.is_code ? (clip.language || 'txt') : 'txt'
    const blob = new Blob([clip.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zdravo-clip-${clip.id}.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen bg-background font-sans text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-surface/50 backdrop-blur-3xl p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Zdravo<span className="text-primary-400">.AI</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarLink icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />
          <SidebarLink icon={<Library className="w-4 h-4" />} label="Library" />
          <SidebarLink icon={<Code className="w-4 h-4" />} label="Prompt Library" badge="New" />
          <div className="pt-6 pb-2 text-xs font-semibold text-white/30 uppercase tracking-wider">Storage</div>
          <SidebarLink icon={<Database className="w-4 h-4" />} label="Recent Clips" />
          <SidebarLink icon={<Trash2 className="w-4 h-4" />} label="Trash" />
        </nav>

        <div className="space-y-4">
          <div className="glass-card p-4 bg-primary/10 border-primary/20">
            <h4 className="text-sm font-bold mb-1">Unleash AI Pro</h4>
            <p className="text-xs text-white/60 mb-3">Get semantic search and unlimited clips.</p>
            <button className="w-full py-2 bg-primary hover:bg-primary-600 rounded-lg text-xs font-bold transition-all shadow-lg shadow-primary/20">
              Upgrade Now
            </button>
          </div>
          <SidebarLink icon={<Settings className="w-4 h-4" />} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-surface/20 backdrop-blur-xl">
          <div className="flex items-center gap-4 flex-1 max-w-2xl px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus-within:border-primary/50 transition-all">
            <Search className="w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Deep search your collective memory..."
              className="bg-transparent border-none outline-none flex-1 text-sm placeholder:text-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="flex gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-white/40 font-sans">CMD</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-white/40 font-sans">K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-8">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-bold">Trial Account</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">{stats.total}/50 Clips used</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary p-[1px]">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-bold text-xs">ZK</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0F0F16]/50">
          <div className="max-w-7xl mx-auto">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
              <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
                <FilterButton label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
                <FilterButton label="Code" icon={<Code className="w-3.5 h-3.5" />} active={filter === 'code'} onClick={() => setFilter('code')} />
                <FilterButton label="Text" icon={<FileText className="w-3.5 h-3.5" />} active={filter === 'text'} onClick={() => setFilter('text')} />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-white/30">{stats.thisWeek} captures this week</span>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Manually
                </button>
              </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-40 animate-pulse">
                  <div className="w-12 h-12 bg-primary/20 rounded-full mb-4" />
                  <div className="h-4 w-32 bg-white/5 rounded-full" />
                </div>
              ) : clips.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-40 text-center"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10">
                    <Database className="w-10 h-10 text-white/20" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">No intelligence found</h2>
                  <p className="text-white/40 max-w-sm mb-8">
                    Your memory is currently empty. Start capturing from ChatGPT, Claude, or Gemini to see your data live.
                  </p>
                  <button className="glass-button flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Install Extension
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {clips.map((clip, i) => (
                    <ClipCard
                      key={clip.id}
                      clip={clip}
                      index={i}
                      isCopied={copiedId === clip.id}
                      onCopy={() => copyToClipboard(clip.content, clip.id)}
                      onDelete={() => deleteClip(clip.id)}
                      onDownload={() => downloadClip(clip)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarLink({ icon, label, active = false, badge }) {
  return (
    <div className={`
      flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer group
      ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}
    `}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="px-1.5 py-0.5 rounded bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider">
          {badge}
        </span>
      )}
      {!badge && !active && (
        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}

function FilterButton({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
        ${active ? 'bg-white/10 text-white shadow-inner' : 'text-white/40 hover:text-white/60'}
      `}
    >
      {icon}
      {label}
    </button>
  )
}

function ClipCard({ clip, index, isCopied, onCopy, onDelete, onDownload }) {
  const platform = (clip.platform || 'default').toLowerCase()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card group flex flex-col min-h-[320px]"
    >
      {/* Card Header */}
      <div className="p-6 pb-0 flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {PLATFORM_ICONS[platform] || PLATFORM_ICONS.default}
          <div className="min-w-0">
            <h3 className="text-base font-bold truncate leading-tight group-hover:text-primary-400 transition-colors">
              {clip.title || 'Untitled Sync'}
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">
              <span>{new Date(clip.created_at).toLocaleDateString()}</span>
              {clip.language && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-primary-400">{clip.language}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onDelete} className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 flex-1 flex flex-col">
        <div className="relative flex-1 bg-black/20 rounded-xl border border-white/5 p-4 overflow-hidden mb-4 group/inner">
          <pre className="text-xs text-white/60 leading-relaxed font-mono whitespace-pre-wrap break-words max-h-[160px] overflow-hidden mask-fade-bottom">
            {clip.content}
          </pre>
          <div className="absolute inset-0 bg-gradient-to-t from-[#181823]/80 to-transparent group-hover/inner:opacity-0 transition-opacity pointer-events-none" />

          {/* Overlay Buttons */}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/inner:opacity-100 transition-all transform translate-y-1 group-hover/inner:translate-y-0">
            <button
              onClick={onCopy}
              className="p-2 bg-background/80 blur-sm rounded-lg hover:bg-primary transition-colors text-white shadow-xl"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Tags */}
        {clip.tags && clip.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {clip.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-white/40 font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 pt-0 mt-auto border-t border-white/5 flex items-center justify-between">
        <a
          href={clip.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-white/30 hover:text-white flex items-center gap-1 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Source Link
        </a>
        <div className="flex gap-2">
          <button onClick={onDownload} className="text-[10px] font-bold text-white/60 hover:text-white uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">
            <Download className="w-3 h-3" />
            Store
          </button>
        </div>
      </div>
    </motion.div>
  )
}