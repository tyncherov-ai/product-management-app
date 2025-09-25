import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchProducts } from "../store/slices/productsSlice";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProductsTable from "../components/dashboard/ProductsTable";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import ProductFormModal from "../components/dashboard/ProductFormModal";
import type { Product } from "../types";
import { useProductFilters } from "../hooks/useProductsFilters";

const ProductsDashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const dispatch = useAppDispatch();
  const {
    items: products,
    loadingList,
    error,
  } = useAppSelector((state) => state.products);

  const {
    searchQuery,
    selectedCategory,
    currentPage,
    setSearchQuery,
    setSelectedCategory,
    setCurrentPage,
    categories,
    paginatedProducts,
    totalFilteredItems,
    itemsPerPage,
  } = useProductFilters(products);

  const handleOpenCreateModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderContent = () => {
    if (loadingList)
      return (
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      );
    if (error) return <ErrorMessage message={error} />;
    if (products.length === 0 && !loadingList)
      return (
        <div className="text-center text-gray-500 py-10">
          No products found.
        </div>
      );

    return (
      <ProductsTable
        products={paginatedProducts}
        onEdit={handleOpenEditModal}
        currentPage={currentPage}
        totalItems={totalFilteredItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    );
  };

  return (
    <>
      <DashboardLayout
        onAddNewProduct={handleOpenCreateModal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      >
        {renderContent()}
      </DashboardLayout>
      <ProductFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        productToEdit={productToEdit}
      />
    </>
  );
};

export default ProductsDashboardPage;
