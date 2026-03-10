import dayjs from "dayjs";
import classNames from "classnames";

import { IPrompt } from "../types/common";

import Tag from "./Tag";

interface IProps {
  prompt: IPrompt;
  isOpen: boolean;
  onCopy: () => void,
  onDelete: () => void;
  togglePin: () => void
  toggleTemplate: () => void
}

const PromptCard = ({ prompt, isOpen, onCopy, onDelete, togglePin, toggleTemplate }: IProps) => {
  const actions = [
    {
      icon: "icon-[mdi--content-copy]",
      onClick: onCopy,
    },
    {
      icon: "icon-[mdi--trash-can]",
      onClick: onDelete,
    },
    {
      icon: prompt.isPinned ? "icon-[mdi--pin-off]" : "icon-[mdi--pin]",
      onClick: togglePin
    },
    {
      icon: "icon-[mdi--link]",
      onClick: () => {
        if (!prompt.sourceUrl) {
          return
        }
        window.open(prompt.sourceUrl, "_blank", "noopener,noreferrer")
      }
    },
    {
      icon: prompt.isTemplate ? "icon-[mdi--page-layout-body]" : 'icon-[mdi--page-layout-body] text-zinc-500',
      onClick: toggleTemplate
    }
  ];
  return (
    <div className="flex flex-col gap-2 rounded border border-gray-300 p-4 shadow" key={prompt.id}>
      <div className="flex items-center justify-between text-sm">
        <p className="w-fit text-sm font-bold">{prompt.site}</p>
      </div>
      <div className="flex gap-2">
        {prompt.tags.map((item) => (
          <Tag key={item.name} onDelete={null} isSelected {...item} onClick={null} />
        ))}
      </div>
      <p className={classNames(isOpen ? "break-all" : "line-clamp-2")}>{prompt.content}</p>
      {isOpen && (
        <div className="flex flex-col border-t-1 border-gray-300 pt-2">
          <p>Last Used At {dayjs(prompt.lastUsedAt).format('YYYY/MM/DD HH:mm')}</p>
          <p>Created At {dayjs(prompt.createdAt).format("YYYY/MM/DD hh:mm")}</p>
        </div>
      )}
      <ul className="flex justify-end gap-2">
        {actions.map((item) => (
          <li key={item.icon}>
            <button
              onClick={(event) => {
                event.stopPropagation();
                item.onClick();
              }}
              className="flex items-center rounded rounded-full border bg-gray-600 p-2 text-sm"
            >
              <div className={classNames("text-zinc-50", item.icon)} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptCard;
