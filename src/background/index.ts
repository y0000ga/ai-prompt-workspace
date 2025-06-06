/// <reference types="chrome-types" />

chrome.action.onClicked.addListener(async () => {
  try {
    await chrome.sidePanel.setOptions({
      path: "index.html",
      enabled: true,
    });
    await chrome.sidePanel.open({});
  } catch (err) {
    console.error(err);
  }
});
