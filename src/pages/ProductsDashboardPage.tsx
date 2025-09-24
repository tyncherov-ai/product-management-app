import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchProducts } from "../store/slices/productsSlice";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProductsTable from "../components/dashboard/ProductsTable";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import ProductFormModal from "../components/dashboard/ProductFormModal";
import type { Product } from "../types";

const ITEMS_PER_PAGE = 5;

const ProductsDashboardPage = () => {
  const dispatch = useAppDispatch();
  const {
    items: products,
    loadingList,
    error,
  } = useAppSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  // Создаем отфильтрованный список продуктов с помощью useMemo для производительности
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // 1. Фильтрация по поисковому запросу (по имени продукта)
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Фильтрация по категории
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.data?.category === selectedCategory
      );
    }

    // Здесь можно будет добавить сортировку

    return filtered;
  }, [products, searchQuery, selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    const unique = new Set(
      products
        .map((p) => p.data?.category)
        .filter((c): c is string => typeof c === "string" && c.length > 0)
    );
    return ["All", ...Array.from(unique)];
  }, [products]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

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
        totalItems={filteredProducts.length}
        itemsPerPage={ITEMS_PER_PAGE}
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
