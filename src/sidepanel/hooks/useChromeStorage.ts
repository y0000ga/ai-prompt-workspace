import { useCallback, useEffect, useRef, useState } from "react";

import { ChromeStorage } from "@/sidepanel/types/common";
import { loadStorage, saveStorage, watchStorage } from "@utils/storage";

const useChromeStorage = <T>({ defaultValue, key }: { defaultValue: T; key: ChromeStorage }) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const serializedRef = useRef<string>("");
  const valueRef = useRef<T>(defaultValue);
  const defaultRef = useRef<T>(defaultValue);

  const safeStringify = (input: T) => {
    try {
      return JSON.stringify(input);
    } catch {
      return "";
    }
  };

  useEffect(() => {
    valueRef.current = value;
    serializedRef.current = safeStringify(value);
  }, [value]);

  defaultRef.current = defaultValue;

  useEffect(() => {
    let unwatch: (() => void) | undefined;
    let isMounted = true;

    const parse = (raw: string | null) => {
      try {
        return raw ? JSON.parse(raw) : defaultRef.current;
      } catch {
        return defaultRef.current;
      }
    };

    const init = async () => {
      try {
        setIsLoading(true);

        unwatch = watchStorage<string>(key, (newValue) => {
          if (!isMounted) return;
          const nextValue = parse(newValue);
          const nextSerialized = safeStringify(nextValue);
          if (nextSerialized === serializedRef.current) return;
          serializedRef.current = nextSerialized;
          setValue(nextValue);
        });

        const loadedValue = await loadStorage(key);

        if (!isMounted) return;
        const nextValue = parse(loadedValue);
        const nextSerialized = safeStringify(nextValue);
        if (nextSerialized !== serializedRef.current) {
          serializedRef.current = nextSerialized;
          setValue(nextValue);
        }
        setIsHydrated(true);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
      unwatch?.();
    };
  }, [key]);

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
      } else {
        setValue(defaultValue);
      }
      setIsHydrated(true);
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
    isHydrated,
  };
};

export default useChromeStorage;
