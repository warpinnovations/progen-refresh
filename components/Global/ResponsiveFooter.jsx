import React from 'react';
import Footer from '@/components/Global/Footer';
import ThreeColumnFooter from '@/components/Global/LargeBreakpointFooter';

/**
 * ResponsiveFooter component that conditionally renders different footers based on screen size
 * - Mobile screens (<768px): Renders the regular Footer component
 * - Desktop screens (≥768px): Renders the ThreeColumnFooter component
 */
const ResponsiveFooter = () => {
  return (
    <footer>
      <div className='md:hidden'>
        <Footer />
      </div>

      <div className='hidden md:block'>
        <ThreeColumnFooter />
      </div>
    </footer>
  );
};

export default ResponsiveFooter;
