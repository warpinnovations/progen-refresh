"use client";

import React from "react";
import PageTransition from "@/components/Global/PageTransition";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import NavbarGroup from "@/components/Global/NavbarGroup";
import BlogDescription from "@/components/Blogs/KwatroDistritoBlog/BlogDescription/BlogDesription";
import { useRouter } from "next/navigation";
import Footer from "@/components/Global/Footer";
import ThreeColumnFooter from "@/components/Global/LargeBreakpointFooter";


const KwartoDistritoBlog = () => {
  const navigate = useRouter();

  const handleNavigation = () => {
    navigate.push("/blogs");
  };


  return (
    <main>
      <PageTransition>
        <NavbarGroup />

        <main className="w-full relative h-full  bg-black ">
          {/*Left Side*/}
          <div className="flex flex-col lg:flex-row pt-[10%] ">
            <div className=" lg:w-[45%] flex  h-full justify-center  ">
              <div className=" lg:fixed lg:px-30 flex flex-col gap-5 ">
                <div
                  onClick={handleNavigation}
                  className="flex cursor-pointer  px-10 justify-left items-center sm:pb-5  w-full"
                >
                  <RiArrowDropLeftLine className="text-[#FFFFFF] text-opacity-[63%] font-ox text-4xl" />
                  <p className="text-[#FFFFFF] text-opacity-[63%] uppercase font-ox justify-center items-center text-center ">
                    Blog
                  </p>
                </div>

                <div className="flex px-10 flex-col   justify-center text-left">
                  <h1 className="text-[#FFFFFF] font-bold text-[30px] text-wrap md:text-[50px] lg:text-[57px] uppercase font-ox">
                    Bugal sang <br />
                    kwatro distrito
                  </h1>
                  <p className="text-[#FFFFFF] text-[20px] text-wrap text-opacity-[63%]  font-ox">
                    {" "}
                    Campaign sets the Fourth District of Iloilo on the Tourist
                    Map
                  </p>
                </div>

                <div className="flex gap-3 pb-5 px-10">
                  <FaRegUserCircle className="text-[#FFFFFF] text-[20px]" />
                  <p className="text-[#FFFFFF] text-[15px] text-opacity-[63%] font-ox">
                    Prometheus
                  </p>
                </div>
              </div>
            </div>

            {/*Right Side */}
            <div className="lg:w-[65%] h-full ">
              <BlogDescription />
            </div>
          </div>
          <footer className="md:hidden">
            <Footer />
          </footer>

          <footer className="hidden md:block">
            <ThreeColumnFooter />
          </footer>
        </main>
      </PageTransition>
    </main>
  );
};

export default KwartoDistritoBlog;
