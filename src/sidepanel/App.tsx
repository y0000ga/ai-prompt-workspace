import { useState } from "react";

import StatusItem from "@/sidepanel/components/StatusItem";
import AddStatus from "@/sidepanel/components/AddStatus";

import useNoteStorage from "./hooks/useNoteStorage";

const defaultStatusOptions = [
  { label: "✅", value: "完成" },
  { label: "🔄", value: "等待結果" },
  { label: "⚠️", value: "獲得結果但未確認" },
  { label: "🟥", value: "待處理" },
  { label: "⏳", value: "處理中" },
];

const App = () => {
  const { note, handleSaveNote, isLoading, isSaving, setNote } = useNoteStorage();

  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isStatusSetting, setIsStatusSetting] = useState(true);
  const [statusOptions, setStatusOptions] = useState(defaultStatusOptions);

  return (
    <>
      <div className="flex h-screen flex-1 flex-col gap-4 overflow-x-hidden bg-zinc-800 p-4">
        <div className="flex gap-4">
          {isOpenSetting ? (
            <>
              <div
                onClick={() => {
                  setIsOpenSetting((prev) => !prev);
                }}
                className="icon-[mdi--arrow-collapse-left] cursor-pointer text-xl text-white"
              ></div>
              <div
                className="icon-[mdi--add-box] text-xl text-white"
                onClick={() => {
                  setIsAddOpen(true);
                }}
              ></div>
              <div
                className="icon-[mdi--settings] text-xl text-white"
                onClick={() => {
                  setIsAddOpen(true);
                }}
              ></div>
            </>
          ) : (
            <div
              onClick={() => {
                setIsOpenSetting((prev) => !prev);
              }}
              className="icon-[mdi--arrow-collapse-right] cursor-pointer text-xl text-white"
            ></div>
          )}
        </div>
        {isAddOpen && (
          <AddStatus
            onAdd={(title) => {
              setNote((prev) => [...prev, { status: "StatusA", title, history: [] }]);
            }}
            onClose={() => {
              setIsAddOpen(false);
            }}
          />
        )}
        <ul>
          {note.map(({ title, status, history }, index) => (
            <StatusItem
              title={title}
              status={status}
              history={history}
              key={index}
              onDelete={() => {
                setNote((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
              }}
              onEdit={() => {}}
            />
          ))}
        </ul>
      </div>
      <div className="fixed right-0 bottom-4 mx-4 flex items-center justify-end gap-4">
        {!isSaving && (
          <button
            onClick={() => {
              handleSaveNote(note);
            }}
            className="icon-[mdi--content-save] text-xl text-white"
          />
        )}
        {isSaving ? (
          <span className="icon-[mdi--autorenew] text-xl text-white"></span>
        ) : (
          <span className="icon-[mdi--done-all] text-xl text-white"></span>
        )}
      </div>
      {isStatusSetting && (
        <div className="fixed top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 border bg-black p-4">
          <div>設定狀態</div>
          {statusOptions.length === 0 ? (
            <div> no status defination</div>
          ) : (
            <ul>
              {statusOptions.map(({ label, value }) => (
                <li key={value} className="flex gap-4">
                  <div>{label}</div>
                  <div>{value}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default App;
