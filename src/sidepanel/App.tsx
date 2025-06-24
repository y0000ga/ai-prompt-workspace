import { useMemo, useState } from "react";
import classNames from "classnames";

import StatusItem from "@/sidepanel/components/StatusItem";
import AddStatus from "@/sidepanel/components/AddStatus";
import StatusSetting from "@/sidepanel/components/StatusSetting";
import useChromeStorage from "@/sidepanel/hooks/useChromeStorage";
import { ChromeStorage, IStatusItem, ITag } from "@/sidepanel/types/common";
import {
  DEFAULT_NOTE,
  DEFAULT_STATUS_OPTIONS,
  DEFAULT_TIME_OPTIONS,
} from "@/sidepanel/utils/constants";
import SortableList from "@/sidepanel/components/SortableList";

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

const App = () => {
  const {
    value: note,
    handleSaveStorage: handleSaveNoteStorage,
    isLoading: isNoteLoading,
    handleLoadStorage: handleLoadNoteStorage,
    isSaving,
    setValue: setNote,
  } = useChromeStorage<IStatusItem[]>({
    defaultValue: DEFAULT_NOTE,
    key: ChromeStorage.Note,
  });

  const {
    value: timeOptions,
    handleSaveStorage: handleSaveTimeOptionsStorage,
    handleLoadStorage: handleLoadTimeOptionsStorage,
    setValue: setTimeOptions,
    isLoading: isTimeOptionsLoading,
  } = useChromeStorage<ITag[]>({
    defaultValue: DEFAULT_TIME_OPTIONS,
    key: ChromeStorage.TimeOptions,
  });

  const {
    value: statusOptions,
    handleSaveStorage: handleSaveStatusOptionsStorage,
    handleLoadStorage: handleLoadStatusOptionsStorage,
    setValue: setStatusOptions,
    isLoading: isStatusOptionsLoading,
  } = useChromeStorage<ITag[]>({
    defaultValue: DEFAULT_STATUS_OPTIONS,
    key: ChromeStorage.TimeOptions,
  });

  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isStatusSetting, setIsStatusSetting] = useState(true);
  const [isTimeSetting, setIsTimeSetting] = useState(false);

  const pinnedNote = useMemo(() => note.filter((item) => item.isPinned), [note]);

  const unpinnedNote = useMemo(() => note.filter((item) => !item.isPinned), [note]);

  const isLoading = useMemo(() => {
    return isNoteLoading || isTimeOptionsLoading || isStatusOptionsLoading;
  }, [isNoteLoading, isTimeOptionsLoading, isStatusOptionsLoading]);

  return (
    <>
      <div className="flex h-screen max-h-screen flex-1 flex-col gap-4 overflow-hidden overflow-x-hidden bg-zinc-50 py-4">
        <div className={classNames("flex items-center justify-end gap-4 px-4")}>
          {isOpenSetting ? (
            <>
              <button
                aria-label="setting status setting"
                className="icon-[mdi--settings] text-xl text-gray-600"
                onClick={() => {
                  setIsStatusSetting(true);
                }}
              ></button>
              <button
                aria-label="setting time options"
                className="icon-[mdi--sun-clock] text-xl text-gray-600"
                onClick={() => {
                  setIsTimeSetting(true);
                }}
              ></button>
              <button
                aria-label="export"
                className="icon-[mdi--export-variant] cursor-pointer text-xl text-gray-600"
              ></button>
              <button
                aria-label="open setting"
                onClick={() => {
                  setIsOpenSetting((prev) => !prev);
                }}
                className="icon-[mdi--hamburger-close] cursor-pointer text-xl text-gray-600"
              ></button>
            </>
          ) : (
            <div
              onClick={() => {
                setIsOpenSetting((prev) => !prev);
              }}
              className="icon-[mdi--hamburger-open] cursor-pointer text-xl text-gray-600"
            ></div>
          )}
        </div>

        <AddStatus
          onAdd={(title) => {
            if (!title) {
              return;
            }
            setNote((prev) => [
              ...prev,
              {
                id: new Date().getTime().toString(),
                status: statusOptions[0].value,
                title,
                history: [],
                sort: prev.length,
                isPinned: false,
              },
            ]);
          }}
        />
        <div className="flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto px-4">
          <SortableList<IStatusItem>
            items={pinnedNote}
            onChange={(newList) => {
              const updated = newList.map((item, idx) => ({ ...item, sort: idx }));
              setNote([...unpinnedNote, ...updated]);
            }}
            getId={(item) => `${item.sort}-${item.isPinned ? "p" : "u"}`}
            render={(renderItem) => (
              <StatusItem
                {...renderItem}
                onDelete={() => {
                  setNote((prev) => prev.filter((prevItem) => prevItem.id !== renderItem.id));
                }}
                onEdit={(updatedContent) => {
                  setNote((prev) =>
                    prev.map((item) =>
                      item.id === renderItem.id ? { ...item, ...updatedContent } : item
                    )
                  );
                }}
                statusOptions={statusOptions}
                timeOptions={timeOptions}
              />
            )}
          />
          <SortableList<IStatusItem>
            items={unpinnedNote}
            onChange={(newList) => {
              const updated = newList.map((item, idx) => ({ ...item, sort: idx }));
              setNote([...pinnedNote, ...updated]);
            }}
            getId={(item) => `${item.sort}-${item.isPinned ? "p" : "u"}`}
            render={(renderItem) => (
              <StatusItem
                {...renderItem}
                onDelete={() => {
                  setNote((prev) => prev.filter((prevItem) => prevItem.id !== renderItem.id));
                }}
                onEdit={(updatedContent) => {
                  setNote((prev) =>
                    prev.map((item) =>
                      renderItem.id === item.id ? { ...item, ...updatedContent } : item
                    )
                  );
                }}
                statusOptions={statusOptions}
                timeOptions={timeOptions}
              />
            )}
          />
        </div>
        <div className="mx-4 flex items-center justify-end gap-4 px-4">
          {!isLoading && (
            <button
              onClick={() => {
                handleLoadNoteStorage();
                handleLoadTimeOptionsStorage();
                handleLoadStatusOptionsStorage;
              }}
              className="icon-[mdi--download-box] text-xl text-zinc-600"
            />
          )}
          {!isSaving && (
            <button
              onClick={() => {
                handleSaveNoteStorage();
                handleSaveTimeOptionsStorage();
                handleSaveStatusOptionsStorage();
              }}
              className="icon-[mdi--content-save] text-xl text-gray-600"
            />
          )}
          <span
            className={classNames(
              "text-xl text-gray-600",
              isSaving ? "icon-[mdi--autorenew]" : "icon-[mdi--done-all]"
            )}
          ></span>
        </div>
      </div>

      {isTimeSetting && (
        <StatusSetting
          title="設定時間"
          onClose={() => {
            setIsTimeSetting(false);
          }}
          onDelete={(index) => {
            setStatusOptions((prev) => prev.filter((_, idx) => index !== idx));
          }}
          options={timeOptions}
          onAdd={({ label, value }) => {
            setTimeOptions((prev) => {
              const isExisted = prev.find((item) => item.label === label && item.value === value);
              return isExisted ? prev : [...prev, { label, value }];
            });
          }}
          onEdit={(index, { label, value }) => {
            setTimeOptions((prev) =>
              prev.map((item, idx) => (idx === index ? { label, value } : item))
            );
          }}
        />
      )}
      {isStatusSetting && (
        <StatusSetting
          title="設定狀態"
          onClose={() => {
            setIsStatusSetting(false);
          }}
          options={statusOptions}
          onDelete={(index) => {
            setStatusOptions((prev) => prev.filter((_, idx) => index !== idx));
          }}
          onAdd={({ label, value }) => {
            setStatusOptions((prev) => {
              const isExisted = prev.find((item) => item.label === label && item.value === value);
              return isExisted ? prev : [...prev, { label, value }];
            });
          }}
          onEdit={(index, { label, value }) => {
            setStatusOptions((prev) =>
              prev.map((item, idx) => (idx === index ? { label, value } : item))
            );
          }}
        />
      )}
    </>
  );
};

export default App;
