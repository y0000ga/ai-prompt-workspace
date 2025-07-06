import { useMemo, useState } from "react";

import { useStatusOptions } from "@/sidepanel/context/statusOption";
import { DEFAULT_STATUS_OPTION } from "@/sidepanel/constants/config";

import OptionWrapper from "./OptionWrapper";

const NewOption = () => {
  const { statusOptions, add: addStatusOption } = useStatusOptions();

  const [newStatus, setNewStatus] = useState(DEFAULT_STATUS_OPTION);
  const isAddDisabled = useMemo(() => {
    const isDuplicated = !!statusOptions.find(
      (item) => item.label === newStatus.label && item.value === newStatus.value
    );
    return isDuplicated || !newStatus.label || !newStatus.value;
  }, [newStatus.label, newStatus.value, statusOptions]);

  return (
    <OptionWrapper
      onLabelEdit={(label) => setNewStatus((prev) => ({ ...prev, label }))}
      label={newStatus.label}
    >
      <input
        value={newStatus.value}
        onChange={(e) => {
          setNewStatus((prev) => ({ ...prev, value: e.target.value }));
        }}
        placeholder="✏️ ..."
        className="flex-grow"
      />
      <button
        disabled={isAddDisabled}
        className="icon-[mdi--add-box] flex-shrink-0 text-lg text-gray-600"
        onClick={() => {
          if (!isAddDisabled) {
            addStatusOption(newStatus);
            setNewStatus(DEFAULT_STATUS_OPTION);
          }
        }}
      ></button>
    </OptionWrapper>
  );
};

export default NewOption;
