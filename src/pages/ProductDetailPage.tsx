import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchProductById, deleteProduct } from "../store/slices/productsSlice";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProductFormModal from "../components/dashboard/ProductFormModal";
import { type Product } from "../types";
import { formatPrice, formatDate } from "../utils/formatters";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";

const Breadcrumbs: React.FC<{ productName?: string }> = ({ productName }) => (
  <nav className="text-sm text-gray-500 mb-8">
    <Link to="/dashboard" className="hover:underline">
      Dashboard
    </Link>
    <span className="mx-2">&gt;</span>
    <span className="font-semibold text-gray-700">
      {productName || "Product Details"}
    </span>
  </nav>
);

const InfoBox: React.FC<{
  label: string;
  value: string;
  isStatus?: boolean;
}> = ({ label, value, isStatus }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
    <p className="text-sm text-gray-500">{label}</p>
    {isStatus ? (
      <span
        className={`px-2 py-1 mt-1 inline-block text-xs font-semibold rounded-full ${
          value === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {value}
      </span>
    ) : (
      <p className="font-semibold text-gray-800 mt-1">{value}</p>
    )}
  </div>
);

const ProductSummaryCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 flex items-center justify-center bg-gray-100 rounded-lg p-4 h-48 md:h-full">
        <svg
          className="w-24 h-24 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
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
              product.data?.stock && product.data.stock > 0
                ? "Active"
                : "Out of Stock"
            }
            isStatus
          />
        </div>
      </div>
    </div>
  </div>
);

const SpecRow: React.FC<{ label: string; value: unknown }> = ({
  label,
  value,
}) => (
  <div className="py-4 flex flex-col md:grid md:grid-cols-3 md:gap-4">
    <p className="font-semibold text-gray-600 md:font-medium md:col-span-1">
      {label}
    </p>
    <p className="text-gray-800 md:col-span-2 mt-1 md:mt-0">
      {String(value) || "N/A"}
    </p>
  </div>
);

const ProductSpecificationsCard: React.FC<{ product: Product }> = ({
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

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    item: product,
    loadingItem,
    error,
  } = useAppSelector((state) => state.products);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  const handleDelete = () => {
    if (
      productId &&
      window.confirm("Are you sure you want to delete this product?")
    ) {
      dispatch(deleteProduct(productId)).then(() => {
        navigate("/dashboard");
      });
    }
  };

  if (loadingItem) {
    return (
      <DashboardLayout>
        <div className="flex justify-center p-10">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }
  if (error) {
    return (
      <DashboardLayout>
        <ErrorMessage message={error} />
      </DashboardLayout>
    );
  }
  if (!product) {
    return (
      <DashboardLayout>
        <div className="text-center p-10 text-gray-600">
          Product not found.{" "}
          <Link to="/dashboard" className="text-indigo-600 hover:underline">
            Go back
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <DashboardLayout>
        <Breadcrumbs productName={product?.name} />
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Product Details
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage product information
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ← Back to Table
            </Link>
            <button
              onClick={() => setEditModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              Edit Product
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete Product
            </button>
          </div>
        </div>

        <ProductSummaryCard product={product} />
        <ProductSpecificationsCard product={product} />
      </DashboardLayout>

      <ProductFormModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        productToEdit={product}
      />
    </>
  );
};

export default ProductDetailPage;
