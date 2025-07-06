import { IEvent } from "@/sidepanel/types/common";

import { Action, NoteActionType } from "./types";

const noteReducer = (state: IEvent[], action: Action): IEvent[] => {
  switch (action.type) {
    case NoteActionType.ADD:
      if (action.payload.title === "") return state;
      return [...state, action.payload];
    case NoteActionType.EDIT:
      return state.map((item) => (item.id === action.id ? { ...item, ...action.payload } : item));
    case NoteActionType.DELETE:
      return state.filter((item) => item.id !== action.id);
    case NoteActionType.SET:
      return action.payload;
    default:
      return state;
  }
};

export default noteReducer;
