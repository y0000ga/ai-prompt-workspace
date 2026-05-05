export enum Site {
    ChatGPT = 'Chatgpt',
    Claude = 'Claude',
    Gemini = 'Gemini',
    Custom = 'Custom'
}

export interface IPrompt {
  id: string;
  content: string;
  createdAt: number;
  sourceUrl: string;
  site: Site;
  tags: Array<unknown>;
  isPinned: boolean,
  lastUsedAt: number,
  isTemplate: boolean
};