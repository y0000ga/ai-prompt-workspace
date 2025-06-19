import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useSortable } from "@dnd-kit/sortable";

import { IStatusItem, ITag } from "@/sidepanel/types/common";
interface IProps extends IStatusItem {
  onDelete: () => void;
  onEdit: (params: {
    title?: string;
    status?: string;
    history?: {
      time: string;
      description: string;
    }[];
    isPinned?: boolean;
  }) => void;
  statusOptions: ITag[];
  timeOptions: ITag[];
  forceCollapse?: boolean;
}

const HistoryItem = ({
  time,
  description,
  onEdit,
  timeOptions,
}: {
  time: string;
  description: string;
  onEdit: (params: { time?: string; description?: string }) => void;
  timeOptions: ITag[];
}) => {
  const [isEditTime, setIsEditTime] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);
  return (
    <li className="flex gap-4 p-2">
      {isEditTime ? (
        <select
          value={time}
          onChange={(e) => {
            onEdit({ time: e.target.value });
            setIsEditTime(false);
          }}
        >
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div
          onClick={() => {
            setIsEditTime(true);
          }}
        >
          {timeOptions.find(({ value }) => value === time)?.label || "undefined"}
        </div>
      )}
      {isEditDescription ? (
        <input
          placeholder="Fill in description"
          value={description}
          onChange={(e) => {
            onEdit({ description: e.target.value });
          }}
          onBlur={() => {
            setIsEditDescription(false);
          }}
        />
      ) : (
        <div
          onClick={() => {
            setIsEditDescription(true);
          }}
        >
          {description}
        </div>
      )}
    </li>
  );
};

const StatusItem = ({
  title,
  status,
  history,
  isPinned,
  forceCollapse,
  onDelete,
  onEdit,
  statusOptions,
  timeOptions,
  sort,
}: IProps) => {
  const [isExtended, setIsExtended] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditStatus, setIsEditStatus] = useState(false);
  const [newHistory, setNewHistory] = useState({ time: timeOptions[0].value, description: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isDragging } = useSortable({ id: sort });

  const showExtended = useMemo(() => !forceCollapse && isExtended, [forceCollapse, isExtended]);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        onClick={(e) => {
          setIsExtended((prev) => !prev);
        }}
        className={classNames(
          "relative ml-8 flex flex-grow items-center justify-between gap-4",
          showExtended && "border-b border-zinc-200 pb-2"
        )}
      >
        <div className="flex gap-4">
          {isEditStatus ? (
            <select
              value={status}
              onChange={(e) => {
                onEdit({ status: e.target.value });
                setIsEditStatus(false);
              }}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <div
              onClick={() => {
                setIsEditStatus(true);
              }}
            >
              {statusOptions.find(({ value }) => value === status)?.label || "undefined"}
            </div>
          )}
          <div className="flex items-center gap-2">
            {isPinned && <div className="icon-[mdi--pin] text-lg text-zinc-600"></div>}
            {isEditTitle ? (
              <input
                placeholder="Fill In Title"
                value={title}
                onChange={(e) => {
                  onEdit({ title: e.target.value });
                }}
                onBlur={() => {
                  setIsEditTitle(false);
                }}
              />
            ) : (
              <div
                onClick={() => {
                  setIsEditTitle(true);
                }}
              >
                {title}
              </div>
            )}
          </div>
        </div>
        <button
          className="icon-[mdi--dots-vertical] text-lg text-zinc-600"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
          disabled={isDragging}
        ></button>
        {isMenuOpen && !isDragging && (
          <div
            ref={menuRef}
            className="absolute top-6 right-0 z-20 flex flex-col gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-2 shadow-lg"
          >
            <div onClick={onDelete} className="flex items-center gap-2">
              <button className="icon-[mdi--delete] text-lg text-zinc-600"></button>
              <div className="text-sm font-bold text-zinc-600">Delete</div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onEdit({ isPinned: !isPinned });
              }}
              className="flex items-center gap-2"
            >
              <button
                className={classNames(
                  "text-lg text-zinc-600",
                  isPinned ? "icon-[mdi--pin-off]" : "icon-[mdi--pin]"
                )}
              ></button>
              <div className="text-sm font-bold text-zinc-600">Pin</div>
            </div>
          </div>
        )}
      </div>
      {showExtended && (
        <ul className="ml-8 w-[calc(100%-32px)]">
          {history.length === 0 ? (
            <li className="p-2">No history</li>
          ) : (
            history.map(({ time, description }, subIndex) => (
              <HistoryItem
                timeOptions={timeOptions}
                time={time}
                description={description}
                key={subIndex}
                onEdit={(updatedContent) => {
                  const updatedHistory = history.map((item, i) =>
                    i === subIndex ? { ...item, ...updatedContent } : item
                  );
                  onEdit({ history: updatedHistory });
                }}
              />
            ))
          )}
          <div className="flex items-center justify-between p-2">
            <div>
              <select
                value={newHistory.time}
                onChange={(e) => {
                  setNewHistory((prev) => ({ ...prev, time: e.target.value }));
                }}
                className="-translate-x-1"
              >
                {timeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                placeholder="Fill in history"
                value={newHistory.description}
                onChange={(e) => {
                  setNewHistory((prev) => ({ ...prev, description: e.target.value }));
                }}
              />
            </div>
            <button
              onClick={() => {
                onEdit({ history: [...history, newHistory] });
                setNewHistory({ time: timeOptions[0].value, description: "" });
              }}
              className="icon-[mdi--add-box] text-xl text-gray-600"
            ></button>
          </div>
        </ul>
      )}
    </>
  );
};

export default StatusItem;
