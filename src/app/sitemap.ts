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

    const articleEntries = articles.map((article) => ({
        url: `${baseUrl}/article/${article.uid}`,
        lastModified: article.last_publication_date
            ? new Date(article.last_publication_date)
            : new Date(article.first_publication_date),
    }));

    const pageEntries = pages.map((page) => ({
        url: `${baseUrl}/${page.uid}`,
        lastModified: page.last_publication_date
            ? new Date(page.last_publication_date)
            : new Date(page.first_publication_date),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/news`,
            lastModified: new Date(),
        },
        ...articleEntries,
        ...pageEntries,
    ];
}
