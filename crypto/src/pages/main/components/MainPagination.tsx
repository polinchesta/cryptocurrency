import React from 'react';

interface PaginationProps {
    handleFirstPage: () => void;
    handlePrevPage: () => void;
    handleNextPage: () => void;
    currentPage: number;
}

const Pagination = ({
    handleFirstPage,
    handlePrevPage,
    handleNextPage,
    currentPage,
}: PaginationProps) => {
    return (
        <div className="buttonPagination">
            <button
                className="buttonPagination-disabled"
                onClick={handleFirstPage}
                disabled={currentPage === 1}>
                1 страница
            </button>
            <button
                className="buttonPagination-disabled"
                onClick={handlePrevPage}
                disabled={currentPage === 1}>
                Предыдущая
            </button>
            <button onClick={handleNextPage} disabled={currentPage === 154}>
                Следующая
            </button>
        </div>
    );
};

export default Pagination;
