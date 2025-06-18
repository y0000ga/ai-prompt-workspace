import { ContextMenuId } from "@/background/types/contextMenus";

export const ContextMenusOptions = [
  {
    id: ContextMenuId.visitGithub,
    title: "查看 Github",
  },
  {
    id: ContextMenuId.chromeExtension,
    title: "前往擴充功能頁面",
  },
];

export const OutsideUrl: Record<string, string> = {
  [ContextMenuId.visitGithub]: "https://example.com/a",
  [ContextMenuId.chromeExtension]: "https://example.com/b",
};
