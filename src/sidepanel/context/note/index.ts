import { createContext, useContext } from "react";

import { IEvent } from "@/sidepanel/types/common";

export const NoteContext = createContext<{
  note: IEvent[];
  add: (item: IEvent) => void;
  edit: (id: string, payload: Partial<IEvent>) => void;
  remove: (id: string) => void;
  load: () => void;
  save: () => void;
  setAll: (payload: IEvent[]) => void;
  isLoading: boolean;
  isSaving: boolean;
} | null>(null);

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) throw new Error("useNote must be used within NoteProvider");
  return context;
};
