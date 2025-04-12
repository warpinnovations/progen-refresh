'use client';

import { Oxanium } from 'next/font/google';

const oxaniumFont = Oxanium({ weight: '500', subsets: ['latin'] });

interface BlogHeaderProps {
  blogTitle: string;
  excerpt: string;
  formattedDate?: string;
}

const BlogHeader = ({ blogTitle, excerpt, formattedDate }: BlogHeaderProps) => {
  return (
    <div className='flex px-10 flex-col w-full justify-center text-left'>
      <h1
        className={`text-[#FFFFFF] relative font-bold text-[30px] text-wrap md:text-[40px] 2xl:text-[40px] uppercase ${oxaniumFont.className}`}
        dangerouslySetInnerHTML={{ __html: blogTitle }}
      />
      {excerpt && (
        <p
        className={`text-[#FFFFFF] text-[20px] text-wrap text-opacity-[63%] ${oxaniumFont.className} mt-4`}
      >
        </p>
        )}
      {formattedDate && (
        <p
          className={`text-[#FFFFFF] text-[16px] text-opacity-[70%] ${oxaniumFont.className} mt-2`}
        >
          {formattedDate}
        </p>
      )}
    </div>
  );
};

export default BlogHeader;
