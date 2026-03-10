import { IPrompt } from "@/sidepanel/types/common";

export enum PromptActionType {
  ADD = "ADD",
  EDIT = "EDIT",
  DELETE = "DELETE",
  SET = "SET",
}

export type Action =
  | { type: PromptActionType.ADD; payload: IPrompt }
  | { type: PromptActionType.EDIT; id: IPrompt["id"]; payload: IPrompt }
  | { type: PromptActionType.DELETE; id: IPrompt["id"] }
  | { type: PromptActionType.SET; payload: IPrompt[] };
