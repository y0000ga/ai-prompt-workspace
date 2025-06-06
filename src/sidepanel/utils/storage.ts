import { ChromeStorage, IChromeStorage } from "../types/common";

export const loadStorage = async (key: ChromeStorage) => {
  try {
    const res = await chrome?.storage?.local?.get<IChromeStorage>([key]);
    return res[key];
  } catch (error) {
    console.log("There is load Note Error: " + error);
    return "";
  }
};

export const saveStorage = async ({ key, value }: { key: ChromeStorage; value: string }) => {
  try {
    await chrome?.storage?.local?.set({ [key]: value });
    return true;
  } catch (error) {
    console.log("There is save Note Error: " + error);
    return false;
  }
};
