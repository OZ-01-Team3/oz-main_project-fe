"use client";

import { useState } from "react";

const PageNation = () => {
  // 현제 어느 페이지인지 생타
  const [currentPage, setCurrentPage] = useState<number>(1);
  //  현재 페이지랑 페이지넘버랑 같으면 활성화시킴
  const isActive = (pageNumber: number) =>
    currentPage === pageNumber
      ? "bg-neutral-100 text-mainBlack outline-none bg-neutral-text-mainBlack"
      : "";
  // 이젠페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // 다음페에지로 이동
  const handleNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };
  // 페이지 버튼 눌렀을 때 해당 페이지로 이동
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <nav className="w-full h-10 flex justify-center font-didot mt-10 mb-20">
      <ul className="list-style-none flex">
        <li>
          <button
            className="pageNationIcon"
            aria-label="Previous"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">≪</span>
          </button>
        </li>
        {[1, 2, 3].map((pageNumber) => (
          <li
            key={pageNumber}
            aria-current={currentPage === pageNumber ? "page" : undefined}
            onClick={() => handlePageClick(pageNumber)}
          >
            <button
              className={`pageNation ${isActive(pageNumber)}`}
              onClick={handleNextPage}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            className="pageNationIcon"
            aria-label="Next"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === 3}
          >
            <span aria-hidden="true">≫</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PageNation;
