export const DEFAULT_NOTE = [
  {
    id: new Date().getTime().toString(),
    isPinned: false,
    sort: 0,
    status: "完成",
    title: "等待你決定",
    history: [],
  },
];

export const DEFAULT_TIME_OPTIONS = [
  {
    label: "🌅",
    value: "早上",
  },
  {
    label: "🌃",
    value: "晚上",
  },
];

export const DEFAULT_STATUS_OPTIONS = [
  {
    label: "✅",
    value: "完成",
  },
  {
    label: "⏳",
    value: "未完成",
  },
];
