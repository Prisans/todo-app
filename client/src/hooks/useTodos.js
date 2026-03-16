import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await api.get("/todos");
      return response.data.data;
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (todoData) => {
      const response = await api.post("/todos", todoData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const response = await api.patch(`/todos/${id}`, updateData);
      return response.data.data;
    },
    // Optimistic Update
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);
      
      queryClient.setQueryData(["todos"], (old) => 
        old.map((t) => (t._id === newTodo.id ? { ...t, ...newTodo } : t))
      );
      
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/todos/${id}`);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);
      
      queryClient.setQueryData(["todos"], (old) => old.filter((t) => t._id !== id));
      
      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
