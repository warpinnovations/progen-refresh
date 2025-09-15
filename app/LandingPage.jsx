import React from 'react';
import HeroSection from '@/components/LandingPage/HeroSection';
import PageTransition from '@/components/Global/PageTransition';
import PrometheusPlayer from '@/components/LandingPage/PrometheusPlayer';
import Services from '@/components/LandingPage/Services';
import OurServices from '@/components/LandingPage/OurServices';
import Footer from '@/components/Global/Footer';
import StarshipCaptains from '@/components/LandingPage/StarshipCaptains';
import dynamic from 'next/dynamic';
import Contact from '@/components/LandingPage/ContactUs';
import ThreeColumnFooter from '@/components/Global/LargeBreakpointFooter';
import NavbarGroup from '@/components/Global/NavbarGroup';
import Certifications from '@/components/LandingPage/Certifications';
import Awards from "@/components/LandingPage/Awards";
import ProminentSection from '@/components/LandingPage/ProminentSection';
import AnniversarySection from '@/components/LandingPage/AnniversarySection'
import FeaturedWorksGrid from '@/components/OurWorks/FeaturedWorksGrid';
import { worksData } from '@/app/contants';

const StarshipandBrandsNoSSR = dynamic(
  () => import('@/components/LandingPage/StarshipsAndBrands'),
  { ssr: false }
);

const HeroSectionDynamicNoSSR = dynamic(() => import('@/components/LandingPage/HeroSection'), {
  ssr: false
});

const LandingPage = () => {
  return (
    <div className='h-auto w-full flex flex-col justify-center  bg-black overflow-x-hidden '>
      <PageTransition>
        <NavbarGroup />
        <HeroSectionDynamicNoSSR />
        <Certifications />
        <div className='w-full'>
          <div className='flex justify-center items-center'>
            <PrometheusPlayer />
          </div>
        </div>
        {/* <Services /> */}
        <StarshipandBrandsNoSSR />
        {/* <StarshipCaptains /> */}
        <OurServices />
        <FeaturedWorksGrid />
        {/* <ProminentSection /> */}
        <AnniversarySection />
        <ThreeColumnFooter />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default LandingPage;
