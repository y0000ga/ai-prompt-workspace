import { useMemo, useState } from "react";

import Tag from "@/sidepanel/components/Tag";
import PromptCard from "@/sidepanel/components/PromptCard";

import { IPrompt, ITag, SortBy } from "./types/common";
import { usePrompt } from "./context/prompt";
import { useTag } from "./context/tag";
import { Site } from "@/background/types/common";
import copy from "copy-to-clipboard";
import classNames from "classnames";

const generateMarkdown = (prompts: IPrompt[]) => {
  return prompts
    .map((prompt) => {
      return `
          ## ${prompt.content.split("\n")[0]}

          **Content**

          ${prompt.content}

          ${prompt.tags?.length ? `**Tags:** ${prompt.tags.map(t => t.name).join(", ")}` : ""}

          ${prompt.site ? `**Site:** ${prompt.site}` : ""}

          ${prompt.sourceUrl ? `**URL:** ${prompt.sourceUrl}` : ""}

          **Created:** ${new Date(prompt.createdAt).toLocaleString()}

          ---
          `;
    })
    .join("\n");
};

const downloadMarkdown = (markdown: string) => {

  const blob = new Blob([markdown], {
    type: "text/markdown",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "prompts.md";

  a.click();

  URL.revokeObjectURL(url);
};

const App = () => {
  const { prompts, remove: removePrompt, edit: editPrompt } = usePrompt();

  const { tags, add: addTag, remove: removeTag } = useTag();
  const [toggleOpenId, setToggleOpenId] = useState<IPrompt["id"] | null>(null);
  const [selectedTags, setSelectedTags] = useState<ITag["name"][]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [input, setInput] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.CreatedAt)

  const shownPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const isInput = input ? prompt.content.toLowerCase().includes(input.toLowerCase()) : true;
      let isTag = false;
      if (selectedTags.length === 0) {
        isTag = true;
      }

      if (selectedTags.length > 0) {
        for (const selectedTag of selectedTags) {
          if (prompt.tags.some((tag) => tag.name === selectedTag)) {
            isTag = true;
            break;
          }
        }
      }

      const isSource = selectedSources.length === 0 || selectedSources.includes(prompt.site) || false

      return isInput && isTag && isSource;
    }).sort((a, b) => {
      switch (sortBy) {
        case SortBy.isPinned:
          if (a.isPinned !== b.isPinned) {
            return a.isPinned ? -1 : 1;
          }
          return b.createdAt - a.createdAt;
        case SortBy.CreatedAt:
          return b.createdAt - a.createdAt;
        case SortBy.Content:
          return a.content.localeCompare(b.content);
        case SortBy.Site:
          return a.site.localeCompare(b.site)
        case SortBy.SourceURL:
          return a.sourceUrl.localeCompare(b.sourceUrl)
        case SortBy.RecentlyUsed:
          return a.lastUsedAt - b.lastUsedAt
        default:
          return 0;
      }
    });
  }, [prompts, input, selectedTags, selectedSources, sortBy]);

  const onSelectTag = (tag: ITag) => {
    if (tag.name === "All") {
      return () => setSelectedTags([]);
    }
    return () =>
      setSelectedTags((prev) => {
        const isExisted = prev.some((item) => item === tag.name);
        return isExisted ? prev.filter((item) => item !== tag.name) : [...prev, tag.name];
      });
  };

  const onDeleteTag = (tag: ITag, index: number) => {
    if (tag.name === "All") {
      return null;
    }
    return () => removeTag(index);
  };

  const onExport = () => {
    const markdown = generateMarkdown(shownPrompts);
    downloadMarkdown(markdown);
  }

  return (
    <>
      <div className="flex h-screen max-h-screen flex-1 flex-col gap-4 overflow-hidden bg-zinc-50 py-4">
        <div className="flex flex-col justify-between gap-4 px-4">
          <div className="flex justify-end">
            <button className="flex items-center rounded rounded-full border bg-gray-600 p-2 text-sm" onClick={onExport}>
              <div className={classNames("text-zinc-50 icon-[mdi--file-export]")} />
            </button>
          </div>
          <input
            placeholder="Search prompts..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <div className="flex gap-2 text-sm">
            <span>Tag</span>
            {tags.map((tag, index) => {
              const isSelected =
                selectedTags.includes(tag.name) ||
                (selectedTags.length === 0 && tag.name === "All");
              return (
                <Tag
                  key={tag.name}
                  name={tag.name}
                  isSelected={isSelected}
                  onDelete={onDeleteTag(tag, index)}
                  onClick={onSelectTag(tag)}
                />
              );
            })}
            <input
              placeholder="Add Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value.trim())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTag({ name: tagInput });
                  setTagInput("");
                }

                if (e.key === "Backspace") {
                  if (!tagInput) {
                    removeTag(tags.length - 1);
                  }
                }
              }}
            />
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span>Site</span>
            {['All', ...Object.values(Site)].map(source => (
              <Tag
                key={source}
                onDelete={null}
                onClick={() => {
                  if (source === 'All') {
                    setSelectedSources([])
                    return
                  }

                  setSelectedSources((prev) => {
                    const isExisted = prev.some((item) => item === source);
                    return isExisted ? prev.filter((item) => item !== source) : [...prev, source];
                  })
                }}
                name={source}
                isSelected={selectedSources.includes(source) || (selectedSources.length === 0 && source === 'All')}
              />))}
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span>Sort by</span>
            <select value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortBy)
              }}>
              {Object.values(SortBy).map(item => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <ul className="flex max-h-fit flex-col overflow-y-auto">
          {shownPrompts.map((prompt) => (
            <li
              key={prompt.id}
              className="cursor-pointer"
              onClick={() => {
                setToggleOpenId((prev) => (prev === prompt.id ? null : prompt.id));
              }}
            >
              <PromptCard
                prompt={prompt}
                isOpen={toggleOpenId === prompt.id}
                onDelete={() => {
                  removePrompt(prompt.id);
                }}
                onCopy={() => {
                  copy(prompt.content)
                  editPrompt(prompt.id, { ...prompt, lastUsedAt: Date.now() })
                }}
                togglePin={() => {
                  editPrompt(prompt.id, { ...prompt, isPinned: !prompt.isPinned })
                }}
                toggleTemplate={
                  () => {
                    editPrompt(prompt.id, { ...prompt, isTemplate: !prompt.isTemplate })
                  }
                }
              />
            </li>
          ))}
          {shownPrompts.length === 0 && (
            <div className="flex items-center justify-center p-4">Empty</div>
          )}
        </ul>
      </div>
    </>
  );
};

export default App;
