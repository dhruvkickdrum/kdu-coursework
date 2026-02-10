import type { FC } from 'react';

// interface for pagination props
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange,}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Page Change UI -> With Prec and Next Buttons
  return (
    <nav className="pagination">
      <button className="pagination_button" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} type="button">
        Prev
      </button>
      <div className="pagination_pages">
        {pages.map((page) => (
          <button key={page} className={`pagination_page ${page === currentPage ? 'pagination_page-active' : ''}`} onClick={() => onPageChange(page)} type="button">
            {page}
          </button>
        ))}
      </div>
      <button className="pagination_button" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} type="button">
        Next
      </button>
    </nav>
  );
};
