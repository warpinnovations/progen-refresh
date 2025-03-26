'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Oxanium } from 'next/font/google';
import NavbarGroup from '@/components/Global/NavbarGroup';
import ResponsiveFooter from '@/components/Global/ResponsiveFooter';
import Head from 'next/head';
import BlogSidebar from '@/components/Blogs/BlogSidebar';
import ErrorState from '@/components/Global/ErrorState';
import LoadingState from '@/components/Global/LoadingState';

const oxaniumFont = Oxanium({ weight: '500', subsets: ['latin'] });

// Improved fetcher with error handling
const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export default function PostPage() {
  const { slug } = useParams();
  interface WPPost {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    link: string;
    jetpack_featured_media_url?: string;
    author?: {
      name?: string;
    };
    date?: string;
  }

  // Ensure the slug is properly decoded and escaped for the API call
  const encodedSlug = slug ? encodeURIComponent(String(slug)) : '';

  const { data, error, isLoading } = useSWR<WPPost[]>(
    encodedSlug
      ? `https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts?slug=${encodedSlug}`
      : null,
    fetcher
  );

  if (error) {
    return <ErrorState title='Failed to load post' errorDetails={error.message} />;
  }

  if (isLoading || !data || data.length === 0) {
    return <LoadingState />;
  }

  const post = data[0];
  const blogTitle = post.title.rendered || 'Blog Post';
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '') || 'No description available';
  const author = post.author?.name || 'Prometheus';
  const imageUrl = post.jetpack_featured_media_url;
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <>
      <Head>
        <title>{blogTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={blogTitle} />
        <meta property='og:description' content={description} />
        {imageUrl && <meta property='og:image' content={imageUrl} />}
        <meta name='author' content='[ Prometheus ]' />
      </Head>

      <div className='bg-black w-full flex flex-col relative h-full min-h-screen'>
        <NavbarGroup />
        <article className='flex flex-col lg:flex-row pt-[10%] pb-10'>
          {/*Left Side*/}
          <BlogSidebar
            blogTitle={blogTitle}
            description={description}
            formattedDate={formattedDate}
            author={author}
            imageUrl={imageUrl}
          />
          {/*Right Side */}
          <div className={`w-full px-10 lg:w-[55%] h-full ${oxaniumFont.className} text-white`}>
            {imageUrl && (
              <div className='hidden lg:block mb-8'>
                <img
                  src={imageUrl}
                  alt={blogTitle}
                  className='w-full h-auto object-cover rounded-lg'
                />
              </div>
            )}
            <div
              className='wp-content'
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
            <div className='mt-8 pb-10'>
              <a
                href={post.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#00A3FF] hover:underline'
              >
                Read original post on WordPress
              </a>
            </div>
          </div>
        </article>

        <ResponsiveFooter />
      </div>
    </>
  );
}
