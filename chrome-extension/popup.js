chrome.storage.local.get(['clips'], (result) => {
  const clips = result.clips || []
  document.getElementById('clipCount').textContent = clips.length
  const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
  const weekCount = clips.filter(c => new Date(c.timestamp).getTime() > oneWeekAgo).length
  document.getElementById('weekCount').textContent = weekCount
})

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const hostname = new URL(tabs[0].url).hostname
  const platforms = {
    'chat.openai.com': 'ChatGPT',
    'claude.ai': 'Claude',
    'gemini.google.com': 'Gemini',
    'copilot.microsoft.com': 'Copilot'
  }
  document.getElementById('platform').textContent = platforms[hostname] || 'Not Detected'
})

document.getElementById('captureBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'captureNow' })
    window.close()
  })
})

document.getElementById('dashboardBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://zdravoai.com/dashboard' })
})

document.getElementById('settingsBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://zdravoai.com/settings' })
})
