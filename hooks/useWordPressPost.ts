// src/hooks/useWordPressPost.ts
import useSWR from 'swr';
import { useEffect, useState, useMemo } from 'react';
import {
  fetcher,
  preprocessContent,
  extractExternalResources,
  createWPStyles,
  WPPost,
} from '@/utils/wordpressUtils';

interface UseWordPressPostResult {
  post: WPPost | null;
  processedContent: string;
  wpStyles: string;
  fontLinks: string[];
  isLoading: boolean;
  error: Error | null;
}

export function useWordPressPost(slug: string | string[] | undefined): UseWordPressPostResult {
  const validSlug = Array.isArray(slug) ? slug[0] : slug; // Handle array slugs if needed
  const encodedSlug = validSlug ? encodeURIComponent(validSlug) : null;

  const apiUrl = encodedSlug
    ? `https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts?slug=${encodedSlug}&_embed` // Added _embed
    : null;

  const { data: posts, error, isLoading } = useSWR<WPPost[]>(apiUrl, fetcher);

  const post = useMemo(() => (posts && posts.length > 0 ? posts[0] : null), [posts]);

  const [processedData, setProcessedData] = useState<{
    processedContent: string;
    wpStyles: string;
    fontLinks: string[];
  }>({
    processedContent: '',
    wpStyles: '',
    fontLinks: [],
  });

  useEffect(() => {
    if (post) {
      console.log("Processing post data in hook effect...");
      try {
        const content = post.content.rendered;
        const processed = preprocessContent(content);
        const resources = extractExternalResources(content);
        const styles = createWPStyles(post);

        setProcessedData({
          processedContent: processed,
          wpStyles: styles,
          fontLinks: resources.fontLinks,
        });
        console.log("Post data processing complete in hook.");
      } catch (processingError) {
         console.error("Error processing post content:", processingError);
         // Optionally set an error state here
      }
    } else {
      // Reset when post is null (e.g., navigating away or initial load)
       setProcessedData({ processedContent: '', wpStyles: '', fontLinks: [] });
    }
  }, [post]); // Depend only on the derived post object

  return {
    post,
    processedContent: processedData.processedContent,
    wpStyles: processedData.wpStyles,
    fontLinks: processedData.fontLinks,
    isLoading: isLoading || (apiUrl !== null && !post && !error), // Adjust loading state
    error: error ? error : null,
  };
}