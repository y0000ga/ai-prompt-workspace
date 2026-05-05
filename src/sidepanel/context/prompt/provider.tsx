import { PropsWithChildren, useCallback, useEffect, useReducer } from "react";

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

  const add = useCallback(
    (payload: IPrompt) => {
      const nextState = noteReducer(state, { type: PromptActionType.ADD, payload });
      dispatch({ type: PromptActionType.ADD, payload });
      handleSaveStorage(nextState);
    },
    [handleSaveStorage, state]
  );

  const edit = useCallback(
    (id: IPrompt["id"], payload: IPrompt) => {
      const nextState = noteReducer(state, { type: PromptActionType.EDIT, id, payload });
      dispatch({ type: PromptActionType.EDIT, id, payload });
      handleSaveStorage(nextState);
    },
    [handleSaveStorage, state]
  );

  const remove = useCallback(
    (id: IPrompt["id"]) => {
      const nextState = noteReducer(state, { type: PromptActionType.DELETE, id });
      dispatch({ type: PromptActionType.DELETE, id });
      handleSaveStorage(nextState);
    },
    [handleSaveStorage, state]
  );

  const save = useCallback(() => {
    handleSaveStorage(state);
  }, [handleSaveStorage, state]);

  useEffect(() => {
    if (!isHydrated) return;
    dispatch({ type: PromptActionType.SET, payload: value });
  }, [isHydrated, value]);

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
