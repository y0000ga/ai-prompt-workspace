export enum ChromeStorage {
  Note = "Note",
  StatusOptions = "StatusOptions",
  TimeOptions = "TimeOptions",
}

export interface IChromeStorage {
  [ChromeStorage.Note]: string;
}

export interface IStatusItem {
  id: string,
  title: string;
  status: string;
  history: { time: string; description: string }[];
  sort: number;
  isPinned: boolean;
  forceCollapse?: boolean;
}

export interface ITag {
  label: string;
  value: string;
}
