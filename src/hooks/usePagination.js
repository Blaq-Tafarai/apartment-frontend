import { useState, useCallback } from 'react';

/**
 * Custom hook for managing pagination state and logic (server-side)
 * @param {number} initialItemsPerPage - Initial number of items per page
 * @param {number} initialTotalItems - Initial total items count
 * @returns {Object} Pagination state and methods
 */
export const usePagination = (initialItemsPerPage = 10, initialTotalItems = 0) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [totalItems, setTotalItems] = useState(initialTotalItems);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    // Reset to first page when changing items per page
    setCurrentPage(1);
  }, []);

  // Update total items (useful when data changes)
  const updateTotalItems = useCallback((newTotalItems) => {
    setTotalItems(newTotalItems);
    // Reset to first page if current page exceeds total pages
    if (currentPage > Math.ceil(newTotalItems / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [currentPage, itemsPerPage]);

  // Go to next page
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  // Go to previous page
  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  // Go to first page
  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Go to last page
  const lastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  // Reset pagination
  const reset = useCallback(() => {
    setCurrentPage(1);
    setItemsPerPage(initialItemsPerPage);
    setTotalItems(initialTotalItems);
  }, [initialItemsPerPage, initialTotalItems]);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    handlePageChange,
    handleItemsPerPageChange,
    updateTotalItems,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    reset,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};
