"use client";
import dynamic from "next/dynamic";
import { commentConfig, getCommentProvider } from "@/lib/comment-config";

// Dynamically import comment providers to reduce bundle size
const DisqusComments = dynamic(() => import("./DisqusComments"), {
    ssr: false,
    loading: () => (
        <div className="mt-12 p-8 bg-gray-50 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
        </div>
    ),
});

// Placeholder for future comment providers
// const CommentoComments = dynamic(() => import("./CommentoComments"), { ssr: false });
// const CustomComments = dynamic(() => import("./CustomComments"), { ssr: false });

interface CommentSectionProps {
    articleId: string;
    articleTitle: string;
    articleUrl: string;
}

/**
 * Comment Section Component
 * Renders the appropriate comment provider based on configuration
 * This abstraction makes it easy to switch between different comment systems
 */
export default function CommentSection({ articleId, articleTitle, articleUrl }: CommentSectionProps) {
    const provider = getCommentProvider();

    return (
        <section className="max-w-4xl mx-auto px-4 py-12">
            <div className="border-t border-gray-200 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Comments</h2>

                {provider === "disqus" && (
                    <DisqusComments
                        articleId={articleId}
                        articleTitle={articleTitle}
                        articleUrl={articleUrl}
                    />
                )}

                {/* Add other providers here when needed */}
                {/* {provider === "commento" && <CommentoComments {...props} />} */}
                {/* {provider === "custom" && <CustomComments {...props} />} */}

                {!provider && (
                    <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">Comments are currently disabled.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
