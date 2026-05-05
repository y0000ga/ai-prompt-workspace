import { ContextMenusOptions, OutsideUrl } from "@/background/constants/contextMenus";
import { ChromeStorage, ContextType, MenuID } from "@/background/types/chrome";
import { ContextMenuId } from "@/background/types/contextMenus";
import { IPrompt, Site } from "./types/common";

chrome.runtime.onStartup.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: "side_panel.html",
      enabled: true,
    });
  } catch (err) {
    console.error("Failed to open side panel:", err);
  }
});

chrome.contextMenus.onClicked.addListener((info) => {
  const menuItemId = info.menuItemId as ContextMenuId;
  if ([ContextMenuId.chromeExtension, ContextMenuId.visitGithub].includes(menuItemId)) {
    chrome.tabs.create({ url: OutsideUrl[info.menuItemId] });
  }
});

function getSiteName(url?: string) {
  if (!url) return Site.Custom;

  try {
    const hostname = new URL(url).hostname;

    if (hostname.includes("chatgpt.com") || hostname.includes("openai.com")) {
      return Site.ChatGPT;
    }
    if (hostname.includes("claude.ai")) {
      return Site.Claude;
    }
    if (hostname.includes("gemini.google.com")) {
      return Site.Gemini;
    }

    return Site.Custom;
  } catch {
    return Site.Custom;
  }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MenuID.addPrompt) return;

  const selectionText = info.selectionText?.trim();
  if (!selectionText) return;

  try {
    const result = await chrome.storage.local.get([ChromeStorage.Prompt]);
    const currentList: IPrompt[] =
      result && result[ChromeStorage.Prompt] ? JSON.parse(result[ChromeStorage.Prompt]) : [];

    const nextItem: IPrompt = {
      id: crypto.randomUUID(),
      tags: [],
      content: selectionText,
      createdAt: Date.now(),
      sourceUrl: info.pageUrl || tab?.url || '',
      site: getSiteName(info.pageUrl || tab?.url),
      isPinned: false,
      lastUsedAt: Date.now(),
      isTemplate: false
    };

    await chrome.storage.local.set({
      [ChromeStorage.Prompt]: JSON.stringify([nextItem, ...currentList]),
    });
  } catch (error) {
    console.error("Add Prompt failed:", error);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  for (const item of ContextMenusOptions) {
    chrome.contextMenus.create({
      ...item,
      contexts: [ContextType.actions],
    });
  }

  chrome.contextMenus.create({
    id: MenuID.addPrompt,
    title: "Add Prompt",
    contexts: ["selection"],
  });

   chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
