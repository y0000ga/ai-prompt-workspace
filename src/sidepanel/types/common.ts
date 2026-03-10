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
  site: Site | string;
  isPinned: boolean
  lastUsedAt: number
  isTemplate: boolean
}

export enum Site {
  ChatGPT = 'chatgpt',
  Claude = 'claude',
  Gemini = 'gemini',
}

export enum SortBy {
  CreatedAt = 'Created At',
  SourceURL = 'Site URL',
  Site = "Site",
  isPinned = 'is Pinned',
  Content = 'Content',
  RecentlyUsed = 'Recently Used'
}