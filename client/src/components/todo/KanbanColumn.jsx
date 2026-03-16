import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanCard from "./KanbanCard";
import { cn } from "../../lib/utils";

const KanbanColumn = ({ id, title, todos }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col w-80 min-w-[20rem] bg-gray-100/50 dark:bg-gray-900/50 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          {title}
          <span className="text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
            {todos.length}
          </span>
        </h3>
      </div>

      <div ref={setNodeRef} className="flex-1 space-y-3 min-h-[200px]">
        <SortableContext items={todos.map((t) => t._id)} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <KanbanCard key={todo._id} todo={todo} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
