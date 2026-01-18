import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import CommentSection from "@/components/CommentSection";
import RelatedArticles from "@/components/RelatedArticles";
import { filter } from "@prismicio/client";
import {
    formatDate,
    formatRelativeTime,
    getImageUrl,
    getImageAlt,
    extractPlainText,
    getCategoryColor,
} from "@/lib/prismic-helpers";

type Params = { uid: string };

/**
 * Generate metadata for the article page (SEO)
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { uid } = await params;
    const client = createClient();

    try {
        const article = await client.getByUID("article", uid);
        const title = extractPlainText(article.data.title);
        const description = article.data.meta_description || extractPlainText(article.data.excerpt);
        const image = article.data.meta_image?.url || article.data.featured_image?.url;
        const author = article.data.author || "Unknown";
        const publishDate = article.data.publish_date || article.first_publication_date;
        const category = article.data.category || "General";
        const tags = article.data.tags?.map((t: any) => t.tag) || [];
        const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/article/${uid}`;

        return {
            metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://crimechecknews.com'),
            title: article.data.meta_title || title,
            description,
            keywords: [category, ...tags, "crime news", "breaking news"],
            authors: [{ name: author }],
            creator: author,
            publisher: "Crime Check News",
            alternates: {
                canonical: articleUrl,
            },
            openGraph: {
                title: article.data.meta_title || title,
                description,
                images: image ? [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                        alt: title,
                    }
                ] : [],
                type: "article",
                publishedTime: publishDate,
                modifiedTime: article.last_publication_date,
                authors: [author],
                section: category,
                tags: tags,
                url: articleUrl,
                siteName: "Crime Check News",
            },
            twitter: {
                card: "summary_large_image",
                title: article.data.meta_title || title,
                description,
                images: image ? [image] : [],
                creator: "@crimechecknews",
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        };
    } catch (error) {
        return {
            title: "Article Not Found",
            description: "The requested article could not be found.",
        };
    }
}

/**
 * Generate static paths for all articles (optional, for static generation)
 */
export async function generateStaticParams() {
    const client = createClient();
    const articles = await client.getAllByType("article");

    return articles.map((article) => ({
        uid: article.uid,
    }));
}

/**
 * Article Page Component
 */
