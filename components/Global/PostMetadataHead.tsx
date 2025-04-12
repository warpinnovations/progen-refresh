// src/components/Global/PostMetadataHead.tsx
import Head from 'next/head';
import { WPPost } from '@/utils/wordpressUtils';

interface PostMetadataHeadProps {
  post: WPPost | null; // Allow null for initial state
  fontLinks: string[];
}

export default function PostMetadataHead({ post, fontLinks }: PostMetadataHeadProps) {
  if (!post) {
    return null; // Don't render anything if post data isn't available yet
  }

  const blogTitle = post.title.rendered || 'Blog Post';
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '') || 'No description available';
  const imageUrl = post.jetpack_featured_media_url;

  return (
    <Head>
      <title>{blogTitle}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={blogTitle} />
      <meta property='og:description' content={description} />
      {imageUrl && <meta property='og:image' content={imageUrl} />}
      <meta name='author' content={post._embedded?.author?.[0]?.name || 'Prometheus'} />

      {/* Load Google Fonts from WordPress */}
      {fontLinks.map((link, index) => (
        <link key={`font-${index}`} rel='stylesheet' href={link} crossOrigin="anonymous" />
      ))}

      {/* Add other essential head elements if needed */}
    </Head>
  );
}