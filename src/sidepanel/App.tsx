import useNoteStorage from "./hooks/useNoteStorage";

const App = () => {
  const { note, handleSaveNote, isLoading, isSaving, setNote } = useNoteStorage();

  return (
    <div className="flex h-screen flex-col gap-4 bg-zinc-900 p-4">
      <h1 className="text-xl font-bold text-white">Notes</h1>
      <div className="flex flex-1 flex-col overflow-hidden rounded border p-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={isLoading ? "Loading" : "Write your note here..."}
          className="w-full flex-1 resize-none rounded bg-zinc-800 p-3 text-base text-white focus:outline-none"
        />
      </div>
      <div className="flex w-full justify-end gap-4">
        {!isSaving && (
          <button
            onClick={() => {
              handleSaveNote(note);
            }}
          >
            Save Now
          </button>
        )}
        <div>{isSaving ? "isSaving" : "Saving Finish"}</div>
      </div>
    </div>
  );
};

export default App;
