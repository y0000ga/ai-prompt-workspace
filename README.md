# Status Notepad Sidebar

A lightweight Chrome Side Panel extension for tracking tasks, statuses, and history notes. It supports pinning, drag-and-drop ordering, customizable status options, and timeline entries. Data is stored in `chrome.storage`.

**Great for**
- Keeping quick notes while browsing
- Tracking item status and progress (e.g., In Progress, Done, Blocked)

**Key Features**
- Side Panel note list
- Customizable status labels
- Pinned / unpinned sections
- Drag-and-drop sorting within each section
- History entries with time + description
- Manual load / save to `chrome.storage`
- Action context menu links

**Tech Stack**
- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- @dnd-kit (drag-and-drop)
- flatpickr (date/time picker)
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

3. Auto-reload the extension on build changes (requires Chrome remote debugging)

```bash
npm run watch:reload
```

Or use both together:

```bash
npm run dev:ext
```

**Load the Extension (manual)**
1. Build:

```bash
npm run build
```

2. Open Chrome -> `chrome://extensions`
3. Enable Developer mode
4. Click ��Load unpacked�� and select `dist`

**Usage**
- Click the toolbar icon to open the Side Panel
- Add items and edit titles / statuses
- Click an item to expand history, then add time + description
- Use the top-right menu to configure status options
- Use the bottom icons to manually load / save data

**Project Structure**
- `src/sidepanel`: Side Panel UI and state management
- `src/background`: Service worker (Side Panel behavior + context menu)
- `public/manifest.json`: Extension manifest
- `scripts/reload-extension.ts`: Watch `dist` and auto reload

**Customizable**
- Context menu links: `src/background/constants/contextMenus.ts`
- Auto-reload extension name: `scripts/reload-extension.ts` -> `EXTENSION_NAME`

**Scripts**
- `npm run dev`: Vite build watch
- `npm run build`: Production build
- `npm run preview`: Preview build
- `npm run lint` / `npm run lint:fix`
- `npm run format`
- `npm run watch:reload`: Watch `dist` and reload extension
- `npm run start`: Open Chrome + dev (macOS only, uses `scripts/open-chrome.sh`)

**Notes**
- `scripts/open-chrome.sh` is macOS-only. On Windows / Linux, start Chrome with `--remote-debugging-port=9222` manually.

