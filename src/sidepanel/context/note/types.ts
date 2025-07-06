import { IEvent } from "@/sidepanel/types/common";

export enum NoteActionType {
  ADD = "ADD",
  EDIT = "EDIT",
  DELETE = "DELETE",
  SET = "SET",
}

export type Action =
  | { type: NoteActionType.ADD; payload: IEvent }
  | { type: NoteActionType.EDIT; id: string; payload: Partial<IEvent> }
  | { type: NoteActionType.DELETE; id: string }
  | { type: NoteActionType.SET; payload: IEvent[] };
