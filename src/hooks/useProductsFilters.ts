import { useMemo, useState, useEffect } from "react";
import type { Product } from "../types";
import { ITEMS_PER_PAGE } from "../utils/consts";

export const useProductFilters = (products: Product[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.data?.category === selectedCategory
      );
    }
    return filtered;
  }, [products, searchQuery, selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  return {
    searchQuery,
    selectedCategory,
    currentPage,
    setSearchQuery,
    setSelectedCategory,
    setCurrentPage,
    categories,
    paginatedProducts,
    totalFilteredItems: filteredProducts.length,
    itemsPerPage: ITEMS_PER_PAGE,
  };
};
