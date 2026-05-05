export enum ChromeStorage {
  Tag = "Tag",
  Prompt = "Prompt",
}

export interface IChromeStorage {
  [ChromeStorage.Prompt]: string;
}

export interface ITag {
  name: string;
}

export interface IPrompt {
  id: string;
  content: string;
  tags: ITag[];
  createdAt: number;
  sourceUrl: string;
  site: Site;
  isPinned: boolean
  lastUsedAt: number
  isTemplate: boolean
}

export enum Site {
  ChatGPT = 'Chatgpt',
  Claude = 'Claude',
  Gemini = 'Gemini',
  Custom = 'Custom'
}

export enum SortBy {
  CreatedAt = 'Created At',
  SourceURL = 'Site URL',
  Site = "Site",
  isPinned = 'is Pinned',
  Content = 'Content',
  RecentlyUsed = 'Recently Used'
}