import { PropsWithChildren, useMemo, useReducer } from "react";

import { PromptFilterContext } from ".";
import promptFilterReducer from "./reducer";
import { initialPromptFilterState, PromptFilterActionType } from "./types";
import { SortBy } from "@/sidepanel/types/common";

const PromptFilterProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(promptFilterReducer, initialPromptFilterState);

  const value = useMemo(
    () => ({
      selectedTags: state.selectedTags,
      selectedSources: state.selectedSources,
      input: state.input,
      setInput: (next: string) =>
        dispatch({ type: PromptFilterActionType.SET_INPUT, payload: next }),
      sortBy: state.sortBy,
      setSortBy: (next: SortBy) =>
        dispatch({ type: PromptFilterActionType.SET_SORT_BY, payload: next }),
      tagInput: state.tagInput,
      setTagInput: (next: string) =>
        dispatch({ type: PromptFilterActionType.SET_TAG_INPUT, payload: next }),
      toggleTag: (tagName: string) =>
        dispatch({ type: PromptFilterActionType.TOGGLE_SELECTED_TAG, payload: tagName }),
      toggleSource: (source: string) =>
        dispatch({ type: PromptFilterActionType.TOGGLE_SELECTED_SOURCE, payload: source }),
    }),
    [state]
  );

  return <PromptFilterContext.Provider value={value}>{children}</PromptFilterContext.Provider>;
};

export default PromptFilterProvider;
