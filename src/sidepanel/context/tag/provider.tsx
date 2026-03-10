import { PropsWithChildren, useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import useChromeStorage from "@/sidepanel/hooks/useChromeStorage";
import { ChromeStorage, ITag } from "@/sidepanel/types/common";

import statusOptionReducer from "./reducer";
import { StatusOptionsActionType } from "./types";

import { TagContext } from ".";

const DEFAULT_VALUE = [{ name: "All" }];

const TagProvider = ({ children }: PropsWithChildren<{}>) => {
  const {
    value,
    handleSaveStorage,
    handleLoadStorage: load,
    isLoading,
    isSaving,
    isHydrated,
  } = useChromeStorage<ITag[]>({
    defaultValue: DEFAULT_VALUE,
    key: ChromeStorage.Tag,
  });

  const [state, dispatch] = useReducer(statusOptionReducer, value);

  const syncingFromStorageRef = useRef(false);

  const serializedValue = useMemo(() => JSON.stringify(value), [value]);
  const serializedState = useMemo(() => JSON.stringify(state), [state]);

  const add = useCallback(
    (item: ITag) => dispatch({ type: StatusOptionsActionType.ADD, payload: item }),
    []
  );

  const edit = useCallback(
    (index: number, item: ITag) =>
      dispatch({ type: StatusOptionsActionType.EDIT, index, payload: item }),
    []
  );

  const remove = useCallback(
    (index: number) => dispatch({ type: StatusOptionsActionType.DELETE, index }),
    []
  );

  const save = useCallback(() => {
    handleSaveStorage(state);
  }, [handleSaveStorage, state]);

  useEffect(() => {
    if (!isHydrated) return;

    syncingFromStorageRef.current = true;
    dispatch({ type: StatusOptionsActionType.SET, payload: value });
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
    <TagContext.Provider
      value={{
        tags: state,
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
    </TagContext.Provider>
  );
};

export default TagProvider;
