import React from "react";
import HeroSection from "@/components/LandingPage/HeroSection";
import PageTransition from "@/components/Global/PageTransition";
import PrometheusPlayer from "@/components/LandingPage/PrometheusPlayer";
import Services from "@/components/LandingPage/Services";
import Footer from "@/components/Global/Footer";
import StarshipCaptains from "@/components/LandingPage/StarshipCaptains";
import dynamic from "next/dynamic";
import Contact from "@/components/LandingPage/ContactUs"
import ThreeColumnFooter from "@/components/Global/LargeBreakpointFooter";
import NavbarGroup from "@/components/Global/NavbarGroup";
const StarshipandBrandsNoSSR = dynamic(
  () => import("@/components/LandingPage/StarshipsAndBrands"),
  { ssr: false }
);

const HeroSectionDynamicNoSSR = dynamic( () =>
  import("@/components/LandingPage/HeroSection"), { ssr: false }
) 

const LandingPage = () => {
  return (
    <div className="h-auto w-full flex flex-col justify-center  bg-black overflow-x-hidden ">
      <PageTransition>
        <NavbarGroup />
        <HeroSectionDynamicNoSSR />
        <div className="w-full">
          <div className="flex justify-center items-center">
            <PrometheusPlayer />
          </div>
        </div>
        <Services />
        <StarshipandBrandsNoSSR />
        <StarshipCaptains />
        <Contact/>
        <ThreeColumnFooter />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default LandingPage;
