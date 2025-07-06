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
        console.info(loadedValue)
        setValue(loadedValue ? JSON.parse(loadedValue) : defaultValue);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [defaultValue, key]);

  const handleSaveStorage = useCallback(
    async (updatedValue: unknown[]) => {
      try {
        setIsSaving(true);
        await saveStorage({ key, value: JSON.stringify(updatedValue) });
      } catch (error) {
      } finally {
        setIsSaving(false);
      }
    },
    [key]
  );

  const handleLoadStorage = useCallback(async () => {
    try {
      setIsLoading(true);
      const loadedValue = await loadStorage(key);
      if (loadedValue) {
        setValue(JSON.parse(loadedValue));
      }
    } catch (error) {
      console.error(error);
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
