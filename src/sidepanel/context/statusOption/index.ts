import { createContext, useContext } from "react";

import { ITag } from "@/sidepanel/types/common";

export const StatusOptionsContext = createContext<{
  statusOptions: ITag[];
  add: (item: ITag) => void;
  edit: (index: number, item: ITag) => void;
  remove: (index: number) => void;
  load: () => void;
  save: () => void;
  isLoading: boolean;
  isSaving: boolean;
} | null>(null);

export const useStatusOptions = () => {
  const context = useContext(StatusOptionsContext);
  if (!context) throw new Error("useStatusOptions must be used within StatusOptionsProvider");
  return context;
};
