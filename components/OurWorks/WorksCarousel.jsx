"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./WorksCarousel.css";

// This helper function is crucial for making the loops work perfectly.
const createLoopableData = (data) => {
    if (data.length === 0) return [];
    // Ensure each row has at least 6 slides for a stable loop.
    let loopableData = [...data];
    while (loopableData.length < 6) {
        loopableData = [...loopableData, ...data];
    }
    return loopableData;
};

const WorksCarousel = ({ worksData }) => {
    // 1. Cleanly split the data for the three rows.
    const firstRowData = worksData.slice(0, 4);
    const secondRowData = worksData.slice(4, 8); // Will take the rest, up to 4 items.
    const thirdRowData = firstRowData; // As requested, reuse the first row's data.

    // 2. Create "stable" versions of the data that are guaranteed to loop.
    const stableFirstRow = createLoopableData(firstRowData);
    const stableSecondRow = createLoopableData(secondRowData);
    const stableThirdRow = createLoopableData(thirdRowData);

    // 3. Define the settings once to use for all three carousels.
    const swiperSettings = {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
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
            {/* --- FIRST ROW CAROUSEL --- */}
            <Swiper {...swiperSettings} className="mySwiper-top mb-8">
                {stableFirstRow.map((work, index) => {
                    const originalIndex = index % firstRowData.length;
                    return (
                        <SwiperSlide key={`row1-${index}`}>
                            <Link href={`/works/subpage?index=${originalIndex}`}>
                                <div className="relative group w-full h-full">
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

            {/* --- SECOND ROW CAROUSEL --- */}
            {stableSecondRow.length > 0 && (
                <Swiper {...swiperSettings} className="mySwiper-middle mb-8">
                    {stableSecondRow.map((work, index) => {
                        const originalIndex = (index % secondRowData.length) + 4;
                        return (
                            <SwiperSlide key={`row2-${index}`}>
                                <Link href={`/works/subpage?index=${originalIndex}`}>
                                    <div className="relative group w-full h-full">
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
            )}

            {/* --- THIRD ROW CAROUSEL (using first row's data) --- */}
            <Swiper {...swiperSettings} className="mySwiper-bottom">
                {stableThirdRow.map((work, index) => {
                    const originalIndex = index % thirdRowData.length;
                    return (
                        <SwiperSlide key={`row3-${index}`}>
                            <Link href={`/works/subpage?index=${originalIndex}`}>
                                <div className="relative group w-full h-full">
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
        </div>
    );
};

export default WorksCarousel;