import { asText } from "@prismicio/client";
import type { RichTextField, ImageField, DateField } from "@prismicio/client";

/**
 * Format a Prismic date field to a readable string
 */
export function formatDate(date: DateField | string | null): string {
    if (!date) return "";

    const dateObj = typeof date === "string" ? new Date(date) : new Date(date);

    return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: DateField | string | null): string {
    if (!date) return "";

    const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(date);
}

/**
 * Calculate estimated reading time from text
 */
export function calculateReadTime(wordCount: number): number {
    const WORDS_PER_MINUTE = 200;
    const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
    return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Extract plain text from rich text field
 */
export function extractPlainText(richText: RichTextField): string {
    return asText(richText);
}

/**
 * Get optimized image URL from Prismic image field
 */
export function getImageUrl(
    image: ImageField,
    options?: {
        width?: number;
        height?: number;
        fit?: "clip" | "crop" | "fill" | "max" | "scale";
        quality?: number;
    }
): string {
    if (!image?.url) return "";

    const url = new URL(image.url);

    if (options?.width) url.searchParams.set("w", options.width.toString());
    if (options?.height) url.searchParams.set("h", options.height.toString());
    if (options?.fit) url.searchParams.set("fit", options.fit);
    if (options?.quality) url.searchParams.set("q", options.quality.toString());

    // Auto format for best compression
    url.searchParams.set("auto", "format,compress");

    return url.toString();
}

/**
 * Get image alt text with fallback
 */
export function getImageAlt(image: ImageField, fallback: string = "Article image"): string {
    return image?.alt || fallback;
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string, maxLength: number = 150): string {
    if (!text || text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0 ? truncated.slice(0, lastSpace) + "..." : truncated + "...";
}

/**
 * Generate article URL from UID
 */
export function getArticleUrl(uid: string): string {
    return `/article/${uid}`;
}

/**
 * Extract category color based on category name
 */
export function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        Business: "amber",
        Politics: "blue",
        Sports: "green",
        Entertainment: "purple",
        Lifestyle: "pink",
        Arts: "indigo",
        International: "teal",
        Technology: "cyan",
        Health: "emerald",
        Science: "violet",
    };

    return colors[category] || "gray";
}

/**
 * Format tags array for display
 */
export function formatTags(tags: Array<{ tag: string }>): string[] {
    return tags.map(t => t.tag).filter(Boolean);
}
