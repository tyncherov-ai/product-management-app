import React from "react";
import { type Product } from "../../types";
import { useAppDispatch } from "../../hooks/redux";
import { deleteProduct } from "../../store/slices/productsSlice";
import { DeleteIcon, EditIcon, ViewIcon } from "../icons/Icons";
import { formatDate, formatPrice } from "../../utils/formatters";
import Pagination from "./Pagination";

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const StatusBadge: React.FC<{ stock: number | undefined }> = ({ stock }) => {
  if (typeof stock !== "number") {
    return (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
        Unknown
      </span>
    );
  }
  const isAvailable = stock > 0;
  const statusText = isAvailable ? "Active" : "Out of Stock";
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

const CategoryBadge: React.FC<{ category?: string }> = ({ category }) => {
  if (!category) return null;
  return (
    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
      {category}
    </span>
  );
};

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onEdit,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Product Inventory
        </h2>
        <p className="text-gray-600 mt-1">
          Manage your products with full CRUD operations
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-gray-900">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500">ID: {product.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                  {formatPrice(product.data?.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CategoryBadge category={product.data?.category} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {product.data?.stock ?? "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge stock={product.data?.stock} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {formatDate(product.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full text-blue-600 bg-blue-100 hover:bg-blue-200">
                      <ViewIcon />
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-full text-yellow-600 bg-yellow-100 hover:bg-yellow-200"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 rounded-full text-red-600 bg-red-100 hover:bg-red-200"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductsTable;
