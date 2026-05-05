import { useCallback, useEffect, useReducer, useRef } from "react";

import { ChromeStorage } from "@/sidepanel/types/common";
import { loadStorage, saveStorage, watchStorage } from "@utils/storage";

const useChromeStorage = <T>({ defaultValue, key }: { defaultValue: T; key: ChromeStorage }) => {
  const [state, dispatch] = useReducer(
    (
      current:
        | { value: T; isLoading: boolean; isSaving: boolean; isHydrated: boolean }
        | null,
      action:
        | { type: "SET_VALUE"; payload: T }
        | { type: "SET_LOADING"; payload: boolean }
        | { type: "SET_SAVING"; payload: boolean }
        | { type: "SET_HYDRATED"; payload: boolean }
    ) => {
      const base = current ?? {
        value: defaultValue,
        isLoading: false,
        isSaving: false,
        isHydrated: false,
      };

      switch (action.type) {
        case "SET_VALUE":
          return { ...base, value: action.payload };
        case "SET_LOADING":
          return { ...base, isLoading: action.payload };
        case "SET_SAVING":
          return { ...base, isSaving: action.payload };
        case "SET_HYDRATED":
          return { ...base, isHydrated: action.payload };
        default:
          return base;
      }
    },
    null
  );
  const value = state?.value ?? defaultValue;
  const isLoading = state?.isLoading ?? false;
  const isSaving = state?.isSaving ?? false;
  const isHydrated = state?.isHydrated ?? false;
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
        dispatch({ type: "SET_LOADING", payload: true });

        unwatch = watchStorage<string>(key, (newValue) => {
          if (!isMounted) return;
          const nextValue = parse(newValue);
          const nextSerialized = safeStringify(nextValue);
          if (nextSerialized === serializedRef.current) return;
          serializedRef.current = nextSerialized;
          dispatch({ type: "SET_VALUE", payload: nextValue });
        });

        const loadedValue = await loadStorage(key);

        if (!isMounted) return;
        const nextValue = parse(loadedValue);
        const nextSerialized = safeStringify(nextValue);
        if (nextSerialized !== serializedRef.current) {
          serializedRef.current = nextSerialized;
          dispatch({ type: "SET_VALUE", payload: nextValue });
        }
        dispatch({ type: "SET_HYDRATED", payload: true });
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          dispatch({ type: "SET_LOADING", payload: false });
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
        dispatch({ type: "SET_SAVING", payload: true });
        await saveStorage({ key, value: JSON.stringify(updatedValue) });
      } catch (error) {
      } finally {
        dispatch({ type: "SET_SAVING", payload: false });
      }
    },
    [key]
  );

  const handleLoadStorage = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const loadedValue = await loadStorage(key);
      if (loadedValue) {
        dispatch({ type: "SET_VALUE", payload: JSON.parse(loadedValue) });
      } else {
        dispatch({ type: "SET_VALUE", payload: defaultValue });
      }
      dispatch({ type: "SET_HYDRATED", payload: true });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [key]);

  return {
    value,
    handleSaveStorage,
    handleLoadStorage,
    isLoading,
    isSaving,
    isHydrated,
  };
};

export default useChromeStorage;
