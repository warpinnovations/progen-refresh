import React from 'react';

const IconInsights = ({ className }: { className?: string }) => (
  <svg 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 50.8 50.8" 
    className={className}
  >
    <path 
      d="M7.854 33.546 16 22.893l7.52 16.293 6.267-27.572 3.76 8.773 5.64-6.893 3.76 8.146" 
      stroke="currentColor" // Use currentColor to inherit color from parent
      strokeWidth="2.50658" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

export default IconInsights;