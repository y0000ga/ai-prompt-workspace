import { useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useSortable } from "@dnd-kit/sortable";
import dayjs from "dayjs";

import { IEvent } from "@/sidepanel/types/common";
import useClickOutside from "@/sidepanel/hooks/useClickOutside";
import { useStatusOptions } from "@/sidepanel/context/statusOption";
import { useNote } from "@/sidepanel/context/note";
import { DefaultTextareaProps } from "@/sidepanel/constants/config";

import HistoryItem from "../History/ListItem";
import AddHistory from "../History/NewItem";
import AutoResizeTextarea from "../UI/AutoResizeTextarea";

interface IProps extends IEvent {
  forceCollapse?: boolean;
}

const EventListItem = ({ title, status, history, isPinned, forceCollapse, sort, id }: IProps) => {
  const { statusOptions } = useStatusOptions();

  const [isExtended, setIsExtended] = useState(true);
  const [isEditStatus, setIsEditStatus] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isDragging } = useSortable({ id: sort });

  const showExtended = useMemo(() => !forceCollapse && isExtended, [forceCollapse, isExtended]);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  useClickOutside(menuRef, () => setIsMenuOpen(false));

  const { remove: removeNote, edit: editNote } = useNote();

  const onEdit = (updated: Partial<IEvent>) => {
    editNote(id, updated);
  };

  return (
    <>
      <div
        onClick={() => {
          setIsExtended((prev) => !prev);
        }}
        className={classNames(
          "relative flex max-w-full flex-grow items-center justify-between gap-4"
        )}
      >
        <div className="grid w-full grid-cols-[auto_1fr_auto] grid-rows-1 items-center gap-4">
          <div className="col-span-1 flex items-center justify-center gap-2">
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
                {statusOptions.find(({ value }) => value === status)?.label || status}
              </div>
            )}
            {isPinned && <button className="icon-[mdi--pin] text-lg text-zinc-600" />}
          </div>
          <AutoResizeTextarea
            {...DefaultTextareaProps}
            value={title}
            onChange={(e) => {
              onEdit({ title: e.target.value });
            }}
            className="col-span-1 w-full text-lg font-extrabold"
          />
          <button
            ref={menuBtnRef}
            className="icon-[mdi--dots-vertical] col-span-1 text-lg text-zinc-600"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            disabled={isDragging}
          ></button>
        </div>

        {isMenuOpen && !isDragging && (
          <div
            ref={menuRef}
            className="absolute top-6 right-0 z-20 flex translate-x-1/4 flex-col gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-2 shadow-lg"
          >
            <button
              onClick={() => {
                removeNote(id);
              }}
              className="icon-[mdi--delete] text-lg text-zinc-600"
            ></button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit({ isPinned: !isPinned });
              }}
              className={classNames(
                "text-lg text-zinc-600",
                isPinned ? "icon-[mdi--pin-off]" : "icon-[mdi--pin]"
              )}
            ></button>
          </div>
        )}
      </div>
      {showExtended && (
        <ul className="my-2 ml-10 flex flex-col gap-4">
          {history
            .sort((a, b) => dayjs(a.time).unix() - dayjs(b.time).unix())
            .map(({ time, description }, subIndex) => (
              <HistoryItem
                time={time}
                description={description}
                key={subIndex}
                onEdit={(updatedContent) => {
                  const updatedHistory = history.map((item, i) =>
                    i === subIndex ? { ...item, ...updatedContent } : item
                  );
                  onEdit({ history: updatedHistory });
                }}
                onDelete={() => {
                  const updatedHistory = history.filter((_, i) => i !== subIndex);
                  onEdit({ history: updatedHistory });
                }}
              />
            ))}
          <AddHistory
            onEdit={(newHistory) => {
              if (newHistory.description) {
                onEdit({ history: history.concat(newHistory) });
                return true;
              }
              return false;
            }}
          />
        </ul>
      )}
    </>
  );
};

export default EventListItem;
