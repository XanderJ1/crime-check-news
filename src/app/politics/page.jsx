import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsCard from "../../components/NewsCard";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";
import {
    extractPlainText,
    formatDate,
    getImageAlt,
} from "@/lib/prismic-helpers";

export default async function PoliticsPage() {
    const client = createClient();
    let articles = [];

    try {
        const prismicArticles = await client.getAllByType("article", {
            filters: [
                filter.at("my.article.category", "Politics")
            ],
            orderings: [
                { field: "my.article.publish_date", direction: "desc" },
                { field: "document.first_publication_date", direction: "desc" },
            ],
        });

        articles = prismicArticles.map((article) => ({
            id: article.id,
            uid: article.uid,
            author: article.data.author || "Unknown",
            title: extractPlainText(article.data.title),
            snippet: extractPlainText(article.data.excerpt),
            image: article.data.featured_image?.url || "https://placehold.co/600x400?text=No+Image",
            imageAlt: getImageAlt(article.data.featured_image, extractPlainText(article.data.title)),
            source: "Crime Check News",
            time: article.data.publish_date || article.first_publication_date,
            category: article.data.category || "Politics",
            readTime: article.data.read_time || 5,
            featured: article.data.featured || false,
            publishDate: formatDate(article.data.publish_date || article.first_publication_date),
        }));
    } catch (error) {
        console.error("Error fetching politics articles:", error);
    }

    return (
        <>
            <Header />
            <main className="max-w-[1600px] mx-auto px-8 py-16">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-12 bg-blue-700 rounded-full"></div>
                    <h1 className="text-4xl font-bold text-gray-900">Political News</h1>
                </div>
                <p className="text-gray-600 mb-10 text-lg">Coverage of government, elections, and policy developments</p>

                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((item) => <NewsCard key={item.id} item={item} showReadMore={true} />)}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-lg">No politics articles found.</p>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
