import { Options } from "flatpickr/dist/types/options";

import { IHistory } from "../types/common";

export const DEFAULT_HISTORY: IHistory = {
  time: new Date(),
  description: "",
};

export const createDefaultHistory = (): IHistory => ({
  time: new Date(),
  description: "",
});

export const DEFAULT_STATUS = "";

export const FlatpickrOptions: () => Partial<Options> = () => ({
  enableTime: true,
  dateFormat: "Y-m-d H:i", // 年-月-日 時:分
  time_24hr: true, // 使用 24 小時制
});

export const DefaultTextareaProps = {
  placeholder: "✏️ ...",
  className: "flex-grow",
  rows: 1,
};

export const DEFAULT_STATUS_OPTION = {
  value: "",
  label: "😀",
};
