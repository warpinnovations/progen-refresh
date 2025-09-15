"use client";
import React from "react";

const PrometheusPlayer = () => {
  return (
    // 1. Main container: Centers the component on the page.
    // It takes the full width of its parent but has a max-width to look good on large screens.
    <div className="w-full min-h-[400px] bg-[url('/LandingPageAssets/awardsbg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center py-20">
      <div className="w-full max-w-4xl p-4 rounded-xl overflow-hidden bg-black/60">
        {/* Responsive Aspect Ratio Box with iframe */}
        <div className="relative aspect-video w-full">
          <iframe
            src="https://drive.google.com/file/d/1brGtnb6pnhMCr28Os2VjngRk2N-1q0HX/preview"
            width="100%"
            height="100%"
            allow="autoplay"
            className="rounded-xl w-full h-full absolute top-0 left-0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default PrometheusPlayer;