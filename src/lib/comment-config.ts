/**
 * Comment Provider Configuration
 * 
 * This file defines the interface for comment providers, making it easy
 * to switch between different comment systems (Disqus, Commento, custom, etc.)
 */

export type CommentProvider = "disqus" | "commento" | "custom";

export interface CommentConfig {
    provider: CommentProvider;
    disqus?: {
        shortname: string;
    };
    commento?: {
        url: string;
    };
    custom?: {
        apiEndpoint: string;
    };
}

// Default configuration - change this to switch providers
export const commentConfig: CommentConfig = {
    provider: "disqus",
    disqus: {
        shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || "crimechecknews",
    },
    // Uncomment to use Commento
    // provider: "commento",
    // commento: {
    //   url: "https://cdn.commento.io",
    // },
    // Uncomment to use custom comment system
    // provider: "custom",
    // custom: {
    //   apiEndpoint: "/api/comments",
    // },
};

/**
 * Get the current comment provider
 */
export function getCommentProvider(): CommentProvider {
    return commentConfig.provider;
}

/**
 * Check if comments are enabled
 */
export function areCommentsEnabled(): boolean {
    return commentConfig.provider !== null;
}
