Zdravo AI

Capture, organize, and search AI outputs from anywhere.

## Project Structure

```
zdravo-ai/
├── chrome-extension/     # Chrome extension
│   ├── manifest.json
│   ├── content.js
│   ├── background.js
│   ├── popup.html
│   ├── popup.js
│   └── styles.css
│
└── web-app/             # Next.js web app
    ├── app/
    ├── components/
    ├── lib/
    └── package.json
```

## Quick Start

### Chrome Extension
1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `chrome-extension` folder
5. Test on chat.openai.com

### Web App
1. `cd web-app`
2. `npm install`
3. Copy `.env.local.template` to `.env.local`
4. Add your API keys
5. `npm run dev`
6. Open http://localhost:3000

