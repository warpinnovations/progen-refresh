'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowDropLeftLine } from 'react-icons/ri';

const BlogButtonWP = () => {
  const navigate = useRouter();

  const handleNavigation = () => {
    navigate.push('/blogs');
  };

  return (
    <div
      onClick={handleNavigation}
      className='flex cursor-pointer px-10 justify-left items-center sm:pb-5 w-full'
    >
      <RiArrowDropLeftLine className='text-[#FFFFFF] text-opacity-[63%] font-ox text-4xl' />
      <p className='text-[#FFFFFF] text-opacity-[63%] uppercase font-ox justify-center items-center text-center'>
        Blog
      </p>
    </div>
  );
};

export default BlogButtonWP;
