import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTodos, useUpdateTodo } from "../../hooks/useTodos";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";

const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const KanbanBoard = () => {
  const { data: todos, isLoading } = useTodos();
  const updateTodo = useUpdateTodo();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5,
        }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTodo = todos.find((t) => t._id === active.id);
    const overId = over.id;

    // Logic to detect if we're dragging over a column or another card
    let newStatus = overId;
    if (todos.some(t => t._id === overId)) {
      newStatus = todos.find(t => t._id === overId).status;
    }

    if (activeTodo.status !== newStatus && COLUMNS.some(c => c.id === newStatus)) {
        updateTodo.mutate({ id: active.id, status: newStatus });
    }
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading your board...</div>;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full overflow-x-auto pb-4">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            todos={todos?.filter((t) => t.status === column.id) || []}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <KanbanCard todo={todos.find((t) => t._id === activeId)} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
