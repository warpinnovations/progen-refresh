import React from 'react';
import PageTransition from '@/components/Global/PageTransition';
import Footer from '@/components/Global/Footer';
import dynamic from 'next/dynamic';
import NavbarGroup from '@/components/Global/NavbarGroup';

const HeroSectionDynamicNoSSR = dynamic(() => import('@/components/LandingPage/HeroSection'), {
  ssr: false
});

// Lazy load below-the-fold sections to reduce initial bundle and rendering cost
const FeaturedWorksGrid = dynamic(() => import('@/components/OurWorks/FeaturedWorksGrid'), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] bg-black" />,
});

const PrometheusPlayer = dynamic(() => import('@/components/LandingPage/PrometheusPlayer'), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] bg-black" />,
});

const Certifications = dynamic(() => import('@/components/LandingPage/Certifications'), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] bg-black" />,
});

const StarshipandBrandsNoSSR = dynamic(
  () => import('@/components/LandingPage/StarshipsAndBrands'),
  { ssr: false, loading: () => <div className="w-full h-[50vh] bg-black" /> }
);

const OurServices = dynamic(() => import('@/components/LandingPage/OurServices'), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] bg-black" />,
});

const AnniversarySection = dynamic(() => import('@/components/LandingPage/AnniversarySection'), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] bg-black" />,
});

const LandingPage = () => {
  return (
    <div className='h-auto w-full flex flex-col justify-center  bg-black overflow-x-hidden '>
      <PageTransition>
        <NavbarGroup />
        <HeroSectionDynamicNoSSR />
        <FeaturedWorksGrid />
        <div className='w-full'>
          <div className='flex justify-center items-center'>
            <PrometheusPlayer />
          </div>
        </div>
        <Certifications />
        {/* <Services /> */}
        <StarshipandBrandsNoSSR />
        {/* <StarshipCaptains /> */}
        <OurServices />
        {/* <ProminentSection /> */}
        <AnniversarySection />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default LandingPage;
