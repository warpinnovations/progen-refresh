"use client";
import { NavData } from "@/app/contants";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Oxanium } from "next/font/google";
import { useRouter } from "next/navigation";
const OxaniumFont = Oxanium({ weights: [700], subsets: ["latin"] }); // Corrected prop name

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed w-full py-10 z-[100] overflow-y-hidden font-bold font-ox transition-colors duration-300 ${ // Added transition
        !isScrolled ? "scrolled-nav" : "bg-black/50"
        }  `}
    >
      <div
        className={`hidden lg:flex justify-between items-center w-[90%] gap-10`}
      >
        <Link href={"/"}>
          <Image
            src={"/LandingPageAssets/logoNavbar.png"}
            height={100}
            width={200}
            alt="Prometheus Logo"
            className="pl-5 cursor-pointer"
          />
        </Link>

        <div className="hidden lg:flex justify-end items-center w-full">
          {/* Main nav links, tightly grouped */}
          <div className="flex gap-6">
            {NavData.filter((nav) => nav.nav !== "Contact Us").map((nav, index) => (
              <Link href={nav.Link} key={index}>
                <div
                  className={`font-bold uppercase font-ox hover:scale-110 cursor-pointer ease-in-out duration-300 transition text-white ${OxaniumFont.className}`}
                >
                  {nav.nav}
                </div>
              </Link>
            ))}
          </div>
          {/* Contact Us button */}
          <div className="ml-6">
            {NavData.filter((nav) => nav.nav === "Contact Us").map((nav, index) => (
              <Link href={nav.Link} key={index}>
                {/* --- THIS IS THE LINE THAT WAS CHANGED --- */}
                <div
                  className={`px-6 py-2 border border-white rounded-full font-bold uppercase font-ox hover:bg-white hover:text-black transition duration-300 cursor-pointer ${isScrolled ? "bg-white text-black" : "text-white"
                    }`}
                >
                  {nav.nav}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex lg:hidden">
        <div className={``}>
          {!sidebarOpen ? (
            <button
              onClick={toggleSidebar}
              className={`absolute p-4 text-white hover:text-gray-300 focus:outline-none`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;