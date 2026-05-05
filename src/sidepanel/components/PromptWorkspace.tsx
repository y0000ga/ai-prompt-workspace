import { ChangeEvent, useContext, useMemo, useRef, useState } from "react";

import copy from "copy-to-clipboard";

import PromptFilterBar from "@/sidepanel/components/PromptFilterBar";
import PromptCard from "@/sidepanel/components/PromptCard";
import { usePrompt } from "@/sidepanel/context/prompt";
import { PromptFilterContext } from "@/sidepanel/context/promptFilter";
import usePromptFilters from "@/sidepanel/hooks/usePromptFilters";
import { IPrompt, Site } from "@/sidepanel/types/common";
import { downloadText, generateMarkdown } from "@/sidepanel/utils/export";

type PromptFormState = {
  id?: string;
  content: string;
  tags: string;
  sourceUrl: string;
  site: Site;
  isPinned: boolean;
  isTemplate: boolean;
};

const emptyForm: PromptFormState = {
  content: "",
  tags: "",
  sourceUrl: "",
  site: Site.Custom,
  isPinned: false,
  isTemplate: false,
};

const normalizeTags = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((name) => ({ name }));

const PromptWorkspace = () => {
  const { prompts, add: addPrompt, remove: removePrompt, edit: editPrompt } = usePrompt();
  const filterContext = useContext(PromptFilterContext);
  if (!filterContext) {
    throw new Error("PromptWorkspace must be used within PromptFilterProvider");
  }
  const { input, selectedTags, selectedSources, sortBy } = filterContext;

  const [openedId, setOpenedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [form, setForm] = useState<PromptFormState>(emptyForm);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const shownPrompts = usePromptFilters({
    prompts,
    query: input,
    selectedTags,
    selectedSources,
    sortBy,
  });

  const selectedPrompts = useMemo(
    () => prompts.filter((prompt) => selectedIds.includes(prompt.id)),
    [prompts, selectedIds]
  );

  const exportJson = (items: IPrompt[], filename: string) => {
    downloadText(JSON.stringify(items, null, 2), filename, "application/json");
  };

  const exportMarkdown = (items: IPrompt[], filename: string) => {
    downloadText(generateMarkdown(items), filename, "text/markdown");
  };

  const importJson = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as IPrompt[] | { prompts: IPrompt[] };
      const imported = Array.isArray(parsed) ? parsed : parsed.prompts;
      const existingContents = new Set(prompts.map((prompt) => prompt.content));

      imported
        .filter((item) => item?.content?.trim())
        .forEach((item) => {
          if (existingContents.has(item.content)) return;

          addPrompt({
            id:
              item.id && !prompts.some((prompt) => prompt.id === item.id)
                ? item.id
                : crypto.randomUUID(),
            content: item.content.trim(),
            tags: (item.tags ?? []).map((tag) => ({ name: tag.name })),
            createdAt: item.createdAt ?? Date.now(),
            sourceUrl: item.sourceUrl ?? "",
            site: item.site ?? Site.Custom,
            isPinned: Boolean(item.isPinned),
            lastUsedAt: item.lastUsedAt ?? Date.now(),
            isTemplate: Boolean(item.isTemplate),
          });
        });
    } catch (error) {
      console.error("Import failed:", error);
    } finally {
      event.target.value = "";
    }
  };

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEditForm = (prompt: IPrompt) => {
    setEditingId(prompt.id);
    setForm({
      id: prompt.id,
      content: prompt.content,
      tags: prompt.tags.map((tag) => tag.name).join(", "),
      sourceUrl: prompt.sourceUrl,
      site: prompt.site,
      isPinned: prompt.isPinned,
      isTemplate: prompt.isTemplate,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const saveForm = () => {
    const content = form.content.trim();
    if (!content) return;

    const current = prompts.find((prompt) => prompt.id === editingId);
    const nextPrompt: IPrompt = {
      id: form.id ?? crypto.randomUUID(),
      content,
      tags: normalizeTags(form.tags),
      createdAt: current?.createdAt ?? Date.now(),
      sourceUrl: form.sourceUrl.trim(),
      site: form.site || Site.Custom,
      isPinned: form.isPinned,
      lastUsedAt: current?.lastUsedAt ?? Date.now(),
      isTemplate: form.isTemplate,
    };

    if (editingId) {
      editPrompt(editingId, nextPrompt);
    } else {
      addPrompt(nextPrompt);
    }

    closeForm();
  };

  const togglePromptSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const applyBulkEdit = (patch: Partial<IPrompt>) => {
    selectedPrompts.forEach((prompt) => {
      editPrompt(prompt.id, { ...prompt, ...patch });
    });
    clearSelection();
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => removePrompt(id));
    clearSelection();
  };

  const handleBulkExportJson = () => {
    exportJson(selectedPrompts, "selected-prompts.json");
  };

  const handleBackup = () => {
    exportJson(prompts, "prompts-backup.json");
  };

  const handleExportMarkdown = () => {
    exportMarkdown(prompts, "prompts.md");
  };

  const bulkActionButtons = [
    {
      title: "Pin selected",
      iconClassName: "icon-[mdi--pin] text-zinc-50",
      buttonClassName: "bg-gray-600",
      onClick: () => applyBulkEdit({ isPinned: true }),
    },
    {
      title: "Unpin selected",
      iconClassName: "icon-[mdi--pin-off] text-zinc-50",
      buttonClassName: "bg-gray-600",
      onClick: () => applyBulkEdit({ isPinned: false }),
    },
    {
      title: "Mark selected as template",
      iconClassName: "icon-[mdi--page-layout-body] text-zinc-50",
      buttonClassName: "bg-gray-600",
      onClick: () => applyBulkEdit({ isTemplate: true }),
    },
    {
      title: "Unmark selected as template",
      iconClassName: "icon-[mdi--page-layout-body] text-zinc-50 opacity-50",
      buttonClassName: "bg-gray-600",
      onClick: () => applyBulkEdit({ isTemplate: false }),
    },
    {
      title: "Export selected JSON",
      iconClassName: "icon-[mdi--content-copy] text-zinc-50",
      buttonClassName: "bg-gray-600",
      onClick: handleBulkExportJson,
    },
    {
      title: "Delete selected",
      iconClassName: "icon-[mdi--trash-can] text-zinc-50",
      buttonClassName: "bg-red-600",
      onClick: handleDeleteSelected,
    },
  ];

  const actionButtons = [
    {
      label: "Create",
      onClick: openCreateForm,
    },
    {
      label: "Import",
      onClick: () => fileInputRef.current?.click(),
    },
    {
      label: "Backup",
      onClick: handleBackup,
    },
    {
      label: "Export MD",
      onClick: handleExportMarkdown,
    },
  ];

  return (
    <div className="flex h-screen max-h-screen flex-1 flex-col gap-4 overflow-hidden bg-zinc-50 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 px-4">
          <button
            type="button"
            className="flex items-center justify-between rounded border bg-white px-3 py-2 text-sm shadow"
            onClick={() => setIsQuickActionsOpen((prev) => !prev)}
          >
            <span>Actions</span>
            <span className="text-xs text-zinc-500">{isQuickActionsOpen ? "Hide" : "Show"}</span>
          </button>

          {isQuickActionsOpen && (
            <div className="grid grid-cols-4 gap-2 rounded border bg-white p-2 shadow">
              {actionButtons.map(({ label, onClick }) => (
                <button
                  key={label}
                  type="button"
                  className="rounded border bg-zinc-50 px-3 py-2 text-sm"
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {selectedIds.length > 0 && (
            <div className="rounded border bg-white p-3 text-sm shadow">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">{selectedIds.length} selected</span>
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-gray-600 text-xs"
                  title="Clear selection"
                  aria-label="Clear selection"
                  onClick={clearSelection}
                >
                  <div className="icon-[mdi--close] text-zinc-50" />
                </button>
              </div>
              <div className="flex gap-2">
                {bulkActionButtons.map(({ title, iconClassName, buttonClassName, onClick }) => (
                  <button
                    key={title}
                    type="button"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm ${buttonClassName}`}
                    title={title}
                    aria-label={title}
                    onClick={onClick}
                  >
                    <div className={iconClassName} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <PromptFilterBar />

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={importJson}
        />
      </div>

      <ul className="flex max-h-fit flex-col overflow-y-auto">
        {shownPrompts.map((prompt) => (
          <li
            key={prompt.id}
            className="cursor-pointer"
            onClick={() => setOpenedId((prev) => (prev === prompt.id ? null : prompt.id))}
          >
            <PromptCard
              prompt={prompt}
              isOpen={openedId === prompt.id}
              isSelected={selectedIds.includes(prompt.id)}
              onSelect={() => togglePromptSelection(prompt.id)}
              onEdit={() => openEditForm(prompt)}
              onDelete={() => removePrompt(prompt.id)}
              onCopy={() => {
                copy(prompt.content);
                editPrompt(prompt.id, { ...prompt, lastUsedAt: Date.now() });
              }}
              togglePin={() => editPrompt(prompt.id, { ...prompt, isPinned: !prompt.isPinned })}
              toggleTemplate={() =>
                editPrompt(prompt.id, { ...prompt, isTemplate: !prompt.isTemplate })
              }
            />
          </li>
        ))}
        {shownPrompts.length === 0 && (
          <div className="flex items-center justify-center p-4">Empty</div>
        )}
      </ul>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editingId ? "Edit Prompt" : "New Prompt"}</h2>
              <button onClick={closeForm}>Close</button>
            </div>

            <div className="grid gap-3">
              <textarea
                placeholder="Prompt content"
                className="min-h-40 rounded border p-2"
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              />
              <input
                placeholder="Tags, comma separated"
                className="rounded border p-2"
                value={form.tags}
                onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
              />
              <input
                placeholder="Source URL"
                className="rounded border p-2"
                value={form.sourceUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, sourceUrl: e.target.value }))}
              />
              <select
                className="rounded border p-2"
                value={form.site}
                onChange={(e) => setForm((prev) => ({ ...prev, site: e.target.value as Site }))}
              >
                <option value="">custom</option>
                {Object.values(Site).map((site) => (
                  <option key={site} value={site}>
                    {site}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isPinned}
                  onChange={(e) => setForm((prev) => ({ ...prev, isPinned: e.target.checked }))}
                />
                Pinned
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isTemplate}
                  onChange={(e) => setForm((prev) => ({ ...prev, isTemplate: e.target.checked }))}
                />
                Template
              </label>
              <div className="flex justify-end gap-2">
                <button onClick={closeForm}>Cancel</button>
                <button onClick={saveForm}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptWorkspace;
