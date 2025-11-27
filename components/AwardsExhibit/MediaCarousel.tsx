"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

interface MediaCarouselProps {
  media: MediaItem[];
}

export default function MediaCarousel({ media }: MediaCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgRef = useRef<HTMLDivElement | null>(null);

  const hasMultiple = media.length > 1;
  const peek = 80;

    useEffect(() => {
    media.forEach((item) => {
      if (item.type === "image") {
        const preload = new window.Image();
        preload.src = item.src;
      }
    });
  }, [media]);


  const handleNext = () => setCurrent((prev) => (prev + 1) % media.length);
  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + media.length) % media.length);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (media.length === 0) return null;

  return (
    <div className="relative w-full flex justify-center items-center py-8">

      {/* Hidden preloader using Next/Image */}
      <div className="hidden">
        {media
          .filter((item) => item.type === "image")
          .map((item) => (
            <Image
              key={item.src}
              src={item.src}
              alt="preload"
              width={10}
              height={10}
              priority
            />
          ))}
      </div>

      {/* Carousel */}
      <div className="relative w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex justify-center items-center overflow-hidden">
        {media.map((item, index) => {
          // Position calculation
          let position: number;
          if (media.length === 2) {
            position = (index - current + 2) % 2;
            if (position === 0) position = 0;
            else if (position === 1) position = -1;
          } else {
            position = index - current;
            if (position < -1) position += media.length;
            if (position > 1) position -= media.length;
          }

          if (Math.abs(position) > 1) return null;

          const isMain = position === 0;
          const translateX = position * peek;

          return (
            <div
              key={item.src}
              className="absolute top-0 h-full transition-all duration-500 rounded-xl overflow-hidden shadow-2xl cursor-pointer"
              style={{
                width: isMain ? "100%" : "70%",
                transform: `translateX(${translateX}px) scale(${isMain ? 1 : 0.85})`,
                zIndex: isMain ? 10 : 5,
              }}
              onClick={isMain ? handleOpenModal : undefined}
            >
              {/* IMAGE */}
              {item.type === "image" && (
                <Image
                  src={item.src}
                  alt={item.alt || "Media"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}

              {/* VIDEO thumbnail */}
              {item.type === "video" && (
                <div className="w-full h-full relative">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover pointer-events-none"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-black"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6 4l6 4-6 4V4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0" />
                </div>
              )}

              {!isMain && (
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-black/40 p-4 rounded-full hover:bg-black/60 z-20"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-black/40 p-4 rounded-full hover:bg-black/60 z-20"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 bg-black/80"
          onClick={handleCloseModal}
        >
          {/* IMAGE MODAL */}
          {media[current].type === "image" && (
            <div
              ref={imgRef}
              className="relative flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition z-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>

              <Image
                src={media[current].src}
                alt={media[current].alt || "Media"}
                width={1200}
                height={800}
                className="object-contain max-h-[90vh] max-w-[90vw]"
                unoptimized
              />
            </div>
          )}

          {/* VIDEO MODAL */}
          {media[current].type === "video" && (
            <div
              className="relative flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 left-3 z-50 text-white bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>

              <div className="relative w-[85vw] max-h-[70vh] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] max-w-4xl rounded-lg shadow-xl">
                <video
                  src={media[current].src}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[70vh] rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
