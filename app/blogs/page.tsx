
import React from 'react';
import NavbarGroup from '@/components/Global/NavbarGroup';
import MainSectionBlogsWP from '@/components/Blogs/MainSectionBlogsWP';
import ErrorState from '@/components/Global/ErrorState';

// Base API URL
const BASE_API_URL =
  'https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts';
// Set a higher per_page value (WordPress max is 100 per page)
const PER_PAGE = 100;

const REVALIDATE_TIME = 60; // Regenerate every 60 seconds

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  slug: string;
  jetpack_featured_media_url?: string;
}

export default async function Page() {
  const API_URL = `${BASE_API_URL}?per_page=${PER_PAGE}&page=1`; //always fetches first page
  const res = await fetch(
    API_URL, { next: { revalidate: REVALIDATE_TIME } }
  );

  
  if (!res.ok){
    const errorBody = await res.json();
    return <ErrorState title='Failed to load posts' errorDetails={errorBody.message} />
  };
  
  const data: WPPost[] = await res.json();

  return (
    <main className='bg-black'>
      <NavbarGroup />
      <MainSectionBlogsWP data={data}/>
    </main>
  );
}



