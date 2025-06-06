export enum ChromeStorage {
  Note = "Note",
}

export interface IChromeStorage {
  [ChromeStorage.Note]: string;
}
