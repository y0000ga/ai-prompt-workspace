import { PropsWithChildren, useState } from "react";

import { ITag } from "@/sidepanel/types/common";

import OptionItem from "./components/OptionItem";
import NewOption from "./components/NewOption";
import EmojiPicker from "emoji-picker-react";

interface IProps {
  title: string;
  onClose: () => void;
  options: ITag[];
  onAdd: ({ label, value }: ITag) => void;
  onDelete: (index: number) => void;
  onEdit: (index: number, { label, value }: ITag) => void;
}

const ItemWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex w-full items-center gap-1">{children}</div>
);

const StatusSetting = ({ onClose, options, onAdd, title, onDelete, onEdit }: IProps) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-zinc-800 opacity-60"
        onClick={onClose}
      ></div>
      <div className="fixed top-1/2 left-1/2 flex w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl bg-zinc-200 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          {title} <button className="icon-[mdi--close]" onClick={onClose}></button>
        </div>
        <ul className="flex flex-col gap-2">
          {options.length === 0 ? (
            <ItemWrapper>No Status Definition</ItemWrapper>
          ) : (
            options.map(({ label, value }, index) => (
              <ItemWrapper key={index}>
                <OptionItem
                  label={label}
                  value={value}
                  onEdit={({ label, value }) => {
                    onEdit(index, { label, value });
                  }}
                  onDelete={() => {
                    onDelete(index);
                  }}
                />
              </ItemWrapper>
            ))
          )}
          <ItemWrapper>
            <NewOption onAdd={onAdd} options={options} />
          </ItemWrapper>
        </ul>
        <EmojiPicker onEmojiClick={(event, emojiObject) => console.log(emojiObject.emoji)} />
      </div>
    </>
  );
};

export default StatusSetting;
