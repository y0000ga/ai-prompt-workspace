import { useState } from "react";

import { ITag } from "@/sidepanel/types/common";

const OptionItem = ({
  label,
  value,
  onEdit,
  onDelete,
}: ITag & { onEdit: (props: ITag) => void; onDelete: () => void }) => {
  const [isEditLabel, setIsEditLabel] = useState(false);
  const [isEditValue, setIsEditValue] = useState(false);
  return (
    <>
      {isEditLabel ? (
        <input
          className="p-1 whitespace-nowrap w-12"
          type="text"
          value={label}
          onChange={(e) => {
            onEdit({ label: e.target.value, value });
          }}
          onBlur={() => setIsEditLabel(false)}
          maxLength={1}
        />
      ) : (
        <div className="whitespace-nowrap" onClick={() => setIsEditLabel(true)}>
          {label}
        </div>
      )}
      {isEditValue ? (
        <input
          className="flex-grow p-1"
          type="text"
          value={value}
          onChange={(e) => {
            onEdit({ label, value: e.target.value });
          }}
          onBlur={() => setIsEditValue(false)}
        />
      ) : (
        <div className="flex-grow truncate" onClick={() => setIsEditValue(true)}>
          {value}
        </div>
      )}

      <button className="icon-[mdi--trash-can] flex-shrink-0 text-lg" onClick={onDelete}></button>
    </>
  );
};

export default OptionItem;
