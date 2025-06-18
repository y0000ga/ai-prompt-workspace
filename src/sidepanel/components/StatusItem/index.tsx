import { useState } from "react";

import { IStatusItem } from "@/sidepanel/types/common";

interface IProps extends IStatusItem {
  onDelete: () => void;
  onEdit: () => void;
}

const StatusItem = ({ title, status, history, onDelete, onEdit }: IProps) => {
  const [isExtended, setIsExtended] = useState(false);
  return (
    <li className="border">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="icon-[mdi--delete] text-xl text-white" onClick={onDelete}></div>
          <div>{status}</div>
          <div className="">{title}</div>
        </div>
        {isExtended ? (
          <div
            onClick={() => {
              setIsExtended((prev) => !prev);
            }}
            className="icon-[mdi--chevron-up] cursor-pointer text-2xl text-white"
          ></div>
        ) : (
          <div
            onClick={() => {
              setIsExtended((prev) => !prev);
            }}
            className="icon-[mdi--chevron-down] cursor-pointer text-2xl text-white"
          ></div>
        )}
      </div>
      {isExtended && (
        <ul className="ml-4 w-[calc(100%-16px)] border">
          {history.length === 0 ? (
            <div>no history</div>
          ) : (
            history.map(({ time, description }, subIndex) => (
              <li className="flex gap-4" key={subIndex}>
                <div>{time}</div>
                <div>{description}</div>
              </li>
            ))
          )}
        </ul>
      )}
    </li>
  );
};

export default StatusItem;
