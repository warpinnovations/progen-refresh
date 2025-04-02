'use client';

import React from 'react';
import NavbarGroup from '@/components/Global/NavbarGroup';
import MainSectionBlogsWP from '@/components/Blogs/MainSectionBlogsWP';

export default function Page() {
  return (
    <main className='bg-black'>
      <NavbarGroup />
      <MainSectionBlogsWP />
    </main>
  );
}
