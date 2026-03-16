import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LogOut, CheckCircle2, Circle, Trash2, Calendar, LayoutGrid, List as ListIcon } from "lucide-react";
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from "../hooks/useTodos";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import KanbanBoard from "../components/todo/KanbanBoard";
import { cn } from "../lib/utils";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const { data: todos, isLoading } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [view, setView] = useState("board");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    createTodo.mutate({ title: newTodoTitle });
    setNewTodoTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold dark:text-white">TaskFlow</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mr-2">
            <button
               onClick={() => setView("list")}
               className={cn("p-1.5 rounded-md transition-all", view === "list" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600" : "text-gray-500")}
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button
               onClick={() => setView("board")}
               className={cn("p-1.5 rounded-md transition-all", view === "board" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600" : "text-gray-500")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {user?.name}
          </span>
          <Button variant="ghost" size="sm" onClick={logout} className="gap-2 text-gray-500 hover:text-red-500">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        <section className="mb-12 max-w-2xl mx-auto">
          <form onSubmit={handleCreate} className="flex gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20">
            <div className="flex-1">
              <Input
                placeholder="Compose a new task..."
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                className="border-none shadow-none focus:ring-0 bg-transparent text-lg p-0"
              />
            </div>
            <Button type="submit" disabled={!newTodoTitle.trim() || createTodo.isPending}>
              <Plus className="w-5 h-5 mr-1" /> Create
            </Button>
          </form>
        </section>

        {view === "list" ? (
          <section className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                My Tasks 
                <span className="text-xs bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 px-2.5 py-1 rounded-full">
                  {todos?.length || 0}
                </span>
              </h3>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {todos?.map((todo) => (
                  <motion.div
                    key={todo._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all"
                  >
                    <button
                      onClick={() => updateTodo.mutate({ id: todo._id, status: todo.status === "done" ? "todo" : "done" })}
                      className="text-gray-300 hover:text-indigo-600 transition-colors"
                    >
                      {todo.status === "done" ? (
                        <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <span className={cn(
                        "text-gray-900 dark:text-gray-100 font-medium",
                        todo.status === "done" && "line-through text-gray-400 dark:text-gray-600"
                      )}>
                        {todo.title}
                      </span>
                      
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold uppercase tracking-wider">
                        {todo.status && (
                          <span className={cn(
                            "px-1.5 py-0.5 rounded",
                            todo.status === "done" ? "bg-green-100 text-green-600" : todo.status === "in-progress" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                          )}>
                            {todo.status.replace("-", " ")}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-3 h-3" /> {new Date(todo.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTodo.mutate(todo._id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
                  ))}
                </div>
              )}
              
              {!isLoading && todos?.length === 0 && (
                <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">All Clear!</h3>
                  <p className="text-gray-500 max-w-xs mx-auto mt-2">No tasks found. Relax or create something new to get started.</p>
                </div>
              )}
            </div>
          </section>
        ) : (
          <KanbanBoard />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
