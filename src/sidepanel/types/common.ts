export enum ChromeStorage {
  Note = "Note",
}

export interface IChromeStorage {
  [ChromeStorage.Note]: string;
}

export interface IStatusItem {
  title: string;
  status: string;
  history: { time: string; description: string }[];
}
