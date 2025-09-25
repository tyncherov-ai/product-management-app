import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchProductById, deleteProduct } from "../store/slices/productsSlice";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProductFormModal from "../components/dashboard/ProductFormModal";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { Breadcrumbs } from "../components/ui/BreadCrumbs";
import { ProductSummaryCard } from "../components/products/ProductSummaryCard";
import { ProductSpecificationsCard } from "../components/products/ProductSpecificationsCard";

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
