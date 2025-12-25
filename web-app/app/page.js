import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Zdravo AI
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
            Never Lose an AI Conversation Again
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capture, organize, and search AI outputs from ChatGPT, Claude, Gemini, and more. 
            Your personal AI knowledge base.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#install" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl">
              🚀 Install Chrome Extension
            </Link>
            
            <Link href="/dashboard" className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors text-lg">
              Try Dashboard
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {[
              {
                icon: '🌍',
                title: 'Universal Capture',
                description: 'Works on ChatGPT, Claude, Gemini, Copilot, and more'
              },
              {
                icon: '🤖',
                title: 'AI-Powered',
                description: 'Auto-tags and organizes your clips intelligently'
              },
              {
                icon: '🔍',
                title: 'Semantic Search',
                description: 'Find clips by meaning, not just keywords'
              },
              {
                icon: '💾',
                title: 'Never Lose Content',
                description: 'All your AI conversations in one searchable place'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Capture with one click or keyboard shortcut'
              },
              {
                icon: '📤',
                title: 'Export Anywhere',
                description: 'Download as files, push to GitHub, or export to tools'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 mt-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Install the extension and start capturing in seconds
          </p>
          <Link href="#install" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg shadow-xl">
            Install Free Extension
          </Link>
        </div>
      </section>
    </div>
  )
}
