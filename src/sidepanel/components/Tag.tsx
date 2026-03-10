import classNames from "classnames";

import { ITag } from "../types/common";

interface IProps extends ITag {
  onClick: (() => void) | null;
  isSelected: boolean;
  onDelete: (() => void) | null;
}

const Tag = ({ name, onClick, isSelected, onDelete }: IProps) => (
  <div
    className={classNames(
      "flex items-center gap-1 rounded border border-gray-200 px-1 py-0.5 text-sm text-zinc-100",
      isSelected ? "bg-gray-600" : "bg-gray-400",
      onClick ? "cursor-pointer" : "cursor-default"
    )}
    onClick={onClick ?? undefined}
  >
    <span>{name}</span>
    {onDelete && (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="icon-[mdi--remove-bold]"
      />
    )}
  </div>
);

export default Tag;
