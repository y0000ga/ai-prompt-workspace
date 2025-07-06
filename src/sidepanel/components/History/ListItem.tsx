import Flatpickr from "react-flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import { IHistory } from "@/sidepanel/types/common";
import { DefaultTextareaProps, FlatpickrOptions } from "@/sidepanel/constants/config";

import AutoResizeTextarea from "../UI/AutoResizeTextarea";

import Wrapper from "./Wrapper";

interface IProps extends IHistory {
  onEdit: (params: Partial<IHistory>) => void;
  onDelete: () => void;
}

const HistoryListItem = ({ time, description, onEdit, onDelete }: IProps) => (
  <Wrapper hasSeparator actions={[{ onClick: onDelete, icon: "icon-[mdi--trash-can]" }]}>
    <Flatpickr
      value={time}
      onChange={([selectedDate]) => {
        onEdit({ time: new Date(selectedDate) });
      }}
      options={FlatpickrOptions()}
      className="text-xs text-gray-400"
    />
    <AutoResizeTextarea
      {...DefaultTextareaProps}
      value={description}
      onChange={(e) => {
        const updatedDescription = e.target.value;
        if (!updatedDescription) return;
        onEdit({ description: updatedDescription });
      }}
    />
  </Wrapper>
);

export default HistoryListItem;
