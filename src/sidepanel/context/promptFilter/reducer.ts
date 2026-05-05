import type { PromptFilterAction, PromptFilterState } from "./types";
import { PromptFilterActionType } from "./types";

const promptFilterReducer = (state: PromptFilterState, action: PromptFilterAction): PromptFilterState => {
  switch (action.type) {
    case PromptFilterActionType.SET_SELECTED_TAGS:
      return { ...state, selectedTags: action.payload };
    case PromptFilterActionType.TOGGLE_SELECTED_TAG:
      if (action.payload === "All") return { ...state, selectedTags: [] };
      return {
        ...state,
        selectedTags: state.selectedTags.includes(action.payload)
          ? state.selectedTags.filter((item) => item !== action.payload)
          : [...state.selectedTags, action.payload],
      };
    case PromptFilterActionType.SET_SELECTED_SOURCES:
      return { ...state, selectedSources: action.payload };
    case PromptFilterActionType.TOGGLE_SELECTED_SOURCE:
      if (action.payload === "All") return { ...state, selectedSources: [] };
      return {
        ...state,
        selectedSources: state.selectedSources.includes(action.payload)
          ? state.selectedSources.filter((item) => item !== action.payload)
          : [...state.selectedSources, action.payload],
      };
    case PromptFilterActionType.SET_INPUT:
      return { ...state, input: action.payload };
    case PromptFilterActionType.SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    case PromptFilterActionType.SET_TAG_INPUT:
      return { ...state, tagInput: action.payload };
    default:
      return state;
  }
};

export default promptFilterReducer;
