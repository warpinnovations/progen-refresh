'use client';

import { FaRegUserCircle } from 'react-icons/fa';
import BlogButton from './BlogButton';
import BlogHeader from './BlogHeader';

interface BlogSidebarProps {
  blogTitle: string;
  description: string;
  formattedDate: string;
  author: string;
  imageUrl?: string;
}

const BlogSidebar = ({
  blogTitle,
  description,
  formattedDate,
  author,
  imageUrl
}: BlogSidebarProps) => {
  return (
    <div className='w-full lg:w-[45%] flex h-full justify-center'>
      <div className='lg:fixed lg:w-[45%] lg:px-30 flex flex-col gap-5'>
        <BlogButton />
        <BlogHeader blogTitle={blogTitle} description={description} formattedDate={formattedDate} />

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
  );
};

export default BlogSidebar;
