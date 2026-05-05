import { usePromptFilter } from "@/sidepanel/context/promptFilter";
import { useTag } from "@/sidepanel/context/tag";
import { Site, SortBy } from "@/sidepanel/types/common";
import Tag from "./Tag";

const PromptFilterBar = () => {
  const { tags, add: addTag, remove: removeTag } = useTag();
  const {
    selectedTags,
    selectedSources,
    input,
    setInput,
    sortBy,
    setSortBy,
    tagInput,
    setTagInput,
    toggleTag,
    toggleSource,
  } = usePromptFilter();

  return (
    <div className="flex flex-col gap-4 px-4">
      <input
        placeholder="Search prompts..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 text-sm">
        <span>Tag</span>
        {tags.map((tag, index) => {
          const isSelected =
            selectedTags.includes(tag.name) || (selectedTags.length === 0 && tag.name === "All");
          return (
            <Tag
              key={tag.name}
              name={tag.name}
              isSelected={isSelected}
              onDelete={tag.name === "All" ? null : () => removeTag(index)}
              onClick={() => toggleTag(tag.name)}
            />
          );
        })}
        <input
          placeholder="Add Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const name = tagInput.trim();
              if (!name) return;
              addTag({ name });
              setTagInput("");
            }
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span>Site</span>
        {["All", Site.ChatGPT, Site.Claude, Site.Custom, Site.Gemini].map((source) => (
          <Tag
            key={source}
            name={source}
            isSelected={
              selectedSources.includes(source as Site) ||
              (selectedSources.length === 0 && source === "All")
            }
            onDelete={null}
            onClick={() => toggleSource(source)}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span>Sort by</span>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
          {Object.values(SortBy).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PromptFilterBar;
