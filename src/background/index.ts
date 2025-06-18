import { ContextMenusOptions, OutsideUrl } from "@/background/constants/contextMenus";
import { ContextType } from "@/background/types/chrome";
import { ContextMenuId } from "@/background/types/contextMenus";

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: "index.html",
      enabled: true,
    });
  } catch (err) {
    console.error("Failed to open side panel:", err);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  for (const item of ContextMenusOptions) {
    chrome.contextMenus.create({
      ...item,
      contexts: [ContextType.actions],
    });
  }

  chrome.contextMenus.onClicked.addListener((info) => {
    const menuItemId = info.menuItemId as ContextMenuId;

    if ([ContextMenuId.chromeExtension, ContextMenuId.visitGithub].includes(menuItemId)) {
      chrome.tabs.create({ url: OutsideUrl[info.menuItemId] });
    }
  });
});
