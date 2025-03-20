import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';

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

const BlogsSectionWP = () => {
  const { data, error } = useSWR<WPPost[]>(API_URL, fetcher);

  if (error) return <div className='text-white'>Failed to load posts.</div>;
  if (!data) return <div className='text-white'>Loading...</div>;

  // Only display the first 3 posts in the specialized format
  const displayPosts = data.slice(0, 3);

  return (
    <div className='text-white pb-20 mx-10 flex flex-col'>
      <div className='' />

      {displayPosts.map((post, index) => (
        <div key={post.id} className='flex flex-col md:flex-row mt-12 justify-between w-full'>
          <div className='w-full md:w-[60%] flex'>
            {post.jetpack_featured_media_url ? (
              <img
                src={post.jetpack_featured_media_url}
                alt={post.title.rendered}
                className='flex rounded-lg'
              />
            ) : (
              <div className='flex rounded-lg bg-gray-800 w-full aspect-video items-center justify-center'>
                No Image
              </div>
            )}
          </div>

          <div className='w-full md:w-[40%] flex flex-col md:ml-14 my-4 mr-4 space-y-4'>
            <Link href={`/newBlogs/${post.slug}`}>
              <h1 className='text-xl md:text-3xl text-white font-bold cursor-pointer'>
                {post.title.rendered.replace(/&nbsp;/g, ' ')}
              </h1>
            </Link>
            <div className='flex flex-row w-full space-x-2'>
              <div className='flex items-center text-2xl'>
                <CgProfile />
              </div>
              <h3 className='flex'>Prometheus</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsSectionWP;
