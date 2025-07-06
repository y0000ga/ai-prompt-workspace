import { ContextMenuId } from "@/background/types/contextMenus";

export const ContextMenusOptions = [
  {
    id: ContextMenuId.visitGithub,
    title: "Check Github",
  },
  {
    id: ContextMenuId.chromeExtension,
    title: "Go Extension",
  },
];

export const OutsideUrl: Record<string, string> = {
  [ContextMenuId.visitGithub]: "https://example.com/a",
  [ContextMenuId.chromeExtension]: "https://example.com/b",
};
