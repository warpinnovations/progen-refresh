"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Oxanium } from 'next/font/google';
// import logo from '../assets/images/logo.png';
const OxaniumFont = Oxanium({ weights: 700, subsets: ['latin'] });


const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`md:w-60 md:flex-shrink-0 h-5`}>
      <div className={``}>
        {!sidebarOpen ? <button
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
          : <></>}
      </div>

      
      <aside
        className={`rounded-xl md:flex-shrink-0 bg-black px-2 top-0 z-50 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
          }`}
      >
        <div className="flex flex-col justify-end mb-8 left-0 p-2">
          <div className='flex justify-end'>
            <button
              onClick={toggleSidebar}
              className={` text-white hover:text-gray-300 focus:outline-none mb-3`}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

            </button>
          </div>

          <img className="w-36 mr-4" src={"/logo.png"} alt="Logo" />


        </div>
        <div className="flex flex-col space-y-2">
          <Link
            href="/"
            className={`text-sm text-white font-bold ${OxaniumFont.className} px-4 py-2 hover:underline`}
          >
            HOME
          </Link>

          <Link
            href="/works"
            className={`text-sm font-bold text-white  ${OxaniumFont.className}  px-4 py-2 hover:underline`}
          >
            OUR WORKS
          </Link>

          <Link
            href="/about"
            className={`text-sm font-bold text-white  ${OxaniumFont.className}  px-4 py-2  hover:underline`}
          >
            ABOUT
          </Link>

          <Link
            href="/blogs"
            className={`text-sm font-bold text-white  ${OxaniumFont.className}  px-4 py-2  hover:underline`}
          >
            BLOGS
          </Link>

{/* 
          <Link
            href="/recon"
            className={`text-sm font-bold text-white  ${OxaniumFont.className}  px-4 py-2  hover:underline`}
          >
            RECON
          </Link> */}

          <Link
            href="/contact"
            className={`text-sm font-bold text-white  ${OxaniumFont.className}  px-4 py-2 hover:underline`}
          >
            CONTACT US
          </Link>
          {/* ... (other links) ... */}
        </div>

      </aside>
    </div>
  );
};

export default Sidebar;
