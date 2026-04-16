"use client";
import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { workData } from "@/app/contants";
import ReactPlayer from "react-player";
import { Carousel } from "react-responsive-carousel";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AiFillPlayCircle } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Global/Footer";
import Navbar from "../Global/Navbar";
import { motion } from "framer-motion";

const SubSectionPage = () => {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getIndex = searchParams?.get("index") as string;
  const work = workData[Number(getIndex)] as any;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-black min-h-screen">
        {!isModalOpen && <Navbar />}

        {/* ── Hero ── */}
        <div className="relative w-full h-[60vh] sm:h-[75vh] md:h-screen overflow-hidden">

          {/* Background: always use static key visual */}
          <Image
            src={work.img}
            alt={work.title}
            fill
            className="object-cover object-center"
            priority
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 pointer-events-none" />

          {/* Back button */}
          <div className="absolute top-20 sm:top-24 md:top-32 left-8 md:left-16 z-20">
            <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-prOrange transition-colors duration-300 group">
              <HiOutlineArrowNarrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-ox text-xs tracking-[0.3em] uppercase">Back</span>
            </Link>
          </div>

          {/* Play / Gallery trigger */}
          {(work.videoLink || work.images) && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button onClick={openModal} className="flex flex-col items-center gap-3 group">
                <AiFillPlayCircle className="w-20 h-20 text-white/80 group-hover:text-prOrange transition-colors duration-300 drop-shadow-lg" />
                <span className="font-ox text-[10px] tracking-[0.3em] uppercase text-white/50 group-hover:text-prOrange transition-colors duration-300">
                  {work.videoLink ? "Watch Video" : "View Gallery"}
                </span>
              </button>
            </div>
          )}

          {/* Hero title – bottom left */}
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-14 z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="w-12 h-0.5 bg-prOrange mb-5" />
              <h1 className="font-ox text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-black uppercase leading-tight max-w-3xl">
                {work.headline || work.title}
              </h1>
              {work.subheadline && (
                <p className="font-ox text-sm md:text-base text-white/60 mt-4 max-w-2xl leading-relaxed">
                  {work.subheadline}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="bg-black px-8 md:px-16 lg:px-28 py-20">
          <div className="max-w-4xl">

            {/* Tagline */}
            {work.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-prOrange font-ox text-base md:text-lg tracking-wide leading-relaxed mb-10"
              >
                {work.description}
              </motion.p>
            )}

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-prOrange/50 via-prOrange/20 to-transparent mb-10" />

            {/* Body copy */}
            {work.body && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-white/75 text-base md:text-lg leading-loose font-ox whitespace-pre-line"
              >
                {work.body}
              </motion.p>
            )}

            {/* Awards Won */}
            {work.awards?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-16"
              >
                <div className="w-full h-px bg-gradient-to-r from-prOrange/50 via-prOrange/20 to-transparent mb-10" />
                <p className="font-ox text-[10px] tracking-[0.35em] uppercase text-prOrange mb-6">
                  Awards Won
                </p>
                <div className="flex flex-col gap-4">
                  {work.awards.map((award: string, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-prOrange shrink-0" />
                      <span className="text-white/65 font-ox text-sm tracking-wide">
                        {award}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* ── Modal ── */}
        {isModalOpen && (
          <>
            {/* Backdrop – click anywhere outside video to close */}
            <div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Close button – fixed to viewport, always above iframe */}
            <button
              className="fixed top-6 right-6 z-[60] text-white/70 hover:text-prOrange transition-colors duration-300"
              onClick={closeModal}
            >
              <IoMdCloseCircleOutline className="w-9 h-9" />
            </button>

            {/* Video / Gallery content */}
            <div
              className="fixed inset-0 z-[55] flex justify-center items-center px-4 pointer-events-none"
            >
              <div
                className="relative w-full max-w-5xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {work.videoLink ? (
                  <div className="aspect-video w-full">
                    {work.videoLink.includes("drive.google.com") ? (
                      <iframe
                        src={work.videoLink}
                        className="w-full h-full"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    ) : (
                      <ReactPlayer
                        controls
                        playing
                        url={work.videoLink}
                        width="100%"
                        height="100%"
                      />
                    )}
                  </div>
                ) : work.images ? (
                  <Carousel>
                    {work.images.map((image: string, i: number) => (
                      <div key={i}>
                        <Image src={image} alt={`${work.title} ${i + 1}`} width={1920} height={1080} className="w-full" />
                      </div>
                    ))}
                  </Carousel>
                ) : null}
              </div>
            </div>
          </>
        )}

        <div className="pt-16">
          <Footer />
        </div>
      </div>
    </Suspense>
  );
};

export default SubSectionPage;