export default async function ArticlePage({ params }: { params: Promise<Params> }) {
    const { uid } = await params;
    const client = createClient();

    let article;
    try {
        article = await client.getByUID("article", uid);
    } catch (error) {
        notFound();
    }

    // Extract article data
    const title = extractPlainText(article.data.title);
    const excerpt = extractPlainText(article.data.excerpt);
    const category = article.data.category || "General";
    const categoryColor = getCategoryColor(category);
    const author = article.data.author || "Unknown";
    const authorImage = article.data.author_image?.url;
    const authorBio = article.data.author_bio ? extractPlainText(article.data.author_bio) : "";
    const publishDate = formatDate(article.data.publish_date || article.first_publication_date);
    const relativeTime = formatRelativeTime(article.data.publish_date || article.first_publication_date);
    const readTime = article.data.read_time || 5;
    const featuredImage = article.data.featured_image;
    const image = article.data.meta_image?.url || article.data.featured_image?.url;

    // Get article URL for sharing
    const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/article/${uid}`;

    // Fetch related articles
    let relatedArticles: any[] = [];
    try {
        const related = await client.getAllByType("article", {
            filters: [
                filter.at("my.article.category", category),
                filter.not("document.id", article.id),
            ],
            limit: 3,
        });

        relatedArticles = related.map((art) => ({
            uid: art.uid,
            title: extractPlainText(art.data.title),
            excerpt: extractPlainText(art.data.excerpt),
            category: art.data.category || "General",
            image: art.data.featured_image?.url || "https://placehold.co/600x400?text=No+Image",
            imageAlt: getImageAlt(art.data.featured_image, extractPlainText(art.data.title)),
            publishDate: formatDate(art.data.publish_date || art.first_publication_date),
            readTime: art.data.read_time || 5,
        }));
    } catch (error) {
        console.error("Error fetching related articles:", error);
    }

    return (
        <>
            <Header />

            <article className="min-h-screen bg-white">
                {/* Hero Section */}
                <div className="relative h-[500px] md:h-[600px] bg-black">
                    {featuredImage?.url && (
                        <Image
                            src={getImageUrl(featuredImage, { width: 1920, quality: 90 })}
                            alt={getImageAlt(featuredImage, title)}
                            fill
                            priority
                            className="object-cover opacity-80"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Article Header */}
                    <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 pb-12">
                        <div className="mb-4">
                            <span className={`inline-block px-4 py-1.5 bg-${categoryColor}-600 text-white text-sm font-bold rounded-full`}>
                                {category}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            {title}
                        </h1>
                        <p className="text-xl text-gray-200 mb-6 max-w-3xl">
                            {excerpt}
                        </p>

                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "NewsArticle",
                                    "headline": title,
                                    "description": excerpt,
                                    "image": image ? [image] : [],
                                    "datePublished": article.data.publish_date || article.first_publication_date,
                                    "dateModified": article.last_publication_date || article.first_publication_date,
                                    "author": {
                                        "@type": "Person",
                                        "name": author,
                                        "image": authorImage,
                                        "description": authorBio,
                                        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/author/${author.replace(/\s+/g, '-').toLowerCase()}`
                                    },
                                    "publisher": {
                                        "@type": "Organization",
                                        "name": "Crime Check News",
                                        "logo": {
                                            "@type": "ImageObject",
                                            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
                                        }
                                    },
                                    "mainEntityOfPage": {
                                        "@type": "WebPage",
                                        "@id": articleUrl
                                    },
                                    "articleSection": category,
                                    "keywords": article.data.tags?.map((t: any) => t.tag).join(", ") || category,
                                    "wordCount": article.data.content?.reduce((acc: number, slice: any) => {
                                        return acc + (slice.primary?.text?.[0]?.text?.split(' ').length || 0);
                                    }, 0) || 500,
                                    "inLanguage": "en-US",
                                    "isAccessibleForFree": "True",
                                })
                            }}
                        />
                        
                        {/* Breadcrumb Schema */}
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "BreadcrumbList",
                                    "itemListElement": [
                                        {
                                            "@type": "ListItem",
                                            "position": 1,
                                            "name": "Home",
                                            "item": process.env.NEXT_PUBLIC_SITE_URL
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 2,
                                            "name": category,
                                            "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${category.toLowerCase()}`
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 3,
                                            "name": title,
                                            "item": articleUrl
                                        }
                                    ]
                                })
                            }}
                        />

                        {/* Article Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-gray-300">
                            <div className="flex items-center gap-3">
                                {authorImage && (
                                    <Image
                                        src={authorImage}
                                        alt={author}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                )}
                                <div>
                                    <p className="font-semibold text-white">{author}</p>
                                    <p className="text-sm">{relativeTime} · {readTime} min read</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="max-w-6xl mx-auto px-4 py-12">
                    {/* Share Buttons - Top */}
                    <div className="mb-8 pb-8 border-b border-gray-200">
                        <ShareButtons url={articleUrl} title={title} description={excerpt} />
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-lg max-w-none">
                        <SliceZone slices={article.data.content} components={components} />
                    </div>

                    {/* Tags */}
                    {article.data.tags && article.data.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                {article.data.tags.map((tagObj: any, index: number) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                                    >
                                        #{tagObj.tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author Bio */}
                    {authorBio && (
                        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                            <div className="flex items-start gap-4">
                                {authorImage && (
                                    <Image
                                        src={authorImage}
                                        alt={author}
                                        width={80}
                                        height={80}
                                        className="rounded-full"
                                    />
                                )}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">About {author}</h3>
                                    <p className="text-gray-600">{authorBio}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Share Buttons - Bottom */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <ShareButtons url={articleUrl} title={title} description={excerpt} />
                    </div>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <RelatedArticles articles={relatedArticles} currentArticleUid={uid} />
                )}

                {/* Comments */}
                <CommentSection articleId={uid} articleTitle={title} articleUrl={articleUrl} />
            </article>

            <Footer />
        </>
    );
}
