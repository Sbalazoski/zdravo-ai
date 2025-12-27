/**
 * Zdravo AI - Popup Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  updateStats()
  detectPlatform()

  document.getElementById('captureBtn').onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'captureNow' })
        window.close()
      }
    })
  }

  document.getElementById('dashboardBtn').onclick = () => {
    chrome.tabs.create({ url: 'http://localhost:3000/dashboard' })
  }
})

function updateStats() {
  chrome.storage.local.get(['clips'], (result) => {
    const clips = result.clips || []
    document.getElementById('clipCount').innerText = clips.length

    // Count this week
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const weekClips = clips.filter(c => c.id > weekAgo)
    document.getElementById('weekCount').innerText = weekClips.length
  })
}

function detectPlatform() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return
    const url = new URL(tabs[0].url)
    const host = url.hostname

    const platformEl = document.getElementById('platform')
    if (host.includes('chatgpt.com') || host.includes('chat.openai.com')) {
      platformEl.innerText = 'ChatGPT'
    } else if (host.includes('claude.ai')) {
      platformEl.innerText = 'Claude'
    } else if (host.includes('gemini.google.com')) {
      platformEl.innerText = 'Gemini'
    } else {
      platformEl.innerText = 'Unsupported'
      platformEl.style.opacity = '0.5'
    }
  })
}
