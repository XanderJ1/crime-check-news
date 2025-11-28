import Link from "next/link";
import Image from "next/image";
import { formatRelativeTime } from "@/lib/prismic-helpers";

const LatestNewsSidebar = ({ articles, title = "Latest News" }) => {
    // Take only the first 5 articles
    const sidebarArticles = articles.slice(0, 5);

    if (sidebarArticles.length === 0) return null;

    return (
        <aside className="bg-gray-50 p-6 rounded-xl h-fit sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-3">
                {title}
            </h2>
            <div className="flex flex-col gap-6">
                {sidebarArticles.map((article) => (
                    <Link key={article.id} href={`/article/${article.uid}`} className="group flex gap-4 items-start">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="80px"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                                {article.title}
                            </h3>
                            <span className="text-xs text-gray-500">
                                {formatRelativeTime(article.time)}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default LatestNewsSidebar;
