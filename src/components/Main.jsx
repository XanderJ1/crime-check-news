import Image from "next/image";
import Link from "next/link";
import NewsCard from "./NewsCard";
import { formatRelativeTime } from "@/lib/prismic-helpers";

/**
 * @param {{ articles: any[] }} props
 */
const Main = ({ articles = [] }) => {
    // Helper to truncate text
    function truncateText(text, maxLength = 100) {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    // Find a featured article for the hero section, or use the first one
    const heroArticle = articles.find(a => a.featured) || articles[0];

    // Filter articles for different sections, excluding the hero article to avoid duplication
    const remainingArticles = articles.filter(a => a.id !== heroArticle?.id);

    const latestNews = remainingArticles.slice(0, 6);
    const popularNews = articles.slice(0, 4); // Just using first 4 for now as "popular"
    const recentSidebarNews = articles.slice(6, 11);

    if (articles.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4 font-medium">No articles found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-7 max-w-[1600px] mx-auto gap-8 mt-10 px-4 mb-20">
            <div className="lg:col-span-5">
                {/* Hero Section */}
                {heroArticle && (
                    <section className="mb-12">
                        <Link href={`/article/${heroArticle.uid}`} className="block relative h-[500px] rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src={heroArticle.image}
                                alt={heroArticle.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3">
                                    {heroArticle.category}
                                </span>
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                                    {heroArticle.title}
                                </h1>
                                <p className="text-white text-lg max-w-2xl line-clamp-2">
                                    {heroArticle.snippet}
                                </p>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Latest News Section */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                        {latestNews.map((item) => (
                            <NewsCard key={item.id} item={item} showReadMore={true} />
                        ))}
                    </div>
                </section>

                {/* Category Sections */}
                {['Politics', 'Sports', 'Business', 'Lifestyle', 'Entertainment', 'Arts', 'International'].map((category) => {
                    const categoryArticles = articles
                        .filter(item => item.category === category && item.id !== heroArticle?.id)
                        .slice(0, 3);

                    if (categoryArticles.length === 0) return null;

                    // Define category colors
                    const categoryColors = {
                        Politics: 'bg-blue-600',
                        Sports: 'bg-green-600',
                        Business: 'bg-indigo-600',
                        Lifestyle: 'bg-pink-600',
                        Entertainment: 'bg-purple-600',
                        Arts: 'bg-amber-600',
                        International: 'bg-teal-600'
                    };

                    return (
                        <section key={category} className="mb-12">
                            <div className="flex items-center gap-3 mb-8">
                                <div className={`w-1.5 h-8 ${categoryColors[category] || 'bg-gray-600'} rounded-full`}></div>
                                <h2 className="text-3xl font-bold text-gray-900">{category}</h2>
                                <Link href={`/${category.toLowerCase()}`} className="ml-auto text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1">
                                    View All <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                                {categoryArticles.map((item) => (
                                    <NewsCard key={item.id} item={item} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-10">
                {/* Most Popular */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        Most Popular
                    </h2>
                    <div className="flex flex-col gap-6">
                        {popularNews.map((item) => (
                            <Link key={item.id} href={`/article/${item.uid}`} className="group cursor-pointer">
                                <div className="flex gap-4 items-start">
                                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm leading-snug mb-1 group-hover:text-red-600 transition-colors line-clamp-3">
                                            {item.title}
                                        </h3>
                                        <span className="text-xs text-gray-500">{item.publishDate}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent News */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 border-b pb-2">Recent News</h2>
                    <div className="flex flex-col gap-4">
                        {recentSidebarNews.map((item) => (
                            <Link key={item.id} href={`/article/${item.uid}`} className="pb-4 border-b border-gray-100 last:border-0 group block">
                                <h3 className="font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {truncateText(item.title, 60)}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                    {truncateText(item.snippet, 80)}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-blue-600 p-6 rounded-xl text-white text-center">
                    <h3 className="font-bold text-xl mb-2">Subscribe to our Newsletter</h3>
                    <p className="text-blue-100 text-sm mb-4">Get the latest news delivered straight to your inbox.</p>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-2 rounded-lg text-gray-900 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                        Subscribe
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default Main;