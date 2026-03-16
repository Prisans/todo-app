import { cn } from "../../lib/utils";

const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          "flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
