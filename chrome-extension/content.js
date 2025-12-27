/**
 * Zdravo AI - Passive Capture Engine
 */

const PLATFORM_CONFIG = {
  'chatgpt.com': { name: 'ChatGPT', response: '[data-message-author-role="assistant"]' },
  'chat.openai.com': { name: 'ChatGPT', response: '[data-message-author-role="assistant"]' },
  'claude.ai': { name: 'Claude', response: '.font-claude-message' },
  'gemini.google.com': { name: 'Gemini', response: 'model-response' }
}

let currentPlatform = null
let captureCount = 0
let lastCapturedContent = ""

function init() {
  const host = window.location.hostname
  currentPlatform = PLATFORM_CONFIG[host]

  if (!currentPlatform) {
    if (host.includes('chatgpt')) currentPlatform = PLATFORM_CONFIG['chatgpt.com']
  }

  if (currentPlatform) {
    console.log(`%c🦄 Zdravo AI: Monitoring ${currentPlatform.name}`, "color: #8B5CF6; font-weight: bold; font-size: 12px;")
    injectUI()
    setupObservers()
    loadStats()
  }
}

function injectUI() {
  const fab = document.createElement('div')
  fab.id = 'zdravo-ai-fab'
  fab.innerHTML = `<span class="fab-icon">🦄</span><div class="fab-count">0</div>`
  fab.onclick = () => captureLatest()
  document.body.appendChild(fab)

  const notifyContainer = document.createElement('div')
  notifyContainer.id = 'zdravo-ai-notification'
  notifyContainer.className = 'zdravo-ai-notification'
  notifyContainer.innerHTML = `<div class="notification-badge"></div><span class="notification-text"></span>`
  document.body.appendChild(notifyContainer)
}

function setupObservers() {
  const observer = new MutationObserver(() => {
    checkForNewResponses()
    injectCodeButtons()
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

function checkForNewResponses() {
  const responses = document.querySelectorAll(currentPlatform.response)
  if (responses.length === 0) return

  const lastResponse = responses[responses.length - 1]
  const content = lastResponse.innerText.trim()

  if (content.length > 50 && content !== lastCapturedContent && !isTyping(lastResponse)) {
    setTimeout(() => {
      const finalContent = lastResponse.innerText.trim()
      if (finalContent === content) {
        syncContent(finalContent, 'passive')
      }
    }, 2000)
  }
}

function isTyping(el) {
  return el.querySelector('.result-streaming') || el.innerText.endsWith('●') || el.classList.contains('typing')
}

function injectCodeButtons() {
  const codeBlocks = document.querySelectorAll('pre')
  codeBlocks.forEach(block => {
    if (block.querySelector('.zdravo-code-action')) return

    const btn = document.createElement('button')
    btn.className = 'zdravo-code-action'
    btn.innerHTML = `<span>🦄</span> Save to Zdravo`
    btn.onclick = (e) => {
      e.stopPropagation()
      syncContent(block.innerText, 'code-button')
    }

    block.style.position = 'relative'
    block.appendChild(btn)
  })
}

async function captureLatest() {
  const selection = window.getSelection().toString().trim()
  if (selection) {
    syncContent(selection, 'manual-selection')
    return
  }

  const responses = document.querySelectorAll(currentPlatform.response)
  if (responses.length > 0) {
    syncContent(responses[responses.length - 1].innerText, 'manual-fab')
  } else {
    showNotify('No content found to capture', 'error')
  }
}

async function syncContent(content, source) {
  if (content === lastCapturedContent) return
  lastCapturedContent = content

  const data = {
    content,
    platform: currentPlatform.name,
    url: window.location.href,
    metadata: {
      source,
      isCode: source === 'code-button' || content.includes('```'),
      capturedAt: new Date().toISOString()
    }
  }

  try {
    chrome.storage.local.get(['clips'], (result) => {
      const clips = result.clips || []
      clips.unshift({ ...data, id: Date.now() })
      chrome.storage.local.set({ clips: clips.slice(0, 100) })
      updateCount(clips.length + 1)
    })

    const API_URL = 'http://localhost:3000/api/capture'
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(e => console.warn("Zdravo: Sync delayed", e))

    showNotify('Saved to your AI Memory', 'success')
  } catch (err) {
    console.error("Zdravo Sync Error:", err)
    showNotify('Sync failed', 'error')
  }
}

function showNotify(msg, type = 'success') {
  const el = document.getElementById('zdravo-ai-notification')
  if (!el) return
  el.className = `zdravo-ai-notification show ${type}`
  el.querySelector('.notification-text').innerText = msg

  setTimeout(() => {
    el.classList.remove('show')
  }, 3000)
}

function updateCount(count) {
  const el = document.querySelector('.fab-count')
  if (el) {
    el.innerText = count
    el.style.display = count > 0 ? 'flex' : 'none'
  }
}

function loadStats() {
  chrome.storage.local.get(['clips'], (result) => {
    updateCount((result.clips || []).length)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
