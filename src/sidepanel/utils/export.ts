import { IPrompt } from "../types/common";

export const generateMarkdown = (prompts: IPrompt[]) =>
  prompts
    .map((prompt) => {
      return `## ${prompt.content.split("\n")[0]}

**Content**

${prompt.content}

${prompt.tags?.length ? `**Tags:** ${prompt.tags.map((t) => t.name).join(", ")}` : ""}
${prompt.site ? `**Site:** ${prompt.site}` : ""}
${prompt.sourceUrl ? `**URL:** ${prompt.sourceUrl}` : ""}
**Created:** ${new Date(prompt.createdAt).toLocaleString()}

---`;
    })
    .join("\n\n");

export const downloadText = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};