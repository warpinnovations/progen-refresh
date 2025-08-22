import React from "react";
import Header from "@/components/Global/HeaderHero";
import PageTitle from "@/components/Global/PageTitle";
import { worksData } from "@/app/contants";
import Footer from "@/components/Global/Footer";
import ThreeColumnFooter from "@/components/Global/LargeBreakpointFooter";
import dynamic from "next/dynamic";

const WorksCarousel = dynamic(() => import("@/components/OurWorks/WorksCarousel"), {
  ssr: false,
  loading: () => <p className="text-center h-[500px]">Loading works...</p>,
});

const MainSectionWork = () => {
  return (
    <main>
      <Header />
      <PageTitle title="Our Works" />
      <div className="my-10">
        {/* Pass ALL the data to the component */}
        <WorksCarousel worksData={worksData} />
      </div>
      <footer>
        <div className="md:hidden">
          <Footer />
        </div>
        <div className="hidden md:block">
          <ThreeColumnFooter />
        </div>
      </footer>
    </main>
  );
};

export default MainSectionWork;