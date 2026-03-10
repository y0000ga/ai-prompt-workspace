import { createContext, useContext } from "react";

import { ITag } from "@/sidepanel/types/common";

export const TagContext = createContext<{
  tags: ITag[];
  add: (item: ITag) => void;
  edit: (index: number, item: ITag) => void;
  remove: (index: number) => void;
  load: () => void;
  save: () => void;
  isLoading: boolean;
  isSaving: boolean;
} | null>(null);

export const useTag = () => {
  const context = useContext(TagContext);
  if (!context) throw new Error("useStatusOptions must be used within StatusOptionsProvider");
  return context;
};
