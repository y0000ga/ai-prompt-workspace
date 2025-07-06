export const DEFAULT_STATUS_OPTIONS = [
  {
    label: "✅",
    value: "Finished",
  },
];

export const DEFAULT_NOTE = [
  {
    id: new Date().getTime().toString(),
    isPinned: false,
    sort: 0,
    status: DEFAULT_STATUS_OPTIONS[0].value,
    title: "FIRST NOTE",
    history: [],
  },
];
