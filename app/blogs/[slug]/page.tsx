// src/app/blog/[slug]/page.tsx
// NO 'use client' directive here!

import { Metadata } from 'next';
import { notFound } from 'next/navigation'; // Can be used server-side

// Utils and Types
import { getPostForMetadata, WPPost } from '@/utils/wordpressUtils';

// The new Client Component that holds the main page logic
import BlogPostClient from '@/components/Blogs/BlogPostClient'; // Adjust path if needed
import { setTimeout } from 'timers/promises';
import ErrorState from '@/components/Global/ErrorState';

const REVALIDATE_TIME = 60; // Regenerate every 60 seconds


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
export default async function BlogPageServer({ params }: { params: { slug: string } }) {
  // This component runs on the server.
  // It can fetch data here if needed *before* rendering the client component,
  // but currently, data fetching is handled client-side in BlogPostClient.

  const slug = params.slug;
  const validSlug = Array.isArray(slug) ? slug[0] : slug; // Handle array slugs if needed
  const encodedSlug = encodeURIComponent(validSlug) ;

  const apiUrl = `https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts?slug=${encodedSlug}&_embed`; // Added _embed
  
  const res = await fetch(
    apiUrl, { next: { revalidate: REVALIDATE_TIME } }
  );


  if (!res.ok){
    const error = await res.json();
    console.error("Error loading post:", error);
    // Check if the error indicates a 404
    if (error.message.includes('404') || error.message.includes('Failed to fetch: 404')) {
        notFound();
    }
    return <ErrorState title='Failed to load posts' errorDetails={error.message} />
  };
  
  const posts: WPPost[] = await res.json();
  


  // Handle Not Found - triggered by SWR error or if post is null after loading
  const isNotFound = !posts && slug;
  if (isNotFound) {
    notFound(); // Trigger Next.js 404 page
  }


  // It simply renders the Client Component wrapper.
  // We don't need to pass the slug explicitly because the client component
  // uses `useParams` to get it.
  return <BlogPostClient posts={posts}/>;
}