import { ITag } from "@/sidepanel/types/common";

export enum StatusOptionsActionType {
  ADD = "ADD",
  EDIT = "EDIT",
  DELETE = "DELETE",
  SET = "SET",
}

export type Action =
  | { type: StatusOptionsActionType.ADD; payload: ITag }
  | { type: StatusOptionsActionType.EDIT; index: number; payload: ITag }
  | { type: StatusOptionsActionType.DELETE; index: number }
  | { type: StatusOptionsActionType.SET; payload: ITag[] };
