'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Header from '@/components/Global/HeaderHero';
import PageTitle from '@/components/Global/PageTitle';
import Footer from '@/components/Global/Footer';
import ThreeColumnFooter from '@/components/Global/LargeBreakpointFooter';
import PageTransition from '@/components/Global/PageTransition';
import BlogCardWP from '@/components/Blogs/BlogPostsWP';
import ErrorState from '@/components/Global/ErrorState';
import LoadingState from '@/components/Global/LoadingState';
// import BlogsSectionWP from "@/components/Blogs/BlogsSectionWP";

// Base API URL
const BASE_API_URL =
  'https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts';
// Set a higher per_page value (WordPress max is 100 per page)
const PER_PAGE = 100;

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  slug: string;
  jetpack_featured_media_url?: string;
}

// Fetcher function to get data from API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MainSectionBlogsWP = () => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<WPPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Construct API URL with pagination parameters
  const API_URL = `${BASE_API_URL}?per_page=${PER_PAGE}&page=${page}`;

  const { data, error } = useSWR<WPPost[]>(API_URL, fetcher);

  useEffect(() => {
    if (data) {
      // Only update state if there's actually new data to process
      setAllPosts((prevPosts) => {
        // Create a Set of existing post IDs for efficient lookup
        const existingIds = new Set(prevPosts.map(p => p.id));

        // Filter the newly fetched data to include only posts not already present
        const newUniquePosts = data.filter(post => !existingIds.has(post.id));

        // If there are no truly new posts, return the previous state to avoid unnecessary re-renders
        if (newUniquePosts.length === 0 && data.length > 0) {
           // Check if this batch was the last page even if no new posts were added (e.g., due to revalidation)
           if (data.length < PER_PAGE) {
                setHasMore(false);
           }
           setIsLoadingMore(false); // Ensure loading state is reset
           return prevPosts; // Return previous state unmodified
        }

        // Append only the truly new posts
        const updatedPosts = [...prevPosts, ...newUniquePosts];

        // Check if this fetch indicates the end of the posts
        if (data.length === 0 || data.length < PER_PAGE) {
            setHasMore(false);
        }

        // Reset loading state *after* processing
        setIsLoadingMore(false);

        return updatedPosts; // Return the updated list
      });
    }
  }, [data]);

  const loadMore = () => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (error) {
    return <ErrorState title='Failed to load posts' errorDetails={error.message} />;
  }

  if (!data && allPosts.length === 0) {
    return <LoadingState message='Loading blog posts...' />;
  }

  const displayPosts = allPosts.length > 0 ? allPosts : data || [];

  return (
    <div className='bg-black'>
      <PageTransition>
        <Header />
        <PageTitle title='Blogs' />
        {/* <div className="z-0 relative">
          <BlogsSectionWP />
        </div> */}
        <div className='bg-black z-0 relative postsContainer'>
          {displayPosts.map((post) => (
            <BlogCardWP key={post.id} post={post} />
          ))}
        </div>

        {hasMore && (
          <div className='flex justify-center pb-10'>
            <button
              onClick={loadMore}
              disabled={isLoadingMore}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              {isLoadingMore ? 'Loading...' : 'Load More Posts'}
            </button>
          </div>
        )}

        <ThreeColumnFooter />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default MainSectionBlogsWP;
