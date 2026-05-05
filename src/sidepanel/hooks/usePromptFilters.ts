import { useMemo } from "react";

import { IPrompt, Site, SortBy } from "@/sidepanel/types/common";

type UsePromptFiltersParams = {
  prompts: IPrompt[];
  query: string;
  selectedTags: string[];
  selectedSources: Site[];
  sortBy: SortBy;
};

const usePromptFilters = ({ prompts, query, selectedTags, selectedSources, sortBy }: UsePromptFiltersParams) => {
  return useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return prompts
      .filter((prompt) => {
        const searchable = [
          prompt.content,
          prompt.site,
          prompt.sourceUrl,
          ...(prompt.tags?.map((tag) => tag.name) ?? []),
        ]
          .join(" ")
          .toLowerCase();

        const matchesInput = normalizedQuery ? searchable.includes(normalizedQuery) : true;
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.some((selectedTag) => prompt.tags.some((tag) => tag.name === selectedTag));
        const matchesSource = selectedSources.length === 0 || selectedSources.includes(prompt.site);

        return matchesInput && matchesTags && matchesSource;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case SortBy.isPinned:
            if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
            return b.createdAt - a.createdAt;
          case SortBy.CreatedAt:
            return b.createdAt - a.createdAt;
          case SortBy.Content:
            return a.content.localeCompare(b.content);
          case SortBy.Site:
            return a.site.localeCompare(b.site);
          case SortBy.SourceURL:
            return a.sourceUrl.localeCompare(b.sourceUrl);
          case SortBy.RecentlyUsed:
            return b.lastUsedAt - a.lastUsedAt;
          default:
            return 0;
        }
      });
  }, [prompts, query, selectedSources, selectedTags, sortBy]);
};

export default usePromptFilters;
