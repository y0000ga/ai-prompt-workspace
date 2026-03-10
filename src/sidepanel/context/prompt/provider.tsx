import { PropsWithChildren, useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import useChromeStorage from "@/sidepanel/hooks/useChromeStorage";
import { ChromeStorage, IPrompt } from "@/sidepanel/types/common";

import noteReducer from "./reducer";
import { PromptActionType } from "./types";

import { PromptContext } from ".";

const PromptProvider = ({ children }: PropsWithChildren<{}>) => {
  const {
    value,
    handleSaveStorage,
    handleLoadStorage: load,
    isLoading,
    isSaving,
    isHydrated,
  } = useChromeStorage<IPrompt[]>({
    defaultValue: [],
    key: ChromeStorage.Prompt,
  });

  const [state, dispatch] = useReducer(noteReducer, value);

  const syncingFromStorageRef = useRef(false);

  const serializedValue = useMemo(() => JSON.stringify(value), [value]);
  const serializedState = useMemo(() => JSON.stringify(state), [state]);

  const add = useCallback(
    (payload: IPrompt) => dispatch({ type: PromptActionType.ADD, payload }),
    []
  );

  const edit = useCallback(
    (id: IPrompt["id"], payload: IPrompt) =>
      dispatch({ type: PromptActionType.EDIT, id, payload }),
    []
  );

  const remove = useCallback(
    (id: IPrompt["id"]) => dispatch({ type: PromptActionType.DELETE, id }),
    []
  );

  const save = useCallback(() => {
    handleSaveStorage(state);
  }, [handleSaveStorage, state]);

  useEffect(() => {
    if (!isHydrated) return;
    syncingFromStorageRef.current = true;
    dispatch({ type: PromptActionType.SET, payload: value })

  }, [isHydrated, value]);

  useEffect(() => {
    if (!isHydrated || isLoading) return;

    if (syncingFromStorageRef.current) {
      if (serializedState === serializedValue) {
        syncingFromStorageRef.current = false;
      }
      return;
    }

    if (serializedState === serializedValue) return;

    handleSaveStorage(state);
  }, [state, serializedState, serializedValue, isHydrated, isLoading, handleSaveStorage]);

  return (
    <PromptContext.Provider
      value={{
        prompts: state,
        add,
        edit,
        remove,
        load,
        save,
        isLoading,
        isSaving,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export default PromptProvider;
