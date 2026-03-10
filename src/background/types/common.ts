export enum Site {
    ChatGPT = 'chatgpt',
    Claude = 'claude',
    Gemini = 'gemini',
}

export interface IPrompt {
  id: string;
  content: string;
  createdAt: number;
  sourceUrl: string;
  site: Site | string;
  tags: Array<unknown>;
  isPinned: boolean,
  lastUsedAt: number,
  isTemplate: boolean
};