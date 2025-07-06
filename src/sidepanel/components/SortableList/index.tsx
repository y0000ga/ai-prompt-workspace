import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import SortableItem from "@/sidepanel/components/SortableList/components/SortableItem";

type Props<T> = {
  items: T[];
  onChange: (items: T[]) => void;
  getId: (item: T) => string;
  render: (item: T) => React.ReactNode;
  disabled?: boolean;
};

const SortableList = <T,>({ items, onChange, getId, render, disabled = false }: Props<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => getId(item) === active.id);
    const newIndex = items.findIndex((item) => getId(item) === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    onChange(newItems);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => setActiveId(event.active.id)}
      onDragEnd={(event) => {
        setActiveId(null);
        handleDragEnd(event);
      }}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={items.map(getId)}
        strategy={verticalListSortingStrategy}
        disabled={disabled}
      >
        <ul className="relative w-full max-w-full space-y-2">
          {items.map((item) => (
            <SortableItem key={getId(item)} id={getId(item)}>
              {render({ ...item, forceCollapse: !!activeId })}
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
