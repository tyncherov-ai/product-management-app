import React from "react";

type Props = {
  size?: "sm" | "md" | "lg";
  overlay?: boolean;
  className?: string;
};

const sizeMap = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };

export const LoadingSpinner: React.FC<Props> = ({
  size = "md",
  overlay,
  className,
}) => {
  const spinner = (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600 ${
        sizeMap[size]
      } ${className ?? ""}`}
      aria-label="Loading"
      role="status"
    />
  );

  if (!overlay) return spinner;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {spinner}
    </div>
  );
};
