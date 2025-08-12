// src/components/Blogs/BlogPostClient.tsx
'use client'; // <-- This component uses client-side hooks

import { useParams, notFound } from 'next/navigation';
import { Oxanium } from 'next/font/google';
import { Fragment } from 'react'; // Use Fragment instead of unnecessary <></>

// Global Components
import NavbarGroup from '@/components/Global/NavbarGroup';
import ResponsiveFooter from '@/components/Global/ResponsiveFooter';
import ErrorState from '@/components/Global/ErrorState';
import LoadingState from '@/components/Global/LoadingState';

// Blog Specific Components
import BlogSidebar from '@/components/Blogs/BlogSidebar';
import BlogContactUs from '@/components/Blogs/BlogContactUs';
import PostContentDisplay from '@/components/Blogs/PostContentDisplay';

// Hook and Utils (Utils are fine to import in client components)
import { useWordPressPost } from '@/hooks/useWordPressPost';
import { WPPost } from '@/utils/wordpressUtils';
// WPPost type might be needed if you type props/state here
// import { WPPost } from '@/utils/wordpressUtils';

const oxaniumFont = Oxanium({ weight: '500', subsets: ['latin'] });

// --- Client-Side Page Component Logic (Moved Here) ---
export default function BlogPostClient({posts}: {posts: WPPost[]}) {
  const params = useParams();
  // Ensure slug is treated as a string, taking the first element if it's an array
  const slugParam = params.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  // Use the custom hook to fetch and process data
  // const { post, processedContent, wpStyles, fontLinks, isLoading, error } = useWordPressPost(slug);

  const { post, processedContent, wpStyles, fontLinks } = useWordPressPost(posts);

  
  // // Handle Not Found - triggered by SWR error or if post is null after loading
  // const isNotFound = !isLoading && !error && !post && slug;
  // if (isNotFound) {
  //   notFound(); // Trigger Next.js 404 page
  // }

  // // Handle Error State
  // if (error) {
  //   console.error("Error loading post:", error);
  //   // Check if the error indicates a 404
  //   if (error.message.includes('404') || error.message.includes('Failed to fetch: 404')) {
  //       notFound();
  //   }
  //   return <ErrorState title='Failed to load post' errorDetails={error.message} />;
  // }

  // Handle Loading State
  if (!post) {
    return <LoadingState />;
  }

  // --- Prepare Data for Components ---
  const blogTitle = post.title.rendered || 'Blog Post';
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '');
  const authorName = post._embedded?.author?.[0]?.name || 'Prometheus';
  const imageUrl = post.jetpack_featured_media_url;
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';

  return (
    // Use Fragment for the root element if no common wrapper needed here
    <Fragment>
      {/*
        Dynamically load fonts using <link> tags.
        Next.js automatically moves <link> tags found during SSR/client render
        into the <head>. This works alongside generateMetadata.
      */}
      {fontLinks.map((link, index) => (
         <link key={`font-link-${index}`} rel="stylesheet" href={link} crossOrigin="anonymous" />
      ))}

      {/* Global link style (optional, could be in global CSS or layout) */}
      <style jsx global>{`
        article a, .wp-content a {
          text-decoration: none !important;
        }
      `}</style>

      <div className={`bg-black w-full flex flex-col relative h-full min-h-screen ${oxaniumFont.className}`}>
        <NavbarGroup />

        <article className='flex flex-col lg:flex-row pt-[10%] pb-10'>
          {/* Left Side Sidebar */}
          <BlogSidebar
            blogTitle={blogTitle}
            excerpt={excerpt}
            formattedDate={formattedDate}
            author={authorName}
            imageUrl={imageUrl}
          />

          {/* Right Side Content */}
          <PostContentDisplay
            processedContent={processedContent}
            wpStyles={wpStyles}
            imageUrl={imageUrl}
            blogTitle={blogTitle}
          />
        </article>

        {/* Contact Form - Separate section with proper spacing */}
        <section className='w-full px-10 lg:px-20 py-16 bg-black'>
          <div className='w-full lg:w-[53%] lg:mr-0 lg:ml-auto lg:pr-12'>
            <BlogContactUs />
          </div>
        </section>

        <ResponsiveFooter />
      </div>
    </Fragment>
  );
}



