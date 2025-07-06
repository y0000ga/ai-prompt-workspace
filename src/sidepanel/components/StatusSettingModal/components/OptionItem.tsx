import { ITag } from "@/sidepanel/types/common";
import { useStatusOptions } from "@/sidepanel/context/statusOption";

import OptionWrapper from "./OptionWrapper";

type TProps = ITag & { onEdit: (props: ITag) => void; onDelete: () => void };

const OptionItem = ({ label, value, onEdit, onDelete }: TProps) => {
  const { statusOptions } = useStatusOptions();
  return (
    <OptionWrapper
      onLabelEdit={(editedLabel) => {
        onEdit({ label: editedLabel, value });
      }}
      label={label}
    >
      <input
        className="flex-grow"
        type="text"
        value={value}
        onChange={(e) => {
          onEdit({ label, value: e.target.value });
        }}
      />
      <button
        disabled={statusOptions.length === 1}
        className="icon-[mdi--trash-can] flex-shrink-0 text-lg"
        onClick={onDelete}
      />
    </OptionWrapper>
  );
};

export default OptionItem;
