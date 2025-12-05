import Image from "next/image";
import Link from "next/link";
import { getArticleUrl, getCategoryColor } from "@/lib/prismic-helpers";

interface RelatedArticle {
    uid: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
    imageAlt: string;
    publishDate: string;
    readTime: number;
}

interface RelatedArticlesProps {
    articles: RelatedArticle[];
    currentArticleUid: string;
}

/**
 * Related Articles Component
 * Displays a grid of related articles based on category or tags
 */
export default function RelatedArticles({ articles, currentArticleUid }: RelatedArticlesProps) {
    // Filter out the current article
    const filteredArticles = articles.filter(article => article.uid !== currentArticleUid).slice(0, 3);

    if (filteredArticles.length === 0) {
        return null;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Articles</h2>
                <p className="text-gray-600">Continue reading with these stories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => {
                    const categoryColor = getCategoryColor(article.category);

                    return (
                        <Link
                            key={article.uid}
                            href={getArticleUrl(article.uid)}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.imageAlt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 bg-${categoryColor}-600 text-white text-xs font-bold rounded-full`}>
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{article.publishDate}</span>
                                    <span>{article.readTime} min read</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
