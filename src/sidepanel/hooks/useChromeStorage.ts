import { useCallback, useEffect, useState } from "react";

import { ChromeStorage } from "@/sidepanel/types/common";
import { loadStorage, saveStorage } from "@utils/storage";

const useChromeStorage = <T>({ defaultValue, key }: { defaultValue: T; key: ChromeStorage }) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const loadedValue = await loadStorage(key);
        setValue(loadedValue ? JSON.parse(loadedValue) : defaultValue);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [defaultValue, key]);

  const handleSaveStorage = useCallback(async () => {
    try {
      setIsSaving(true);
      await saveStorage({ key, value: JSON.stringify(value) });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  }, [key, value]);

  const handleLoadStorage = useCallback(async () => {
    try {
      setIsLoading(true);
      const loadedValue = await loadStorage(key);
      if (loadedValue) {
        setValue(JSON.parse(loadedValue));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  return {
    value,
    handleSaveStorage,
    handleLoadStorage,
    isLoading,
    setValue,
    isSaving,
  };
};

export default useChromeStorage;
