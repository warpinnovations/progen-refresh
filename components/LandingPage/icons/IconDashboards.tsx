import React from 'react';

const IconDashboards = ({ className }: { className?: string }) => (
  <svg 
    fill="none" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <g>
      <path 
        id="Vector" 
        d="M10 18H21M3 18H6M6 18V20M6 18V16M20 12H21M3 12H16M16 12V14M16 12V10M14 6H21M3 6H10M10 6V8M10 6V4" 
        stroke="currentColor" // Use currentColor to inherit color from parent
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </g>
  </svg>
);

export default IconDashboards;