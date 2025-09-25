import type { Product } from "../../types";
import { formatDate } from "../../utils/formatters";
import { SpecRow } from "./SpecRow";

export const ProductSpecificationsCard: React.FC<{ product: Product }> = ({
  product,
}) => {
  const mainKeys = ["price", "category", "stock", "status"];
  const specs = product.data
    ? Object.entries(product.data).filter(([key]) => !mainKeys.includes(key))
    : [];
  const formatKey = (key: string) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Product Specifications
      </h2>
      <div className="divide-y divide-gray-200">
        {specs.map(([key, value]) => (
          <SpecRow key={key} label={formatKey(key)} value={value} />
        ))}
        <SpecRow label="Created Date" value={formatDate(product.createdAt)} />
        <SpecRow label="Last Updated" value={formatDate(product.createdAt)} />
      </div>
    </div>
  );
};
