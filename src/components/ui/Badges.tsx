import { STATUS } from "../../utils/consts";

export const StatusBadge: React.FC<{ stock: number | undefined }> = ({
  stock,
}) => {
  if (typeof stock !== "number") {
    return (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
        Unknown
      </span>
    );
  }
  const isAvailable = stock > 0;
  const statusText = isAvailable ? STATUS.ACTIVE : STATUS.OUT_OF_STOCK;
  const bgColor = isAvailable ? "bg-green-100" : "bg-red-100";
  const textColor = isAvailable ? "text-green-800" : "text-red-800";
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}
    >
      {statusText}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category?: string }> = ({
  category,
}) => {
  if (!category) return null;
  return (
    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
      {category}
    </span>
  );
};
