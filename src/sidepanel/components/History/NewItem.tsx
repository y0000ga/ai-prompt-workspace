import { useState } from "react";
import Flatpickr from "react-flatpickr";

import {
  createDefaultHistory,
  DefaultTextareaProps,
  FlatpickrOptions,
} from "@/sidepanel/constants/config";
import { IHistory } from "@/sidepanel/types/common";

import AutoResizeTextarea from "../UI/AutoResizeTextarea";

import Wrapper from "./Wrapper";

interface IProps {
  onEdit: (history: IHistory) => boolean;
}

const NewHistory = ({ onEdit }: IProps) => {
  const [newHistory, setNewHistory] = useState(createDefaultHistory());
  return (
    <Wrapper
      actions={[
        {
          onClick: () => {
            const isAddable = onEdit(newHistory);
            if (isAddable) {
              setNewHistory(createDefaultHistory());
            }
          },
          icon: "icon-[mdi--add-box]",
          disabled: !newHistory.description,
        },
      ]}
    >
      <Flatpickr
        value={new Date(newHistory.time)}
        onChange={([selectedDate]) => {
          setNewHistory((prev) => ({ ...prev, time: new Date(selectedDate) }));
        }}
        options={FlatpickrOptions()}
        className="text-xs text-gray-400"
      />
      <AutoResizeTextarea
        {...DefaultTextareaProps}
        value={newHistory.description}
        onChange={(e) => {
          setNewHistory((prev) => ({ ...prev, description: e.target.value }));
        }}
      />
    </Wrapper>
  );
};

export default NewHistory;
