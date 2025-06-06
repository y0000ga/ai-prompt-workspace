import { useCallback, useEffect, useState } from "react";

import { ChromeStorage } from "@/sidepanel/types/common";
import { loadStorage, saveStorage } from "@utils/storage";

const useNoteStorage = () => {
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const loadedNote = await loadStorage(ChromeStorage.Note);
      setNote(loadedNote);
      setIsLoading(false);
    };

    load();
  }, []);

  const handleSaveStorage = useCallback(async (note: string) => {
    setIsSaving(true);
    await saveStorage({ key: ChromeStorage.Note, value: note });
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
