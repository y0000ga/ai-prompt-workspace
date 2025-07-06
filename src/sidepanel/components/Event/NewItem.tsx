import { useState } from "react";

import { DEFAULT_STATUS, DefaultTextareaProps } from "@/sidepanel/constants/config";
import { IEvent } from "@/sidepanel/types/common";

import AutoResizeTextarea from "../UI/AutoResizeTextarea";

interface IProps {
  onAdd: (title: IEvent["title"]) => void;
}

const NewEvent = ({ onAdd }: IProps) => {
  const [title, setTitle] = useState(DEFAULT_STATUS);
  return (
    <div className="mx-4 flex items-center justify-between gap-4 rounded-md border-[0.5px] border-zinc-200 p-4 shadow-xl">
      <AutoResizeTextarea
        {...DefaultTextareaProps}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button
        className="icon-[mdi--add-box] text-xl text-gray-600"
        disabled={!title}
        onClick={() => {
          onAdd(title);
          setTitle(DEFAULT_STATUS);
        }}
      />
    </div>
  );
};

export default NewEvent;
