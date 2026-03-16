import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoading, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please enter your details to sign in
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
            <Input
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error.response?.data?.message || "Invalid email or password"}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
