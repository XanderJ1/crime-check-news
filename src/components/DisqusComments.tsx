"use client";
import { DiscussionEmbed } from "disqus-react";
import { commentConfig } from "@/lib/comment-config";

interface DisqusCommentsProps {
  articleId: string;
  articleTitle: string;
  articleUrl: string;
}

/**
 * Disqus Comments Component
 * Loads and displays Disqus comments for an article using disqus-react
 */
export default function DisqusComments({ articleId, articleTitle, articleUrl }: DisqusCommentsProps) {
  if (!commentConfig.disqus?.shortname) {
    return null;
  }

  const disqusConfig = {
    url: articleUrl,
    identifier: articleId,
    title: articleTitle,
  };

  return (
    <div className="mt-12">
      <DiscussionEmbed
        shortname={commentConfig.disqus.shortname}
        config={disqusConfig}
      />
    </div>
  );
}
