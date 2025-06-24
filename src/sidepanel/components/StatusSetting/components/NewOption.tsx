import { useMemo, useState } from "react";
import EmojiPicker from "emoji-picker-react";

import { ITag } from "@/sidepanel/types/common";

const initStatus = {
  value: "",
  // TODO: label 之後可以加上 emoji 套件
  label: "",
};

const NewOption = ({ onAdd, options }: { onAdd: (tag: ITag) => void; options: ITag[] }) => {
  const [newStatus, setNewStatus] = useState(initStatus);

  const isAddDisabled = useMemo(() => {
    return (
      !!options.find((item) => item.label === newStatus.label && item.value === newStatus.value) ||
      !newStatus.label ||
      !newStatus.value
    );
  }, [newStatus.label, newStatus.value, options]);

  return (
    <>
      <input
        value={newStatus.label}
        onChange={(e) => {
          setNewStatus((prev) => ({ ...prev, label: e.target.value }));
        }}
        placeholder="label"
        className="w-12 p-1 whitespace-nowrap"
        maxLength={1}
      />
      <input
        value={newStatus.value}
        onChange={(e) => {
          setNewStatus((prev) => ({ ...prev, value: e.target.value }));
        }}
        placeholder="value"
        className="flex-grow p-1"
      />
      <button
        disabled={isAddDisabled}
        className="icon-[mdi--add-box] flex-shrink-0 text-lg text-gray-600"
        onClick={() => {
          if (newStatus.label && newStatus.value) {
            onAdd(newStatus);
            setNewStatus(initStatus);
          }
        }}
      ></button>


    </>
  );
};

export default NewOption;
