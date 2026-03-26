"use client";

import React from 'react';

const CSSStars = () => {
  return (
    <div className="css-stars-container absolute inset-0 overflow-hidden pointer-events-none">
      <div className="stars-layer stars-tiny" />
      <div className="stars-layer stars-small" />
      <div className="stars-layer stars-medium" />
      <div className="stars-layer stars-bright" />
      <div className="stars-layer stars-twinkle" />

      <style jsx>{`
        .css-stars-container {
          background: transparent;
        }
        .stars-layer {
          position: absolute;
          inset: 0;
        }

        /* Tiny dim stars - dense field */
        .stars-tiny {
          background-image:
            radial-gradient(1px 1px at 2% 8%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 7% 23%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 12% 45%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 16% 67%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 21% 12%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 26% 34%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 31% 56%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 36% 78%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 41% 5%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 46% 28%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 51% 50%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 56% 72%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 61% 18%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 66% 40%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 71% 62%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 76% 84%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 81% 15%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 86% 37%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 91% 59%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 96% 81%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 4% 92%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 14% 3%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 24% 88%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 34% 17%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 44% 95%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 54% 7%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 64% 82%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 74% 25%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 84% 70%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 94% 48%, rgba(255,255,255,0.35), transparent);
          animation: star-drift 200s linear infinite;
        }

        /* Small visible stars */
        .stars-small {
          background-image:
            radial-gradient(1px 1px at 5% 15%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 15% 42%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 25% 68%, rgba(255,255,255,0.55), transparent),
            radial-gradient(1px 1px at 35% 8%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 45% 35%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 55% 62%, rgba(255,255,255,0.55), transparent),
            radial-gradient(1px 1px at 65% 88%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 75% 20%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 85% 48%, rgba(255,255,255,0.55), transparent),
            radial-gradient(1px 1px at 95% 75%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 10% 55%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 20% 82%, rgba(255,255,255,0.55), transparent),
            radial-gradient(1px 1px at 30% 28%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 40% 92%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 50% 18%, rgba(255,255,255,0.55), transparent),
            radial-gradient(1px 1px at 60% 45%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 70% 72%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 80% 5%, rgba(255,255,255,0.55), transparent),
            radial-gradient(1px 1px at 90% 32%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 3% 58%, rgba(255,255,255,0.5), transparent);
          animation: star-drift 160s linear infinite reverse;
        }

        /* Medium stars */
        .stars-medium {
          background-image:
            radial-gradient(1.5px 1.5px at 8% 22%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 22% 52%, rgba(255,255,255,0.65), transparent),
            radial-gradient(1.5px 1.5px at 38% 78%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 52% 12%, rgba(255,255,255,0.65), transparent),
            radial-gradient(1.5px 1.5px at 68% 42%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 82% 68%, rgba(255,255,255,0.65), transparent),
            radial-gradient(1.5px 1.5px at 18% 88%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 48% 32%, rgba(255,255,255,0.65), transparent),
            radial-gradient(1.5px 1.5px at 72% 92%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 92% 8%, rgba(255,255,255,0.65), transparent),
            radial-gradient(1.5px 1.5px at 32% 38%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 62% 58%, rgba(255,255,255,0.65), transparent);
          animation: star-drift 240s linear infinite;
        }

        /* Bright accent stars with pink tint (matching original) */
        .stars-bright {
          background-image:
            radial-gradient(2px 2px at 15% 30%, rgba(242,114,200,0.6), transparent),
            radial-gradient(2px 2px at 35% 65%, rgba(242,114,200,0.5), transparent),
            radial-gradient(2px 2px at 55% 15%, rgba(242,114,200,0.55), transparent),
            radial-gradient(2px 2px at 75% 50%, rgba(242,114,200,0.6), transparent),
            radial-gradient(2px 2px at 90% 80%, rgba(242,114,200,0.5), transparent),
            radial-gradient(2px 2px at 45% 90%, rgba(242,114,200,0.55), transparent),
            radial-gradient(2px 2px at 25% 5%, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 65% 35%, rgba(255,255,255,0.75), transparent),
            radial-gradient(2px 2px at 85% 20%, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 10% 75%, rgba(255,255,255,0.75), transparent);
          animation: star-drift 300s linear infinite reverse;
        }

        /* Twinkling layer - subtle opacity animation for sparkle effect */
        .stars-twinkle {
          background-image:
            radial-gradient(1.5px 1.5px at 12% 20%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1.5px 1.5px at 28% 55%, rgba(255,255,255,0.85), transparent),
            radial-gradient(1.5px 1.5px at 42% 80%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1.5px 1.5px at 58% 25%, rgba(255,255,255,0.85), transparent),
            radial-gradient(1.5px 1.5px at 72% 60%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1.5px 1.5px at 88% 40%, rgba(255,255,255,0.85), transparent),
            radial-gradient(2px 2px at 20% 70%, rgba(255,255,255,0.95), transparent),
            radial-gradient(2px 2px at 50% 10%, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 80% 85%, rgba(255,255,255,0.95), transparent);
          animation: twinkle 4s ease-in-out infinite alternate;
        }

        @keyframes star-drift {
          from { transform: translateY(0) translateX(0); }
          to { transform: translateY(-3%) translateX(2%); }
        }

        @keyframes twinkle {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default CSSStars;
