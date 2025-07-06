import { useMemo, useState } from "react";
import classNames from "classnames";

import StatusItem from "@/sidepanel/components/Event/ListItem";
import AddStatus from "@/sidepanel/components/Event/NewItem";
import { IEvent } from "@/sidepanel/types/common";
import SortableList from "@/sidepanel/components/SortableList";

import { useStatusOptions } from "./context/statusOption";
import { useNote } from "./context/note";
import StatusSettingModal from "./components/StatusSettingModal";

// TODO: 狀態 filter
// TODO: 每日快照
// TODO: 切換日期，瀏覽過去紀錄
// TODO: 匯入與匯出 JSON/ Markdown/CSV
// TODO: 關鍵字搜尋
// TODO: 封存
// TODO: 分類分群 - category > status
// TODO: 模板功能, e.g. 新增常用任務模板
// TODO: 通知提醒 - 使用 chrome.alarms API + Notification 搭配時間標籤
// TODO: Google Calendar 匯出與匯入 (OAuth/Google Calendar API)
// TODO: 進度視覺化

const genStatus = ({ status, title, sort }: Pick<IEvent, "status" | "title" | "sort">) => ({
  id: new Date().getTime().toString(),
  status,
  title,
  history: [],
  sort,
  isPinned: false,
});

const genSortId = ({ sort, isPinned }: IEvent) => `${sort}-${isPinned ? "p" : "u"}`;

const App = () => {
  const {
    note,
    add: addNote,
    setAll: setAllNote,
    load: loadNote,
    save: saveNote,
    isLoading: isNoteLoading,
    isSaving: isNoteSaving,
  } = useNote();

  const {
    statusOptions,
    save: saveStatusOption,
    load: loadStatusOption,
    isSaving: isStatusOptionsSaving,
    isLoading: isStatusOptionsLoading,
  } = useStatusOptions();

  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isStatusSetting, setIsStatusSetting] = useState(false);

  const pinnedNote = useMemo(() => note.filter((item) => item.isPinned), [note]);

  const unpinnedNote = useMemo(() => note.filter((item) => !item.isPinned), [note]);

  const isLoading = useMemo(
    () => isNoteLoading || isStatusOptionsLoading,
    [isNoteLoading, isStatusOptionsLoading]
  );

  const isSaving = useMemo(
    () => isNoteSaving || isStatusOptionsSaving,
    [isNoteSaving, isStatusOptionsSaving]
  );

  const buttonOptions = useMemo(
    () =>
      isOpenSetting
        ? [
            {
              icon: "icon-[mdi--settings]",
              onClick: () => {
                setIsStatusSetting(true);
              },
            },
            {
              icon: "icon-[mdi--export-variant]",
              onClick: () => {},
            },
            {
              icon: "icon-[mdi--hamburger-close]",
              onClick: () => {
                setIsOpenSetting((prev) => !prev);
              },
            },
          ]
        : [
            {
              icon: "icon-[mdi--hamburger-open]",
              onClick: () => {
                setIsOpenSetting((prev) => !prev);
              },
            },
          ],
    [isOpenSetting]
  );

  return (
    <>
      <div className="flex h-screen max-h-screen flex-1 flex-col gap-4 overflow-hidden overflow-x-hidden bg-zinc-50 py-4">
        <div className={classNames("flex items-center justify-end gap-4 px-4")}>
          {buttonOptions.map(({ icon, onClick }) => (
            <button
              key={icon}
              className={classNames("cursor-pointer text-xl text-gray-600", icon)}
              onClick={onClick}
            ></button>
          ))}
        </div>

        <AddStatus
          onAdd={(title) => {
            addNote(
              genStatus({
                status: statusOptions[0].value,
                title,
                sort: note.length,
              })
            );
          }}
        />

        <div className="flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto px-4">
          <SortableList<IEvent>
            items={pinnedNote}
            onChange={(changedList) => {
              const updated = changedList.map((item, index) => ({ ...item, sort: index }));
              setAllNote([...unpinnedNote, ...updated]);
            }}
            getId={genSortId}
            render={(renderItem) => <StatusItem {...renderItem} />}
          />
          <SortableList<IEvent>
            items={unpinnedNote}
            onChange={(changedList) => {
              const updated = changedList.map((item, index) => ({ ...item, sort: index }));
              setAllNote([...pinnedNote, ...updated]);
            }}
            getId={genSortId}
            render={(renderItem) => <StatusItem {...renderItem} />}
          />
        </div>
        <div className="mx-4 flex items-center justify-end gap-4 px-4">
          {!isLoading && (
            <button
              onClick={() => {
                loadNote();
                loadStatusOption();
              }}
              className="icon-[mdi--download-box] text-xl text-zinc-600"
            />
          )}
          {!isSaving && (
            <button
              onClick={() => {
                saveNote();
                saveStatusOption();
              }}
              className="icon-[mdi--content-save] text-xl text-gray-600"
            />
          )}
          <button
            className={classNames(
              "text-xl text-gray-600",
              isSaving ? "icon-[mdi--autorenew]" : "icon-[mdi--done-all]"
            )}
          />
        </div>
      </div>
      {isStatusSetting && (
        <StatusSettingModal
          onClose={() => {
            setIsStatusSetting(false);
          }}
        />
      )}
    </>
  );
};

export default App;
