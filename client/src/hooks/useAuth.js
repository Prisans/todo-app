import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/auth/login", credentials);
      return response.data.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      navigate("/dashboard");
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/auth/signup", userData);
      return response.data.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      navigate("/dashboard");
    },
  });

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      logoutStore();
      navigate("/login");
    }
  };

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || signupMutation.isPending,
    error: loginMutation.error || signupMutation.error,
  };
};
