'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Oxanium } from 'next/font/google';
import { FaRegUserCircle } from 'react-icons/fa';
import NavbarGroup from '@/components/Global/NavbarGroup';
import BlogButton from '@/components/Blogs/BlogButton';
import Footer from '@/components/Global/Footer';
import ThreeColumnFooter from '@/components/Global/LargeBreakpointFooter';
import Head from 'next/head';
import { useEffect } from 'react';

const oxaniumFont = Oxanium({ weight: '500', subsets: ['latin'] });

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

  const { data, error, isLoading } = useSWR<WPPost[]>(
    slug
      ? `https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts?slug=${slug}`
      : null,
    fetcher
  );

  // Add ability to handle anchors and format WordPress content
  useEffect(() => {
    // Add styles for WordPress content
    const style = document.createElement('style');
    style.innerHTML = `
      .wp-content img {
        max-width: 100%;
        height: auto;
        margin: 1.5rem 0;
      }
      .wp-content p {
        margin-bottom: 1.5rem;
        line-height: 1.8;
      }
      .wp-content h2, .wp-content h3, .wp-content h4 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: bold;
      }
      .wp-content a {
        color: #00A3FF;
        text-decoration: underline;
      }
      .wp-content ul, .wp-content ol {
        margin-left: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .wp-content blockquote {
        border-left: 4px solid #333;
        padding-left: 1rem;
        font-style: italic;
        margin: 1.5rem 0;
      }
      .wp-content pre {
        background: #111;
        padding: 1rem;
        overflow-x: auto;
        margin: 1.5rem 0;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (error)
    return (
      <div className='flex items-center justify-center min-h-screen bg-black text-white'>
        <div className='text-center p-8'>
          <h2 className={`text-2xl mb-4 ${oxaniumFont.className}`}>Failed to load post</h2>
          <p>There was an error loading this content. Please try again later.</p>
        </div>
      </div>
    );

  if (isLoading || !data || data.length === 0)
    return (
      <div className='flex items-center justify-center min-h-screen bg-black text-white'>
        <div className='text-center p-8'>
          <h2 className={`text-2xl mb-4 ${oxaniumFont.className}`}>Loading...</h2>
          <div className='w-12 h-12 border-t-2 border-b-2 border-white rounded-full animate-spin mx-auto'></div>
        </div>
      </div>
    );

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
          <div className='w-full lg:w-[45%] flex h-full justify-center'>
            <div className='lg:fixed lg:w-[45%] lg:px-30 flex flex-col gap-5'>
              <BlogButton />
              <div className='flex px-10 flex-col w-full justify-center text-left'>
                <h1
                  className={`text-[#FFFFFF] relative font-bold text-[30px] text-wrap md:text-[40px] 2xl:text-[40px] uppercase ${oxaniumFont.className}`}
                  dangerouslySetInnerHTML={{ __html: blogTitle }}
                />
                <p
                  className={`text-[#FFFFFF] text-[20px] text-wrap text-opacity-[63%] ${oxaniumFont.className} mt-4`}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                {formattedDate && (
                  <p
                    className={`text-[#FFFFFF] text-[16px] text-opacity-[70%] ${oxaniumFont.className} mt-2`}
                  >
                    {formattedDate}
                  </p>
                )}
              </div>

              <div className='flex gap-3 pb-5 px-10'>
                <FaRegUserCircle className='text-[#FFFFFF] text-[20px]' />
                <p className='text-[#FFFFFF] text-[15px] text-opacity-[63%] font-ox'>{author}</p>
              </div>

              {imageUrl && (
                <div className='px-10 lg:hidden'>
                  <img
                    src={imageUrl}
                    alt={blogTitle}
                    className='w-full h-auto object-cover rounded-lg mb-6'
                  />
                </div>
              )}
            </div>
          </div>
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

        <footer>
          <div className='md:hidden'>
            <Footer />
          </div>

          <div className='hidden md:block'>
            <ThreeColumnFooter />
          </div>
        </footer>
      </div>
    </>
  );
}
