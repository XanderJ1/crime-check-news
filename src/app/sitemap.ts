import { MetadataRoute } from 'next'
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const client = createClient();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crimechecknews.com';

    // Fetch all articles
    const articles = await client.getAllByType("article", {
        orderings: [
            { field: "my.article.publish_date", direction: "desc" },
            { field: "document.first_publication_date", direction: "desc" },
        ],
    });

    // Fetch all pages (except home which is handled manually)
    const pages = await client.getAllByType("page", {
        filters: [filter.not("my.page.uid", "home")],
    });

    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/article/${article.uid}`,
        lastModified: new Date(article.last_publication_date),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
        url: `${baseUrl}/${page.uid}`,
        lastModified: new Date(page.last_publication_date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/news`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.9,
        },
        ...articleEntries,
        ...pageEntries,
    ]
}
