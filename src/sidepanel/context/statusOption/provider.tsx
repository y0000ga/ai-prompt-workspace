import { useCallback, useEffect, useReducer } from "react";

import { DEFAULT_STATUS_OPTIONS } from "@/sidepanel/constants/mock";
import useChromeStorage from "@/sidepanel/hooks/useChromeStorage";
import { ChromeStorage, ITag } from "@/sidepanel/types/common";

import statusOptionReducer from "./reducer";
import { StatusOptionsActionType } from "./types";

import { StatusOptionsContext } from ".";

export const StatusOptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const { value, handleSaveStorage, handleLoadStorage, isLoading, isSaving } = useChromeStorage<
    ITag[]
  >({
    defaultValue: DEFAULT_STATUS_OPTIONS,
    key: ChromeStorage.StatusOptions,
  });

  const [state, dispatch] = useReducer(statusOptionReducer, value);

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

  const load = useCallback(() => {
    handleLoadStorage();
    dispatch({ type: StatusOptionsActionType.SET, payload: value });
  }, [handleLoadStorage, value]);

  const save = useCallback(() => {
    handleSaveStorage(state);
  }, [handleSaveStorage, state]);

  const setAll = useCallback(
    (payload: ITag[]) => dispatch({ type: StatusOptionsActionType.SET, payload }),
    []
  );

  useEffect(() => {
    setAll(value);
  }, [setAll, value]);
  return (
    <StatusOptionsContext.Provider
      value={{ statusOptions: state, add, edit, remove, load, save, isLoading, isSaving }}
    >
      {children}
    </StatusOptionsContext.Provider>
  );
};
