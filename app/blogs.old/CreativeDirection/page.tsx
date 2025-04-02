"use client"
import React from "react";
import PageTransition from "@/components/Global/PageTransition";

import { RiArrowDropLeftLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import NavbarGroup from "@/components/Global/NavbarGroup";
import BlogDescription from "@/components/Blogs/CreativeDirectionBlog/BlogDescription"

import { useRouter } from "next/navigation";

import ThreeColumnFooter from "@/components/Global/LargeBreakpointFooter";
import Footer from "@/components/Global/Footer";
const GinoBlog = () => {
  const navigate = useRouter();

  const handleNavigation = () => {
    navigate.push("/blogs");
  };
  return (
    <main>
      <PageTransition>
        <NavbarGroup />

        <div className="w-full relative h-full  bg-black ">
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
                    Finding Your Creative Direction at a Marketing Agency
                  </h1>
                  <p className="text-[#FFFFFF] text-[20px] text-wrap text-opacity-[63%]  font-ox">
                    {" "}
                    Gino Fanega&apos;s journey as an Executive Creative Director at
                    Western Visayas&apos; 1st full-service marketing agency shows
                    finding creativity in marketing.
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
          <div className="md:hidden">
            <Footer />
          </div>

          <footer className="hidden md:block">
            <ThreeColumnFooter />
          </footer>
        </div>
      </PageTransition>
    </main>
  );
};

export default GinoBlog;
