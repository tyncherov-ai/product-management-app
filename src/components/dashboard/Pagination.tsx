import React from "react";
import { usePagination } from "../../hooks/usePagination";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = usePagination({ currentPage, totalItems, itemsPerPage });

  if (totalPages <= 1) return null;

  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="text-sm text-gray-600">
        Showing {firstItem} to {lastItem} of {totalItems} results
      </div>

      <nav>
        <ul className="hidden md:inline-flex items-center gap-1.5">
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              &larr; <span className="hidden lg:inline">Previous</span>
            </button>
          </li>
          {pageNumbers.map((page, index) =>
            typeof page === "string" ? (
              <li key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </li>
            ) : (
              <li key={page}>
                <button
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center leading-tight border rounded-lg border-gray-300 ${
                    currentPage === page
                      ? "text-white bg-indigo-600 border-indigo-600"
                      : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {page}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              <span className="hidden lg:inline">Next</span> &rarr;
            </button>
          </li>
        </ul>

        <ul className="inline-flex md:hidden items-center gap-2">
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              &larr;
            </button>
          </li>
          <li className="text-sm text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </li>
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              &rarr;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
