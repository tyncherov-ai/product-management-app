import type { Product } from "../../types";
import { STATUS } from "../../utils/consts";
import { formatPrice } from "../../utils/formatters";
import { ImageIcon } from "../icons/Icons";
import { InfoBox } from "./InfoBox";

export const ProductSummaryCard: React.FC<{ product: Product }> = ({
  product,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 flex items-center justify-center bg-gray-100 rounded-lg p-4 h-48 md:h-full">
        <ImageIcon />
      </div>
      <div className="md:col-span-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {product.name}
        </h1>
        <p className="text-3xl md:text-4xl font-bold text-green-600 mt-2">
          {formatPrice(product.data?.price)}
        </p>
        <p className="text-gray-600 mt-4 text-base">
          A placeholder description for the product. The most advanced iPhone
          yet, featuring the revolutionary A16 Bionic chip and a magical new way
          to interact with iPhone.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InfoBox label="Product ID" value={product.id} />
          <InfoBox
            label="Stock"
            value={`${product.data?.stock ?? "N/A"} units`}
          />
          <InfoBox label="Category" value={product.data?.category ?? "N/A"} />
          <InfoBox
            label="Status"
            value={
              typeof product.data?.stock !== "number"
                ? STATUS.UNKNOWN
                : product.data?.stock && product.data.stock > 0
                ? STATUS.ACTIVE
                : STATUS.OUT_OF_STOCK
            }
            isStatus
          />
        </div>
      </div>
    </div>
  </div>
);
