import { useCallback, useEffect, useReducer } from "react";

import { DEFAULT_NOTE } from "@/sidepanel/constants/mock";
import useChromeStorage from "@/sidepanel/hooks/useChromeStorage";
import { ChromeStorage, IEvent } from "@/sidepanel/types/common";

import noteReducer from "./reducer";
import { NoteActionType } from "./types";

import { NoteContext } from ".";

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const { value, handleSaveStorage, handleLoadStorage, isLoading, isSaving } = useChromeStorage<
    IEvent[]
  >({
    defaultValue: DEFAULT_NOTE,
    key: ChromeStorage.Note,
  });

  const [state, dispatch] = useReducer(noteReducer, value);

  const add = useCallback(
    (item: IEvent) => dispatch({ type: NoteActionType.ADD, payload: item }),
    []
  );

  const edit = useCallback(
    (id: string, payload: Partial<IEvent>) => dispatch({ type: NoteActionType.EDIT, id, payload }),
    []
  );

  const remove = useCallback((id: string) => dispatch({ type: NoteActionType.DELETE, id }), []);

  const load = useCallback(() => {
    handleLoadStorage();
    dispatch({ type: NoteActionType.SET, payload: value });
  }, [handleLoadStorage, value]);

  const setAll = useCallback(
    (payload: IEvent[]) => dispatch({ type: NoteActionType.SET, payload }),
    []
  );

  const save = useCallback(() => {
    handleSaveStorage(state);
  }, [handleSaveStorage, state]);

  useEffect(() => {
    setAll(value);
  }, [setAll, value]);

  return (
    <NoteContext.Provider
      value={{ note: state, add, edit, remove, load, save, setAll, isLoading, isSaving }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
