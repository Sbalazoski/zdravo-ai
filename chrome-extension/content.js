// AI Platform Detection
const AI_PLATFORMS = {
  'chat.openai.com': {
    name: 'ChatGPT',
    color: '#10a37f',
    responseSelector: '[data-message-author-role="assistant"]',
    codeBlockSelector: 'pre code',
    observerTarget: 'main'
  },
  'claude.ai': {
    name: 'Claude',
    color: '#CC785C',
    responseSelector: '[data-testid="user-message"], [data-testid="assistant-message"]',
    codeBlockSelector: 'pre',
    observerTarget: 'main'
  },
  'gemini.google.com': {
    name: 'Gemini',
    color: '#4285f4',
    responseSelector: '.model-response-text',
    codeBlockSelector: 'pre code',
    observerTarget: 'main'
  }
}

const platform = AI_PLATFORMS[window.location.hostname]
let captureCount = 0
let isCapturing = false

function init() {
  if (!platform) return
  console.log(`🦄 Zdravo AI loaded on ${platform.name}`)
  addFloatingButton()
  addContextMenu()
  observeNewResponses()
  loadCaptureCount()
  document.addEventListener('keydown', handleKeyboardShortcut)
}

function addFloatingButton() {
  const fab = document.createElement('div')
  fab.id = 'zdravo-ai-fab'
  fab.innerHTML = `
    <div class="fab-icon">🦄</div>
    <div class="fab-count">${captureCount}</div>
  `
  fab.onclick = handleFabClick
  document.body.appendChild(fab)
  fab.title = 'Capture to Zdravo AI (Ctrl+Shift+C)'
}

function handleFabClick() {
  const selection = window.getSelection().toString().trim()
  if (selection) {
    captureContent(selection, 'selection')
  } else {
    const lastResponse = getLastAIResponse()
    if (lastResponse) {
      captureContent(lastResponse, 'auto')
    } else {
      showNotification('⚠️ Select some text first', 'warning')
    }
  }
}

function getLastAIResponse() {
  if (!platform) return null
  const responses = document.querySelectorAll(platform.responseSelector)
  const lastResponse = responses[responses.length - 1]
  return lastResponse ? (lastResponse.innerText || lastResponse.textContent) : null
}

async function captureContent(content, source) {
  if (isCapturing) return
  isCapturing = true
  showNotification('⏳ Capturing...', 'info')
  
  try {
    const metadata = analyzeContent(content)
    const data = {
      content,
      source,
      platform: platform.name,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      metadata
    }
    
    await saveToLocalStorage(data)
    await sendToServer(data)
    
    captureCount++
    updateCaptureCount()
    showNotification('✅ Captured to Zdravo AI!', 'success')
  } catch (error) {
    console.error('Capture error:', error)
    showNotification('❌ Failed to capture', 'error')
  } finally {
    isCapturing = false
  }
}

function analyzeContent(content) {
  const metadata = {
    wordCount: content.split(/\s+/).length,
    lineCount: content.split('\n').length,
    charCount: content.length,
    isCode: false,
    language: null,
    hasMarkdown: false
  }
  
  const codePatterns = [
    /function\s+\w+\s*\(/, /const\s+\w+\s*=/, /def\s+\w+\s*\(/,
    /class\s+\w+/, /import\s+\w+/, /#include/, /public\s+static/,
    /\bif\s*\(/, /\bfor\s*\(/, /=>/, /{[\s\S]+}/
  ]
  
  metadata.isCode = codePatterns.some(pattern => pattern.test(content))
  if (metadata.isCode) metadata.language = detectLanguage(content)
  metadata.hasMarkdown = /^#{1,6}\s/.test(content) || /\*\*\w+\*\*/.test(content) || /```/.test(content)
  
  return metadata
}

function detectLanguage(code) {
  const patterns = {
    javascript: [/function\s+\w+/, /const\s+\w+\s*=/, /=>/],
    python: [/def\s+\w+\(/, /import\s+\w+/, /:\s*$/m],
    java: [/public\s+class/, /System\.out/],
    cpp: [/#include\s*</, /std::/],
    php: [/<\?php/],
    go: [/func\s+\w+/, /package\s+\w+/],
    rust: [/fn\s+\w+/, /let\s+mut/],
    html: [/<html/, /<div/, /<\/\w+>/],
    css: [/{\s*\w+:\s*[^}]+}/]
  }
  
  for (const [lang, langPatterns] of Object.entries(patterns)) {
    if (langPatterns.some(p => p.test(code))) return lang
  }
  return 'text'
}

async function saveToLocalStorage(data) {
  return new Promise((resolve) => {
    chrome.storage.local.get(['clips'], (result) => {
      const clips = result.clips || []
      clips.unshift({ id: Date.now(), ...data })
      if (clips.length > 100) clips.splice(100)
      chrome.storage.local.set({ clips }, resolve)
    })
  })
}

async function sendToServer(data) {
  const API_URL = 'https://zdravoai.com/api/capture'
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`Server error: ${response.status}`)
    console.log('Synced to server')
  } catch (error) {
    console.error('Server sync failed:', error)
  }
}

function loadCaptureCount() {
  chrome.storage.local.get(['clips'], (result) => {
    captureCount = (result.clips || []).length
    updateCaptureCount()
  })
}

function updateCaptureCount() {
  const countEl = document.querySelector('.fab-count')
  if (countEl) {
    countEl.textContent = captureCount
    countEl.style.display = captureCount > 0 ? 'flex' : 'none'
  }
  chrome.runtime.sendMessage({ action: 'updateBadge', count: captureCount })
}

function showNotification(message, type = 'info') {
  const existing = document.getElementById('zdravo-ai-notification')
  if (existing) existing.remove()
  
  const notification = document.createElement('div')
  notification.id = 'zdravo-ai-notification'
  notification.className = `zdravo-ai-notification ${type}`
  notification.textContent = message
  document.body.appendChild(notification)
  
  setTimeout(() => notification.classList.add('show'), 10)
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

function addContextMenu() {
  document.addEventListener('contextmenu', (e) => {
    const selection = window.getSelection().toString().trim()
    if (selection) {
      chrome.runtime.sendMessage({ action: 'showContextMenu', selection })
    }
  })
}

function handleKeyboardShortcut(e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault()
    handleFabClick()
  }
}

function observeNewResponses() {
  if (!platform) return
  const targetNode = document.querySelector(platform.observerTarget) || document.body
  const observer = new MutationObserver(() => {})
  observer.observe(targetNode, { childList: true, subtree: true })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureNow') {
    handleFabClick()
    sendResponse({ success: true })
  }
  if (request.action === 'getLastResponse') {
    sendResponse({ content: getLastAIResponse() })
  }
})

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
