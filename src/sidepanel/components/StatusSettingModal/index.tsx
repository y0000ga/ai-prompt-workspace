import { PropsWithChildren } from "react";

import { useStatusOptions } from "@/sidepanel/context/statusOption";

import Modal from "../UI/Modal";

import OptionItem from "./components/OptionItem";
import NewOption from "./components/NewOption";

interface IProps {
  onClose: () => void;
}

const ItemWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex w-full items-center gap-1">{children}</div>
);

const StatusSettingModal = ({ onClose }: IProps) => {
  const { statusOptions, edit: editStatusOption, remove: removeStatusOption } = useStatusOptions();

  return (
    <Modal onClose={onClose} title="Status Setting">
      <ul className="flex flex-col gap-2">
        {statusOptions.map(({ label, value }, index) => (
          <ItemWrapper key={index}>
            <OptionItem
              label={label}
              value={value}
              onEdit={(editedOption) => {
                editStatusOption(index, editedOption);
              }}
              onDelete={() => {
                removeStatusOption(index);
              }}
            />
          </ItemWrapper>
        ))}
        <ItemWrapper>
          <NewOption />
        </ItemWrapper>
      </ul>
    </Modal>
  );
};

export default StatusSettingModal;
