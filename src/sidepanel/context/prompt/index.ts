import { createContext, useContext } from "react";

import { IPrompt } from "@/sidepanel/types/common";

export const PromptContext = createContext<{
  prompts: IPrompt[];
  add: (item: IPrompt) => void;
  edit: (id: IPrompt["id"], payload: IPrompt) => void;
  remove: (id: IPrompt["id"]) => void;
  load: () => void;
  save: () => void;
  isLoading: boolean;
  isSaving: boolean;
} | null>(null);

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) throw new Error("usePrompt must be used within NoteProvider");
  return context;
};
