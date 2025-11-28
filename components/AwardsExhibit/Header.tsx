"use client";
import Image, { StaticImageData } from "next/image";

interface HeaderProps {
  leftLogos?: (string | StaticImageData)[];
}

export default function Header({ leftLogos = [] }: HeaderProps) {
  return (
    <header className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 h-16 sm:h-20 md:h-24 bg-black/35 backdrop-blur-sm">

      {/* Mobile: Split logos left and right */}
      <div className="md:hidden flex items-center justify-between w-full">
        {leftLogos[0] && (
          <div className="relative w-28 h-14 sm:w-32 sm:h-16 shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src={leftLogos[0]}
              alt="Logo 1"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        )}
        {leftLogos[1] && (
          <div className="relative w-28 h-14 sm:w-32 sm:h-16 shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src={leftLogos[1]}
              alt="Logo 2"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* Desktop: Left logos together */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
        {leftLogos.map((logo, idx) => (
          <div
            key={idx}
            className="relative w-40 h-20 lg:w-56 lg:h-28 shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={logo}
              alt={`Logo ${idx + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </header>
  );
}
