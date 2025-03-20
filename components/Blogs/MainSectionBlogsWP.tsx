'use client';

import React from 'react';
import useSWR from 'swr';
import Header from '@/components/Global/HeaderHero';
import PageTitle from '@/components/Global/PageTitle';
import Footer from '@/components/Global/Footer';
import ThreeColumnFooter from '@/components/Global/LargeBreakpointFooter';
import PageTransition from '@/components/Global/PageTransition';
import BlogCardWP from '@/components/Blogs/BlogPostsWP';
// import BlogsSectionWP from "@/components/Blogs/BlogsSectionWP";

const API_URL = 'https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts';

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
  const { data, error } = useSWR<WPPost[]>(API_URL, fetcher);

  if (error)
    return (
      <div className='bg-black text-white min-h-screen flex items-center justify-center'>
        Failed to load posts.
      </div>
    );
  if (!data)
    return (
      <div className='bg-black text-white min-h-screen flex items-center justify-center'>
        Loading...
      </div>
    );

  return (
    <div className='bg-black'>
      <PageTransition>
        <Header />
        <PageTitle title='Blogs' />
        {/* <div className="z-0 relative">
          <BlogsSectionWP />
        </div> */}
        <div className='bg-black z-0 relative postsContainer'>
          {data.map((post) => (
            <BlogCardWP key={post.id} post={post} />
          ))}
        </div>
        <ThreeColumnFooter />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default MainSectionBlogsWP;
