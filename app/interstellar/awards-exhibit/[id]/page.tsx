/* eslint-disable react/no-unescaped-entities */
"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { awarditems } from "@/components/AwardsExhibit/AwardItems";
import { motion } from "framer-motion";
import Header from "@/components/AwardsExhibit/Header";
import MediaCarousel, { MediaItem } from "@/components/AwardsExhibit/MediaCarousel";

export default function AwardPage() {
  const { id } = useParams();
  const award = awarditems.find((a) => a.id === id);

  if (!award)
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#050505]">
        <div className="text-white text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2 font-heading">
            Award not found
          </h1>
          <p className="text-gray-400 font-body">
            The award you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );

  // Build media array: photos
  const media: MediaItem[] = [
    ...award.media.photos.map((p) => ({ type: "image" as const, src: p })),
  ];

  // Parent container variants to stagger children slowly
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }, // slower stagger
    },
  };

  // Common child animation
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // slower, smoother
  };

  return (
    <div className="min-h-screen font-body text-white relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-20 w-full h-full bg-[#050505] select-none pointer-events-none">
        <Image
          src="/AwardsExhibitAssets/BackgroundAssets/awards-background.png"
          alt="Background"
          fill
          className="object-cover select-none"
          style={{ objectPosition: "center bottom" }}
          priority
          draggable={false}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-black/30 pointer-events-none" />
      </div>

      {/* HEADER */}
      <Header
        leftLogos={[
          "/AwardsExhibitAssets/LogoAssets/PR logo_White.png",
          "/AwardsExhibitAssets/LogoAssets/Interstellar Logo.png",
        ]}
      />

      {/* ALL ANIMATED CONTENT */}
      <motion.div
        className="relative z-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* TITLE + CATEGORY */}
        <motion.div
          variants={childVariants}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 translate-x-4"
        >
          <div className="flex flex-row items-center justify-center gap-6 sm:gap-8">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#c8a45d]/30 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-t from-[#c8a45d]/20 to-transparent rounded-full blur-xl pointer-events-none" />

              <div className="relative w-full h-full">
                <Image
                  src={award.media.mainImage}
                  alt={award.title}
                  fill
                  className="object-contain select-none pointer-events-none"
                  unoptimized
                  draggable={false}
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-2 leading-tight tracking-wide">
                {award.title}
              </h1>
              <p className="font-body text-[#c8a45d] italic text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide">
                {award.category}
              </p>
            </div>
          </div>
        </motion.div>

        {/* MEDIA CAROUSEL */}
        <motion.section
          variants={childVariants}
          className="py-8 sm:py-12 md:py-16 lg:py-20 -mt-10"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <MediaCarousel media={media} />
          </div>
        </motion.section>

        {/* DESCRIPTION + CAMPAIGN */}
        <motion.section
          variants={childVariants}
          className="max-w-4xl mx-auto pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          {/* Award Description */}
          <div className="mb-10 sm:mb-14 md:mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors duration-300">
              <p  className="
                    font-body text-gray-300
                    leading-relaxed sm:leading-loose
                    text-sm sm:text-base md:text-lg
                    text-justify tracking-[0.015em]
                    ">
                {award.description}
              </p>
            </div>
          </div>

          {/* Campaign Section */}
          <div>
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-1 h-8 sm:h-10 md:h-12 bg-gradient-to-t from-[#c8a45d] to-[#9d7d3a] rounded-full mr-4"></div>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide">
                THE AWARD GIVING BODY
              </h2>
            </div>

            <p className="
                    font-body text-gray-300
                    leading-relaxed sm:leading-loose
                    text-sm sm:text-base md:text-lg
                    text-justify tracking-[0.015em]
                    px-4">
              {award.award_body}
            </p>

            <div className="flex items-center mb-4 mt-6 sm:mt-6">
              <div className="w-1 h-8 sm:h-10 md:h-12 bg-gradient-to-t from-[#c8a45d] to-[#9d7d3a] rounded-full mr-4"></div>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide">
                ABOUT THE CAMPAIGN
              </h2>
            </div>

            <p className="
                font-body text-gray-300
                leading-relaxed sm:leading-loose
                text-sm sm:text-base md:text-lg
                text-justify tracking-[0.015em]
                px-4">
              {award.campaign}
            </p>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}