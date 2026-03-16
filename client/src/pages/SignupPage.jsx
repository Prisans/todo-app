import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { signup, isLoading, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start organizing your tasks with TaskFlow
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />
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
              {error.response?.data?.message || "An error occurred during signup"}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Get Started
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
