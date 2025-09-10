"use client";
import React from "react";
import ReactPlayer from "react-player/lazy"; // Using the lazy load import for better performance

const PrometheusPlayer = () => {
  return (
    // 1. Main container: Centers the component on the page.
    // It takes the full width of its parent but has a max-width to look good on large screens.
    <div className="w-full min-h-[400px] bg-[url('/LandingPageAssets/awardsbg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center py-20">
      <div className="w-full max-w-4xl p-4 rounded-xl overflow-hidden bg-black/60">
        {/* 2. Aspect Ratio Box: This wrapper maintains a 16:9 aspect ratio. */}
        {/* The `pt-[56.25%]` is the key: padding-top is calculated relative to the width. (9 / 16 = 0.5625) */}
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            // 3. The player is positioned absolutely to fill the aspect ratio box.
            className="absolute top-0 left-0"
            url={
              "https://www.facebook.com/watch/?v=208857277659564&paipv=0&eav=AfZnkXw8Agx0_8SofVSoaVrc6iLN64-s3su8ZL3G7KX70DYIXT4HnIHtHRzSxNQNs8A&ref=embed_video&_rdr"
            }
            playing={true} // Autoplay might be blocked by browsers, consider setting to false initially
            controls
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default PrometheusPlayer;