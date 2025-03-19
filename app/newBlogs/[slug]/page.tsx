'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Head from 'next/head';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostPage() {
  const { slug } = useParams();
  interface WPPost {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
    jetpack_featured_media_url?: string;
  }
  const { data, error } = useSWR<WPPost[]>(
    slug
      ? `https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts?slug=${slug}`
      : null,
    fetcher
  );

  if (error) return <div>Failed to load post.</div>;
  if (!data || data.length === 0) return <div>Loading...</div>;

  const post = data[0];

  return (
    <div>
      <Head>
        <title>{post.title.rendered}</title>
      </Head>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      {post.jetpack_featured_media_url && (
        <img src={post.jetpack_featured_media_url} alt={post.title.rendered} width={600} />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      <p>
        <a href={post.link} target='_blank'>
          Read on WordPress
        </a>
      </p>
    </div>
  );
}
