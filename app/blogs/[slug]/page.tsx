// src/app/blog/[slug]/page.tsx
// NO 'use client' directive here!

import { Metadata } from 'next';
import { notFound } from 'next/navigation'; // Can be used server-side

// Utils and Types
import { getPostForMetadata, WPPost } from '@/utils/wordpressUtils';

// The new Client Component that holds the main page logic
import BlogPostClient from '@/components/Blogs/BlogPostClient'; // Adjust path if needed

// --- Server-Side Metadata Generation (Stays Here) ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const post = await getPostForMetadata(slug); // Use the utility function

  if (!post) {
    // Option 1: Trigger notFound directly if supported in your Next.js version
    // notFound();

    // Option 2: Return minimal "Not Found" metadata
    console.warn(`Metadata generation: Post with slug "${slug}" not found.`);
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const blogTitle = post.title?.rendered || 'Blog Post';
  const description = post.excerpt?.rendered?.replace(/<[^>]+>/g, '').substring(0, 160) || 'Read this blog post.';
  const imageUrl = post.jetpack_featured_media_url || '/default-image.jpg'; // Provide a default image
  const authorName = post._embedded?.author?.[0]?.name || 'Prometheus';

  return {
    title: blogTitle,
    description,
    openGraph: {
      title: blogTitle,
      description,
      images: [{ url: imageUrl }],
      type: 'article',
      publishedTime: post.date,
      authors: [authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title: blogTitle,
      description,
      images: [imageUrl],
    },
    // Add other metadata tags as needed
  };
}

// --- Server Component Page Structure ---
export default function BlogPageServer({ params }: { params: { slug: string } }) {
  // This component runs on the server.
  // It can fetch data here if needed *before* rendering the client component,
  // but currently, data fetching is handled client-side in BlogPostClient.

  // It simply renders the Client Component wrapper.
  // We don't need to pass the slug explicitly because the client component
  // uses `useParams` to get it.
  return <BlogPostClient />;
}