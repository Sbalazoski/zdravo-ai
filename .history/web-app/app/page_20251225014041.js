```javascript
import Link from 'next/link'

export default function Home() {
  return (
    
      {/* Header */}
      
        
          🦄 Zdravo AI
        
        
          
            
              Pricing
            
          
          
            
              Dashboard
            
          
        
      

      {/* Hero */}
      
        
          Never Lose an AI Conversation Again
        
        
        
          Capture, organize, and search AI outputs from ChatGPT, Claude, Gemini, and more. 
          Your personal AI knowledge base.
        

        
          
            
              🚀 Install Chrome Extension
            
          
          
          
            
              Try Dashboard
            
          
        

        {/* Features */}
        
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
            
              
                {feature.icon}
              
              
                {feature.title}
              
              
                {feature.description}
              
            
          ))}
        
      

      {/* CTA */}
      
        
          Ready to get started?
        
        
          Install the extension and start capturing in seconds
        
        
          Install Free Extension
        
      
    
  )
}
```