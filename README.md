# AI Prompt Workspace

A lightweight Chrome Side Panel extension for collecting, organizing, and reusing AI prompts. Prompts are saved to `chrome.storage` and can be tagged, filtered, pinned, and exported.

**Great For**
- Saving useful prompts while browsing
- Organizing prompt snippets by tags and sources
- Quick reuse with copy and pin actions

**Key Features**
- Side Panel prompt list
- Tag creation and filtering
- Source filtering (ChatGPT / Claude / Gemini / custom)
- Sort by pinned, created time, content, or source
- Pin and template toggles
- Copy prompt content and track last used time
- Export filtered prompts to Markdown
- Context menu: add prompt from selected text

**Tech Stack**
- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- dayjs (time utilities)

**Requirements**
- Chrome with Side Panel API support (recommended 114+)
- Node.js 18+

**Quick Start**
1. Install dependencies

```bash
npm install
```

2. Development build (watch to `dist`)

```bash
npm run dev
```

**Load The Extension (manual)**
1. Build:

```bash
npm run build
```

2. Open Chrome -> `chrome://extensions`
3. Enable Developer mode
4. Click "Load unpacked" and select `dist`

**Usage**
- Click the toolbar icon to open the Side Panel
- Use the browser selection context menu "Add Prompt" to save text
- Filter by tags and sources, or search by content
- Use the action buttons to copy, pin, or delete
- Export the current filtered list to Markdown

**Project Structure**
- `src/sidepanel`: Side Panel UI and state management
- `src/background`: Service worker (Side Panel behavior + context menu)
- `public/manifest.json`: Extension manifest
- `side_panel.html`: Side panel entry

**Customizable**
- Context menu links: `src/background/constants/contextMenus.ts`

**Scripts**
- `npm run dev` / `npm run dev:start`: Vite build watch
- `npm run watch`: Vite build watch
- `npm run build`: Production build
- `npm run preview`: Preview build
- `npm run lint` / `npm run lint:fix`
- `npm run format`
