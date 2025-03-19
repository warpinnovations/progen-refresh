'use client';

import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';

const API_URL = 'https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts';

// Fetcher function to get data from API
const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  slug: string;
  jetpack_featured_media_url?: string;
}
export default function Home() {
  const { data, error } = useSWR<WPPost[]>(API_URL, fetcher);

  if (error) return <div>Failed to load posts.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Prometheus Blog</title>
      </Head>
      <h1>Blog Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h2>
              <Link href={`/newBlogs/${post.slug}`}>
                {post.title.rendered.replace('&nbsp;', ' ')}
              </Link>
            </h2>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            {post.jetpack_featured_media_url && (
              <img src={post.jetpack_featured_media_url} alt={post.title.rendered} width={400} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
