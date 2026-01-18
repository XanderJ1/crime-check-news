import { MetadataRoute } from "next";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const client = createClient();
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://crimechecknews.com";

    // Articles
    const articles = await client.getAllByType("article", {
        orderings: [
            { field: "my.article.publish_date", direction: "desc" },
            { field: "document.first_publication_date", direction: "desc" },
        ],
    });

    // Pages (exclude home)
    const pages = await client.getAllByType("page", {
        filters: [filter.not("my.page.uid", "home")],
    });

    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/article/${article.uid}`,
        lastModified: article.last_publication_date
            ? new Date(article.last_publication_date)
            : new Date(article.first_publication_date),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
        url: `${baseUrl}/${page.uid}`,
        lastModified: page.last_publication_date
            ? new Date(page.last_publication_date)
            : new Date(page.first_publication_date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Category pages
    const categories = ["news", "politics", "sports", "business", "entertainment", "lifestyle", "arts", "international"];
    const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${baseUrl}/${category}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "hourly" as const,
            priority: 1.0,
        },
        ...categoryEntries,
        ...articleEntries,
        ...pageEntries,
    ];
}
