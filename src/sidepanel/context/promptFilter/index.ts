import { createContext, useContext } from "react";

import type { PromptFilterContextValue } from "./types";

export const PromptFilterContext = createContext<PromptFilterContextValue | null>(null);

export const usePromptFilter = () => {
  const context = useContext(PromptFilterContext);
  if (!context) throw new Error("usePromptFilter must be used within PromptFilterProvider");
  return context;
};
