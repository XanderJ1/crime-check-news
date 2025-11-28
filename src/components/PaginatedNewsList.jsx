"use client";
import { useState } from "react";
import NewsCard from "./NewsCard";
import Pagination from "./Pagination";

const PaginatedNewsList = ({ articles, itemsPerPage = 12 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentArticles = articles.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top of the list
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (articles.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No articles found.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentArticles.map((item) => (
                    <NewsCard key={item.id} item={item} showReadMore={true} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {/* Page info */}
            <div className="text-center mt-4 text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, articles.length)} of {articles.length} articles
            </div>
        </>
    );
};

export default PaginatedNewsList;
