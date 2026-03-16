import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, Trash2 } from "lucide-react";
import { useDeleteTodo } from "../../hooks/useTodos";
import { cn } from "../../lib/utils";

const KanbanCard = ({ todo, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: todo._id });
  
  const deleteTodo = useDeleteTodo();

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-blue-500",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50",
        isOverlay && "shadow-xl border-indigo-500 ring-2 ring-indigo-500/20 rotate-2 cursor-grabbing"
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-2">
          {todo.priority && (
            <div className={cn("w-8 h-1 rounded-full", priorityColors[todo.priority])} />
          )}
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
            {todo.title}
          </h4>
        </div>
        
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            deleteTodo.mutate(todo._id);
          }}
          className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 uppercase tracking-tight">
          <Calendar className="w-3 h-3" />
          {new Date(todo.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
