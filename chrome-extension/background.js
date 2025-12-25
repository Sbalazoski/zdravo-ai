chrome.runtime.onInstalled.addListener(() => {
  console.log('🦄 Zdravo AI extension installed')
  chrome.contextMenus.create({
    id: 'captureToZdravoAI',
    title: 'Capture to Zdravo AI',
    contexts: ['selection']
  })
  chrome.action.setBadgeBackgroundColor({ color: '#667eea' })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'captureToZdravoAI' && info.selectionText) {
    chrome.tabs.sendMessage(tab.id, {
      action: 'captureSelection',
      text: info.selectionText
    })
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateBadge') {
    const count = request.count
    chrome.action.setBadgeText({ text: count > 0 ? String(count) : '' })
  }
})

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'https://zdravoai.com/dashboard' })
})
