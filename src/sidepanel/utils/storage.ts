import { ChromeStorage } from "../types/common";

export const loadStorage = async (key: ChromeStorage) => {
  try {
    const res = await chrome?.storage?.local?.get([key]);
    if (!res) {
      throw new Error("No load");
    }
    return res[key] as string;
  } catch (error) {
    console.error("There is load Note Error: " + error);
    return null;
  }
};

export const saveStorage = async ({ key, value }: { key: ChromeStorage; value: string }) => {
  try {
    await chrome?.storage?.local?.set({ [key]: value });
    return true;
  } catch (error) {
    console.error("There is save Note Error: " + error);
    return false;
  }
};

export const watchStorage = <T>(key: ChromeStorage, callback: (value: T | null) => void) => {
  const listener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
    if (areaName !== "local") return;
    if (!changes[key]) return;

    callback((changes[key].newValue as T) ?? null);
  };

  chrome.storage.onChanged.addListener(listener);

  return () => {
    chrome.storage.onChanged.removeListener(listener);
  };
};
