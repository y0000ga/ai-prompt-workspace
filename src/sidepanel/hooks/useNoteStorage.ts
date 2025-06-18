import { useCallback, useEffect, useState } from "react";

import { ChromeStorage, IStatusItem } from "@/sidepanel/types/common";
import { loadStorage, saveStorage } from "@utils/storage";

const notes: IStatusItem[] = [
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
  {
    status: "StatusA",
    title: "TitletTitletTitletTitletTitletTitlet",
    history: [
      { time: "A", description: "A1" },
      { time: "B", description: "A2" },
      { time: "C", description: "C1" },
    ],
  },
];

const useNoteStorage = () => {
  const [note, setNote] = useState<IStatusItem[]>(notes);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const loadedNote = await loadStorage(ChromeStorage.Note);
      console.log(loadedNote);
      setNote(loadedNote ? JSON.parse(loadedNote) : notes);
      setIsLoading(false);
    };

    load();
  }, []);

  const handleSaveStorage = useCallback(async (note: IStatusItem[]) => {
    setIsSaving(true);
    await saveStorage({ key: ChromeStorage.Note, value: JSON.stringify(note) });
    setIsSaving(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const timeout = setTimeout(handleSaveStorage, 5000);

    return () => clearTimeout(timeout);
  }, [note, isLoading, handleSaveStorage]);

  return {
    note,
    handleSaveNote: handleSaveStorage,
    isLoading,
    setNote,
    isSaving,
  };
};

export default useNoteStorage;
