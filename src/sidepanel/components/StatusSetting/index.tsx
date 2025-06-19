import { useState } from "react";

import { ITag } from "@/sidepanel/types/common";

const initStatus = {
  value: "",
  // TODO: label 之後可以加上 emoji 套件
  label: "",
};

const StatusSetting = ({
  onClose,
  options,
  onAdd,
  title,
  onDelete,
}: {
  title: string;
  onClose: () => void;
  options: ITag[];
  onAdd: ({ label, value }: ITag) => void;
  onDelete: ({ label, value }: ITag) => void;
}) => {
  const [newStatus, setNewStatus] = useState(initStatus);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-zinc-800 opacity-60"
        onClick={onClose}
      ></div>
      <div className="fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl bg-zinc-200 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          {title} <button className="icon-[mdi--close]" onClick={onClose}></button>
        </div>
        <ul className="flex flex-col gap-2">
          {options.length === 0 ? (
            <div> no status defination</div>
          ) : (
            options.map(({ label, value }) => (
              <li key={value} className="flex items-center justify-between gap-4">
                <div>
                  {label}
                  <span className="ml-4">{value}</span>
                </div>
                <button
                  className="icon-[mdi--trash-can] text-lg"
                  onClick={() => {
                    onDelete({ label, value });
                  }}
                ></button>
              </li>
            ))
          )}
          <li className="flex items-center justify-between">
            <input
              value={newStatus.label}
              onChange={(e) => {
                setNewStatus((prev) => ({ ...prev, label: e.target.value }));
              }}
              placeholder="label"
              className="w-1/4"
            />
            <input
              value={newStatus.value}
              onChange={(e) => {
                setNewStatus((prev) => ({ ...prev, value: e.target.value }));
              }}
              placeholder="value"
              className="w-1/2"
            />

            <button
              disabled={
                !!options.find(
                  (item) => item.label === newStatus.label && item.value === newStatus.value
                ) ||
                !newStatus.label ||
                !newStatus.value
              }
              className="icon-[mdi--add-box] text-xl text-gray-600"
              onClick={() => {
                if (newStatus.label && newStatus.value) {
                  onAdd(newStatus);
                  setNewStatus(initStatus);
                }
              }}
            ></button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default StatusSetting;
