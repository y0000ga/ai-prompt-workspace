export enum ChromeStorage {
  Note = "Note",
  StatusOptions = "StatusOptions",
}

export interface IChromeStorage {
  [ChromeStorage.Note]: string;
}

export interface IHistory {
  time: Date;
  description: string;
}

export interface IEvent {
  id: string;
  title: string;
  status: string;
  history: IHistory[];
  sort: number;
  isPinned: boolean;
  forceCollapse?: boolean;
}

export interface ITag {
  label: string;
  value: string;
}
