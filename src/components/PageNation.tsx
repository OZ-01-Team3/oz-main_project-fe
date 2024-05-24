import { useCurrentPageStore, useTotalPageStore } from '@/stores/usePageStore';
interface PageNationProps {
  handlePageChange: (newPage: number) => void;
}
const PageNation = ({ handlePageChange }: PageNationProps) => {
  const { currentPage } = useCurrentPageStore();
  const { totalPages } = useTotalPageStore();

  // 현재 페이지와 페이지 넘버가 같으면 활성화시킴
  const isActive = (pageNumber: number) =>
    currentPage === pageNumber ? 'bg-neutral-100 text-mainBlack outline-none bg-neutral-text-mainBlack' : '';

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // 페이지 버튼 눌렀을 때 해당 페이지로 이동
  const handlePageClick = (pageNumber: number) => {
    handlePageChange(pageNumber);
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
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber} aria-current={currentPage === pageNumber ? 'page' : undefined}>
              <button className={`pageNation ${isActive(pageNumber)}`} onClick={() => handlePageClick(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            className="pageNationIcon"
            aria-label="Next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true">≫</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PageNation;
