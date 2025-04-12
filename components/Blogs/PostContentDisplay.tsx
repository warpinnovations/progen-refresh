// src/components/Blogs/PostContentDisplay.tsx
import React from 'react';
// import { Oxanium } from 'next/font/google'; // Keep font if needed globally or here

// const oxaniumFont = Oxanium({ weight: '500', subsets: ['latin'] }); // Use if needed

interface PostContentDisplayProps {
  processedContent: string;
  wpStyles: string;
  imageUrl?: string; // Pass image URL if you want to display it here
  blogTitle?: string; // Pass title for alt text
}

export default function PostContentDisplay({
  processedContent,
  wpStyles,
  imageUrl,
  blogTitle = 'Blog post image' // Default alt text
}: PostContentDisplayProps) {

  return (
    // Removed oxaniumFont.className unless specifically needed for this section only
    <div className="w-full px-10 lg:w-[55%] h-full text-white">
      {/* Apply WordPress styles specifically to the content area */}
      <style dangerouslySetInnerHTML={{ __html: wpStyles }} />

       {/* Optional: Display image within content area on mobile/smaller screens */}
       {imageUrl && (
         <div className='hidden lg:block mb-8'>
           <img
             src={imageUrl}
             alt={blogTitle}
             className='w-full h-auto object-cover rounded-lg'
           />
         </div>
       )}

      {/* Render the processed WordPress content */}
      {/* Added 'prose' and 'prose-invert' from Tailwind Typography for base styling, adjust if needed */}
      <div
        className="wp-content prose prose-invert max-w-none" // Added Tailwind Prose for potential base styling
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
}