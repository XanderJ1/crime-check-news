"use client";
import { useEffect } from "react";
import { commentConfig } from "@/lib/comment-config";

interface DisqusCommentsProps {
  articleId: string;
  articleTitle: string;
  articleUrl: string;
}

/**
 * Disqus Comments Component
 * Loads and displays Disqus comments for an article
 */
export default function DisqusComments({ articleId, articleTitle, articleUrl }: DisqusCommentsProps) {
  useEffect(() => {
    if (!commentConfig.disqus?.shortname) {
      console.error("Disqus shortname not configured");
      return;
    }

    // Disqus configuration
    (window as any).disqus_config = function () {
      this.page.url = articleUrl;
      this.page.identifier = articleId;
      this.page.title = articleTitle;
    };

    // Load Disqus script
    const script = document.createElement("script");
    script.src = `https://${commentConfig.disqus.shortname}.disqus.com/embed.js`;
    script.setAttribute("data-timestamp", String(+new Date()));
    script.async = true;

    const disqusThread = document.getElementById("disqus_thread");
    if (disqusThread) {
      disqusThread.appendChild(script);
    }

    // Cleanup
    return () => {
      const existingScript = document.querySelector(`script[src*="disqus.com/embed.js"]`);
      if (existingScript) {
        existingScript.remove();
      }
      // Reset Disqus
      if ((window as any).DISQUS) {
        (window as any).DISQUS.reset({
          reload: true,
        });
      }
    };
  }, [articleId, articleTitle, articleUrl]);

  return (
    <div className="mt-12">
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
}
