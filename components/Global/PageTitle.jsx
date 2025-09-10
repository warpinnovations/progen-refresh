"use client"
import React from "react";
import { Oxanium } from "next/font/google";
const OxaniumFont = Oxanium({ weights: 700, subsets: ["latin"] });
function PageTitle({ title, className = "" }) {
    return (
        <div className="flex w-[95%] mt-2 md:mt-6 2xl:-mt-6 justify-center">

            <div className="hidden md:flex relative w-10 h-10 mt-2 md:mt-0 border-4 rounded-full ml-14 border-customOrange md:w-16 md:h-16">
                <div className="absolute inset-1/4 w-1/2 h-1/2 bg-white rounded-full"></div>
            </div>
            <div className={`text-white text-center md:text-start text-2xl ml-2 md:ml-8 ${OxaniumFont.className} font-bold mt-2 md:text-5xl z-10 ${className}`}>
                {title.toUpperCase()}
            </div>
            <div
                className="border-b-2 h-2 flex-grow mt-5 ml-8 border-customOrange hidden sm:flex"
            ></div>
        </div>
    )
}

export default PageTitle;