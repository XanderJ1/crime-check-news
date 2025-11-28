"use client";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    const maxPagesToShow = 5;

    // Calculate which pages to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
            >
                Previous
            </button>

            {/* First page */}
            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-4 py-2 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
                </>
            )}

            {/* Page numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Last page */}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-4 py-2 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
