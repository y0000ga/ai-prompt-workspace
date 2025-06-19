import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PropsWithChildren } from "react";

type SortableItemProps = {
  id: string;
};

const SortableItem = ({ id, children }: PropsWithChildren<SortableItemProps>) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative flex cursor-grab flex-col rounded-md border border-zinc-200 bg-zinc-50 p-4 shadow-xl"
    >
      <div className="icon-[mdi--drag] absolute top-4 left-4 text-xl" {...listeners}></div>
      {children}
    </li>
  );
};

export default SortableItem;
