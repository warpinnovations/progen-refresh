"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./WorksCarousel.css";

// A helper function to make sure an array is long enough for the loop to work
const createLoopableData = (data) => {
    if (data.length === 0) return [];
    // If there are too few slides, duplicate them until there are at least 6
    let loopableData = [...data];
    while (loopableData.length < 6) {
        loopableData = [...loopableData, ...data];
    }
    return loopableData;
};

const WorksCarousel = ({ worksData }) => {
    // 1. Split the data as intended
    const topRowCount = 4;
    const topRowData = worksData.slice(0, topRowCount);
    const bottomRowData = worksData.slice(topRowCount);

    // 2. Create "stable" versions of the data arrays that are guaranteed to loop
    const stableTopRowData = createLoopableData(topRowData);
    const stableBottomRowData = createLoopableData(bottomRowData);

    // 3. Define the settings for both carousels
    const swiperSettings = {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true, // This will now work reliably
        slidesPerView: "auto",
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            clickable: true,
        },
        modules: [EffectCoverflow, Autoplay, Pagination],
    };

    return (
        <div className="works-carousel-container">
            {/* --- TOP CAROUSEL --- */}
            <Swiper {...swiperSettings} className="mySwiper-top mb-8">
                {stableTopRowData.map((work, index) => {
                    // This math ensures the link always points to the correct original item
                    const originalIndex = index % topRowData.length;
                    return (
                        <SwiperSlide key={`top-${index}`}>
                            <Link href={`/works/subpage?index=${originalIndex}`}>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in z-10"></div>
                                    <div className="absolute inset-0 bg-black opacity-20"></div>
                                    <img src={work.img} alt={work.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center text-center px-5 z-20">
                                        <p className="text-white font-ox font-black text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in">
                                            {work.title.toLocaleUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* --- BOTTOM CAROUSEL --- */}
            {stableBottomRowData.length > 0 && (
                <Swiper {...swiperSettings} className="mySwiper-bottom">
                    {stableBottomRowData.map((work, index) => {
                        // This math ensures the link always points to the correct original item
                        const originalIndex = (index % bottomRowData.length) + topRowCount;
                        return (
                            <SwiperSlide key={`bottom-${index}`}>
                                <div className="relative group">
                                    <Link href={`/works/subpage?index=${originalIndex}`}>
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in z-10"></div>
                                        <div className="absolute inset-0 bg-black opacity-20"></div>
                                        <img src={work.img} alt={work.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center text-center px-5 z-20">
                                            <p className="text-white font-ox font-black text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in">
                                                {work.title.toLocaleUpperCase()}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
};

export default WorksCarousel;