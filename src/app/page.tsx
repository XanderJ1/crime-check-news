import { Metadata } from "next";
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "@/prismicio";
import {
  extractPlainText,
  formatDate,
  getImageUrl,
  getImageAlt,
} from "@/lib/prismic-helpers";


// Define the Article interface matching the transformed data
interface Article {
  id: string;
  uid: string;
  author: any; // Using any for complex Prismic fields for now, or could be more specific
  title: string;
  snippet: string;
  image: string;
  imageAlt: string;
  source: string;
  time: string | any; // Prismic date field or string
  category: string;
  readTime: number;
  featured: boolean;
  publishDate: string;
}

export const metadata: Metadata = {
  title: "Crime Check News - Breaking News & Analysis",
  description: "Stay informed with the latest crime news, investigations, and safety alerts. Your trusted source for breaking news and in-depth analysis.",
  openGraph: {
    title: "Crime Check News - Breaking News & Analysis",
    description: "Stay informed with the latest crime news, investigations, and safety alerts. Your trusted source for breaking news and in-depth analysis.",
    type: "website",
    locale: "en_US",
    siteName: "Crime Check News",
  },
};

export default async function Home() {
  const client = createClient();

  // Fetch all published articles from Prismic
  let articles: Article[] = [];
  try {
    const prismicArticles = await client.getAllByType("article", {
      orderings: [
        { field: "my.article.publish_date", direction: "desc" },
        { field: "document.first_publication_date", direction: "desc" },
      ],
    });

    // Transform Prismic articles to match the expected format
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
      category: article.data.category || "General",
      readTime: article.data.read_time || 5,
      featured: article.data.featured || false,
      publishDate: formatDate(article.data.publish_date || article.first_publication_date),
    }));
  } catch (error) {
    console.error("Error fetching articles from Prismic:", error);
  }

  return (
    <>
      <Header />
      <Main articles={articles} />
      <Footer />
    </>
  );
}