import { Site, SortBy } from "@/sidepanel/types/common";

export enum PromptFilterActionType {
  SET_SELECTED_TAGS = "SET_SELECTED_TAGS",
  TOGGLE_SELECTED_TAG = "TOGGLE_SELECTED_TAG",
  SET_SELECTED_SOURCES = "SET_SELECTED_SOURCES",
  TOGGLE_SELECTED_SOURCE = "TOGGLE_SELECTED_SOURCE",
  SET_INPUT = "SET_INPUT",
  SET_SORT_BY = "SET_SORT_BY",
  SET_TAG_INPUT = "SET_TAG_INPUT",
}

export type PromptFilterAction =
  | { type: PromptFilterActionType.SET_SELECTED_TAGS; payload: string[] }
  | { type: PromptFilterActionType.TOGGLE_SELECTED_TAG; payload: string }
  | { type: PromptFilterActionType.SET_SELECTED_SOURCES; payload: string[] }
  | { type: PromptFilterActionType.TOGGLE_SELECTED_SOURCE; payload: string }
  | { type: PromptFilterActionType.SET_INPUT; payload: string }
  | { type: PromptFilterActionType.SET_SORT_BY; payload: SortBy }
  | { type: PromptFilterActionType.SET_TAG_INPUT; payload: string };

export type PromptFilterState = {
  selectedTags: string[];
  selectedSources: string[];
  input: string;
  sortBy: SortBy;
  tagInput: string;
};

export const initialPromptFilterState: PromptFilterState = {
  selectedTags: [],
  selectedSources: [],
  input: "",
  sortBy: SortBy.CreatedAt,
  tagInput: "",
};

export type PromptFilterContextValue = {
  selectedTags: string[];
  selectedSources: Site[];
  input: string;
  setInput: (next: string) => void;
  sortBy: SortBy;
  setSortBy: (next: SortBy) => void;
  tagInput: string;
  setTagInput: (next: string) => void;
  toggleTag: (tagName: string) => void;
  toggleSource: (source: string) => void;
};
