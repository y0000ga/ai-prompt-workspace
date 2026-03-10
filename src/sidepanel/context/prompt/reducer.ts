import { IPrompt } from "@/sidepanel/types/common";

import { Action, PromptActionType } from "./types";

const noteReducer = (state: IPrompt[], action: Action): IPrompt[] => {
  switch (action.type) {
    case PromptActionType.ADD:
      return [...state, action.payload];
    case PromptActionType.EDIT:
      return state.map((item) => (item.id === action.id ? action.payload : item));
    case PromptActionType.DELETE:
      console.log(action.id, state.filter((item) => item.id !== action.id))
      return state.filter((item) => item.id !== action.id);
    case PromptActionType.SET:
      console.log('SETALL', action.payload)
      return action.payload;
    default:
      return state;
  }
};

export default noteReducer;
