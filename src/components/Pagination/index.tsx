"use client";
import React, { useState } from "react";

const Pagination = ({ totalPages = 20 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Always show the first page
    pageNumbers.push(1);

    if (currentPage > 4) {
      pageNumbers.push("...");
    }

    if (currentPage <= 4) {
      // Display the first 5 pages
      for (let i = 2; i <= 5; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage > 4 && currentPage < totalPages - 3) {
      // Display 2 pages before and after the current page
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Display the last 5 pages
      for (let i = totalPages - 4; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push("...");
    }

    // Always show the last page
    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <div className="flex gap-2">
      {currentPage > 1 && (
        <div
          onClick={handlePreviousClick}
          className={`grid h-6 w-6 place-items-center border ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "cursor-pointer border-grays text-primary"
          }`}
        >
          &lt;
        </div>
      )}

      {renderPageNumbers().map((page, index) => (
        <div
          key={index}
          onClick={() => typeof page === "number" && handlePageClick(page)}
          className={`grid h-6 w-6 place-items-center border ${
            page === currentPage
              ? "border-primary font-normal text-primary"
              : "border-grays text-grays"
          } cursor-pointer`}
        >
          <p>{page}</p>
        </div>
      ))}

      {currentPage < totalPages && (
        <div
          onClick={handleNextClick}
          className={`grid h-6 w-6 place-items-center border ${
            currentPage === totalPages
              ? "cursor-not-allowed text-gray-400"
              : "cursor-pointer border-grays text-primary"
          }`}
        >
          &gt;
        </div>
      )}
    </div>
  );
};

export default Pagination;
