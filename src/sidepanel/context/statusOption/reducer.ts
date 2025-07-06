import { ITag } from "@/sidepanel/types/common";

import { Action, StatusOptionsActionType } from "./types";

const statusOptionReducer = (state: ITag[], action: Action): ITag[] => {
  switch (action.type) {
    case StatusOptionsActionType.ADD: {
      const exists = state.find(
        (item) => item.label === action.payload.label && item.value === action.payload.value
      );
      return exists ? state : [...state, action.payload];
    }
    case StatusOptionsActionType.EDIT: {
      return state.map((item, idx) => (idx === action.index ? action.payload : item));
    }
    case StatusOptionsActionType.DELETE: {
      return state.filter((_, idx) => idx !== action.index);
    }
    case StatusOptionsActionType.SET: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default statusOptionReducer;
