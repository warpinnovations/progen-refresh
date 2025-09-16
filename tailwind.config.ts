// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ox: ['Oxanium', 'Arial', 'sans-serif'],
        moonlander: ['MBF Moonlander', 'Arial', 'sans-serif'],
      },
      colors: {
        customOrange: '#67574C',
        customGray: '#232323',
        customGrayLogo: '#8E8E8E',
        prOrange: '#96895F'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        // --- ADD THIS LINE ---
        glint: 'glint 1s ease-in-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // --- ADD THIS WHOLE BLOCK ---
        glint: {
          '0%': { transform: 'translateX(-100%) skewX(-20deg)' },
          '100%': { transform: 'translateX(200%) skewX(-20deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;