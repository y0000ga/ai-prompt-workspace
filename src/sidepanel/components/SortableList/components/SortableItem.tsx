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
      className="relative flex w-full max-w-full flex-col rounded-md border border-zinc-200 bg-zinc-50 p-4 shadow-xl"
    >
      <div className="absolute -top-3 -left-2 flex cursor-grab items-center justify-center rounded-full border border-zinc-200 bg-white">
        <button className="icon-[mdi--drag] !cursor-grab text-xl" {...listeners} />
      </div>

      {children}
    </li>
  );
};

export default SortableItem;
