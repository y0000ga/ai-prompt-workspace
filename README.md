# AI Prompt Workspace

一個給 Chrome Side Panel 使用的 AI Prompt 管理工具。
你可以在瀏覽時快速收集 prompt、用標籤與來源整理內容、進行搜尋篩選，並支援編輯、批次操作、匯入/備份與 Markdown 匯出。

## 特色

- Side Panel 介面，適合快速瀏覽與操作
- Prompt 新增與編輯表單
- 支援標籤管理與標籤篩選
- 支援來源篩選
- 可依不同條件排序
- 可釘選 prompt
- 可標記為 template
- 可複製 prompt 內容
- 可追蹤最後使用時間
- 支援多選批次操作
  - 釘選 / 取消釘選
  - Template / Un-template
  - 匯出選取項目 JSON
  - 刪除選取項目
- 支援整包備份匯出
- 支援 Markdown 匯出
- 支援 JSON 匯入
- 支援從選取文字的 context menu 新增 prompt

## 畫面與流程

### 1. 收集 prompt

- 透過 Side Panel 內建表單新增 prompt
- 或從瀏覽器選取文字後，透過右鍵選單快速加入

### 2. 整理與搜尋

- 用搜尋框搜尋 `content`、`site`、`sourceUrl` 或 `tags`
- 用標籤和來源快速過濾
- 用排序功能調整清單呈現

### 3. 編輯與批次處理

- 直接編輯既有 prompt
- 勾選多筆後進行批次操作
- 適合大量整理與匯出

### 4. 備份與匯出

- 可匯出全部 prompt 為 JSON 備份
- 可匯出選取項目為 JSON
- 可匯出全部 prompt 為 Markdown
- 可匯入 JSON 檔案

## 技術棧

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4

## 專案結構

- `src/sidepanel`
  - Side Panel UI、context、hooks、utils
- `src/background`
  - service worker、context menu 與 Side Panel 行為
- `public/manifest.json`
  - Chrome Extension manifest
- `side_panel.html`
  - Side Panel 入口頁

## 主要資料夾說明

- `src/sidepanel/components`
  - `PromptWorkspace`：主工作區，負責列表、表單、批次操作與匯入匯出
  - `PromptFilterBar`：搜尋、標籤、來源與排序
  - `PromptCard`：單筆 prompt 卡片
- `src/sidepanel/context`
  - `prompt`：prompt 資料與 storage 同步
  - `tag`：標籤資料
  - `promptFilter`：搜尋與篩選狀態
- `src/sidepanel/hooks`
  - `useChromeStorage`：chrome storage 同步
  - `usePromptFilters`：prompt 篩選與排序
- `src/sidepanel/utils`
  - 匯入匯出與 storage 工具

## 開發需求

- Chrome 瀏覽器，需支援 Side Panel API
- Node.js 18 以上

## 快速開始

1. 安裝依賴

```bash
npm install
```

2. 啟動開發模式

```bash
npm run dev:start
```

3. 開啟側欄頁面

- 開發環境通常會使用 `http://localhost:5173/side_panel.html`
- 也可以從 Chrome 擴充功能載入後直接打開 Side Panel

## 打包與載入

1. 建置專案

```bash
npm run build
```

2. 開啟 Chrome
3. 前往 `chrome://extensions`
4. 開啟「開發人員模式」
5. 點選「載入未封裝項目」
6. 選擇 `dist`

## 使用方式

- 點擊瀏覽器工具列圖示打開 Side Panel
- 使用上方 `Actions` 收合區新增、匯入、備份與匯出
- 使用搜尋、標籤與來源進行篩選
- 點擊卡片上的編輯、複製、刪除、釘選與 template 按鈕
- 勾選多筆後可進行批次操作
- 透過右鍵選單把選取文字轉成 prompt

## Scripts

- `npm run dev`
- `npm run dev:start`
- `npm run watch`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run lint:fix`
- `npm run format`

## 可自訂項目

- 右鍵選單項目：`src/background/constants/contextMenus.ts`
- Prompt 顯示與操作：`src/sidepanel/components/PromptWorkspace.tsx`
- 篩選條件與排序：`src/sidepanel/hooks/usePromptFilters.ts`

## 備註

- Prompt 資料會儲存在 `chrome.storage`
- 匯入 JSON 時會盡量避免重複內容
- `Recently Used` 排序是以最近使用的 prompt 優先
