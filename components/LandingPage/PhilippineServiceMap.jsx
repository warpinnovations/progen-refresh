"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import { Rajdhani } from "next/font/google";
import Link from "next/link";

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const RajdhaniFont = Rajdhani({ weight: '600', subsets: ['latin'] });

// Coordinate system: viewBox "0 0 400 620"
// x = (lon - 116.5) * 39.2
// y = (21.1 - lat) * 36.1

const SERVICE_CITIES = [
  { name: "Metro Manila",    x: 172, y: 238, r: 5,   tier: "major", delay: 0   },
  { name: "Iloilo City",    x: 224, y: 374, r: 5.5, tier: "home",  delay: 0.4 },
  { name: "Cebu City",      x: 288, y: 385, r: 4.5, tier: "major", delay: 0.8 },
  { name: "Davao City",     x: 348, y: 500, r: 4.5, tier: "major", delay: 1.2 },
  { name: "Cagayan de Oro", x: 308, y: 455, r: 3.5, tier: "area",  delay: 1.6 },
  { name: "Bacolod",        x: 250, y: 390, r: 3.5, tier: "area",  delay: 2.0 },
];

const COLORS = { home: "#D4AF37", major: "#B8A76F", area: "#96895F" };

const PhilippineServiceMap = () => {
  const [active, setActive] = useState(null);

  return (
    <motion.div
      className="relative flex flex-col items-center w-full"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 65% 75% at 50% 45%, rgba(150,137,95,0.15) 0%, transparent 70%)"
      }} />

      {/* Header */}
      <div className="text-center mb-4 relative z-10">
        <p className={`${RajdhaniFont.className} text-[11px] uppercase tracking-[0.28em] mb-1`}
           style={{ color: "rgba(150,137,95,0.6)" }}>Nationwide Coverage</p>
        <p className={`${MoonlanderFont.className} text-2xl md:text-3xl lg:text-4xl`}
           style={{ color: "#C8A84B", textShadow: "0 0 40px rgba(212,175,55,0.35)" }}>
          3 Island Groups
        </p>
      </div>

      <svg
        viewBox="0 0 400 560"
        className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] relative z-10"
        style={{ filter: "drop-shadow(0 0 24px rgba(150,137,95,0.22))" }}
      >
        <style>{`
          @keyframes mapPulse {
            0%   { transform: scale(1); opacity: 0.65; }
            100% { transform: scale(4); opacity: 0; }
          }
          .map-pulse {
            transform-box: fill-box;
            transform-origin: center;
            animation: mapPulse 2.2s ease-out infinite;
          }
        `}</style>
        <defs>
          <radialGradient id="mapBg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(150,137,95,0.07)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="310" rx="185" ry="295" fill="url(#mapBg2)" />

        {/* ══════════════════════════════════════════
            LUZON — clockwise from N tip
            N tip  18.8N 121.3E → 188,83
            NE     18.4N 122.1E → 220,97  17.8N 122.5E → 235,118
            E coast 17.0N 122.2E → 224,148  16.5N 122.0E → 216,166
            Aurora  15.7N 121.7E → 204,191
            Quezon  14.8N 121.6E → 200,224  14.4N 121.8E → 208,238
            Bondoc  13.8N 122.1E → 220,263  13.6N 122.4E → 231,270  back 14.0N 122.0E → 216,256
            S Batangas 13.7N 121.0E → 176,267  13.8N 120.8E → 169,263
            Manila Bay W 14.5N 120.9E → 172,234
            Bataan  14.8N 120.2E → 145,227  15.0N 120.4E → 153,219
            Zambales 15.5N 120.0E → 137,201  15.8N 120.0E → 137,191
            Lingayen 16.1N 120.0E → 137,180  16.4N 120.3E → 149,169
            Ilocos   17.0N 120.4E → 153,148  17.8N 120.4E → 153,119
            NW coast 18.4N 120.5E → 157,97   back to N tip
        ══════════════════════════════════════════ */}
        <path
          d="
            M 188,83
            C 196,83 210,88 220,97
            C 228,108 233,115 235,118
            L 228,135
            C 224,141 222,148 224,148
            L 220,158
            C 218,163 216,165 216,166
            C 212,175 208,183 204,191
            C 202,198 200,210 200,224
            C 200,231 204,235 208,238
            C 212,244 216,250 218,254
            C 216,256 216,256 216,256
            L 220,263
            C 224,267 228,270 231,270
            C 228,272 224,271 220,268
            L 216,261
            C 210,255 204,249 198,247
            C 191,244 182,242 176,242
            C 178,249 178,257 176,263
            C 172,267 167,266 165,263
            C 164,260 163,256 163,252
            C 164,247 166,242 168,238
            L 172,234
            C 168,231 160,228 153,227
            L 145,227
            C 141,224 139,220 140,216
            L 153,219
            C 149,216 144,212 137,205
            L 137,201
            C 135,195 134,193 133,191
            L 137,180
            C 137,177 141,171 145,170
            L 149,169
            C 151,164 152,157 153,148
            L 153,130
            C 152,126 152,122 153,119
            L 155,109
            C 156,103 157,98 157,97
            C 161,90 172,85 188,83 Z
          "
          fill="rgba(150,137,95,0.18)"
          stroke="rgba(150,137,95,0.65)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* ── BICOL PENINSULA — branches SE from ~14.2N,122.0E ── */}
        <path
          d="
            M 216,254
            C 226,250 240,256 250,264
            C 259,272 268,282 276,292
            L 285,305
            C 290,313 294,318 295,322
            C 291,326 285,325 280,319
            L 271,306
            C 263,296 254,285 244,276
            C 237,270 228,262 216,254 Z
          "
          fill="rgba(150,137,95,0.16)"
          stroke="rgba(150,137,95,0.62)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* LUZON label */}
        <text x="183" y="155" textAnchor="middle" fill="rgba(150,137,95,0.5)"
              fontSize="8" letterSpacing="2.5" fontWeight="700" fontFamily="sans-serif">LUZON</text>

        {/* ── MINDORO — 12.2–13.5N, 120.6–121.5E ── */}
        <path
          d="
            M 161,278
            C 170,272 184,275 190,284
            C 195,293 196,308 193,318
            C 190,325 183,327 177,322
            C 170,316 163,304 161,292
            C 160,286 160,280 161,278 Z
          "
          fill="rgba(150,137,95,0.12)"
          stroke="rgba(150,137,95,0.44)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* ── MASBATE ~12.1N, 123.6E ── */}
        <path
          d="M 269,314 C 280,309 296,312 298,318 C 300,325 288,332 276,332 C 265,332 260,324 263,318 Z"
          fill="rgba(150,137,95,0.11)"
          stroke="rgba(150,137,95,0.40)"
          strokeWidth="0.9"
        />

        {/* ── SIBUYAN 12.4N,122.5E ── */}
        <ellipse cx="237" cy="313" rx="11" ry="8"
          fill="rgba(150,137,95,0.10)" stroke="rgba(150,137,95,0.36)" strokeWidth="0.8" />

        {/* ── ROMBLON / TABLAS ~12.5N,122.1E ── */}
        <ellipse cx="220" cy="306" rx="7" ry="5"
          fill="rgba(150,137,95,0.10)" stroke="rgba(150,137,95,0.34)" strokeWidth="0.7" />

        {/* ── PALAWAN — NE tip 12.0N,119.9E → 131,329; runs SW to ~8.4N,117.6E ── */}
        <path
          d="
            M 131,329
            C 126,338 120,347 116,360
            C 110,376 102,392 94,407
            C 83,425 70,438 57,451
            C 48,460 41,466 39,462
            C 42,456 50,450 57,446
            C 68,437 80,426 91,412
            C 102,396 110,378 116,362
            C 120,349 124,340 127,334
            C 129,331 131,328 131,329 Z
          "
          fill="rgba(150,137,95,0.12)"
          stroke="rgba(150,137,95,0.44)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* ══════════════════════════════════════════
            PANAY — home island of Iloilo — more triangular
            NW  11.7N,121.9E → 212,339
            NE  11.2N,122.7E → 243,357
            E (Iloilo coast) 10.7N,122.5E → 235,375
            SE  10.6N,122.1E → 220,379
            S   10.6N,121.8E → 208,379
            SW  10.8N,121.7E → 204,372
            W   11.1N,121.7E → 204,361
        ══════════════════════════════════════════ */}
        <path
          d="
            M 212,339
            C 222,336 235,341 243,350
            C 246,357 244,366 241,371
            C 238,376 235,378 230,380
            C 224,381 217,380 212,378
            C 207,376 204,372 203,367
            C 202,361 203,353 207,346
            C 209,342 211,340 212,339 Z
          "
          fill="rgba(212,175,55,0.14)"
          stroke="rgba(212,175,55,0.55)"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* ══════════════════════════════════════════
            NEGROS — elongated NW-SE teardrop
            N  10.7N,123.0E → 255,374
            SE  9.1N,122.6E → 239,432
            SW  9.3N,122.4E → 231,425
            NW  10.4N,122.7E → 243,396
        ══════════════════════════════════════════ */}
        <path
          d="
            M 255,374
            C 263,374 270,378 272,386
            C 274,395 270,408 264,419
            C 258,430 249,437 242,439
            C 235,441 230,434 232,421
            C 234,411 240,406 244,403
            C 248,400 251,396 253,390
            C 254,384 254,378 255,374 Z
          "
          fill="rgba(150,137,95,0.16)"
          stroke="rgba(150,137,95,0.54)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* ══════════════════════════════════════════
            CEBU — very elongated narrow island N-S
            N  11.3N,124.0E → 294,357
            S tip  9.6N,123.6E → 278,418
        ══════════════════════════════════════════ */}
        <path
          d="
            M 293,358
            C 300,358 304,364 303,373
            C 302,383 298,396 294,406
            C 291,414 287,418 282,418
            C 276,418 273,413 273,405
            C 273,396 277,386 280,379
            C 282,372 285,365 289,361
            C 291,358 292,357 293,358 Z
          "
          fill="rgba(150,137,95,0.16)"
          stroke="rgba(150,137,95,0.54)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* ── BOHOL — 9.7–10.2N, 123.7–124.5E ── */}
        <path
          d="
            M 295,395
            L 317,394
            C 320,399 320,407 317,412
            L 295,416
            C 284,413 281,408 284,401
            C 287,397 291,395 295,395 Z
          "
          fill="rgba(150,137,95,0.12)"
          stroke="rgba(150,137,95,0.44)"
          strokeWidth="1"
        />

        {/* ══════════════════════════════════════════
            SAMAR — N 12.5N,125.0E → 333,310; boxy eastern Visayas island
        ══════════════════════════════════════════ */}
        <path
          d="
            M 333,310
            C 342,312 351,318 352,324
            C 353,334 350,344 348,351
            C 346,357 341,362 335,364
            C 329,366 322,363 317,358
            L 314,349
            C 317,341 321,333 323,327
            C 326,319 330,314 333,310 Z
          "
          fill="rgba(150,137,95,0.13)"
          stroke="rgba(150,137,95,0.46)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* ══════════════════════════════════════════
            LEYTE — elongated teardrop
            N 11.3N,124.6E → 317,354  S tip 9.8N,124.9E → 329,408
        ══════════════════════════════════════════ */}
        <path
          d="
            M 317,354
            C 327,354 334,358 334,367
            C 334,376 333,384 332,390
            C 330,397 329,405 328,410
            C 323,414 317,412 315,407
            L 309,391
            C 309,383 309,375 311,368
            C 313,361 315,357 317,354 Z
          "
          fill="rgba(150,137,95,0.13)"
          stroke="rgba(150,137,95,0.46)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* ── DINAGAT — 10.1N,125.6E ── */}
        <ellipse cx="357" cy="396" rx="7" ry="13"
          fill="rgba(150,137,95,0.10)" stroke="rgba(150,137,95,0.36)" strokeWidth="0.8" />

        {/* ── CAMIGUIN — 9.2N,124.7E ── */}
        <ellipse cx="322" cy="432" rx="8" ry="6"
          fill="rgba(150,137,95,0.10)" stroke="rgba(150,137,95,0.36)" strokeWidth="0.8" />

        {/* VISAYAS label */}
        <text x="268" y="350" textAnchor="middle" fill="rgba(150,137,95,0.5)"
              fontSize="8" letterSpacing="2.5" fontWeight="700" fontFamily="sans-serif">VISAYAS</text>

        {/* ══════════════════════════════════════════
            MINDANAO — with Zamboanga Peninsula
            NW body  8.5N,123.0E → 255,451
            N coast  8.9N,124.2E → 302,436  9.5N,125.0E → 333,418  NE 9.8N,125.5E → 353,407
            E coast  8.5N,126.0E → 373,451  8.0N,126.5E → 393,469  7.5N,126.4E → 389,487
            SE       6.5N,126.0E → 374,524  6.3N,125.6E → 358,531
            S        6.0N,124.5E → 314,541  6.0N,124.0E → 294,541
            SW       6.3N,123.4E → 271,531  6.8N,122.8E → 248,513
            Illana Bay  7.1N,124.0E → 294,503  W coast 7.5N,123.0E → 255,489
            — Zamboanga Peninsula juts WSW —
            Base NW  8.2N,123.2E → 263,459  peninsula narrows to Zamboanga tip 6.9N,122.1E → 220,511
            peninsula E side: 7.5N,122.5E → 235,488  8.0N,123.0E → 255,469
        ══════════════════════════════════════════ */}
        <path
          d="
            M 255,451
            C 275,443 294,437 302,436
            C 316,430 331,420 333,418
            C 342,410 350,407 353,407
            C 361,422 370,443 376,463
            C 381,479 385,488 389,487
            C 385,499 376,514 368,524
            C 362,531 358,531 358,531
            C 349,538 334,542 314,541
            C 298,540 280,535 264,527
            C 255,522 248,517 248,513
            C 248,513 265,510 271,507
            C 274,505 278,503 280,501
            C 281,498 278,494 273,491
            C 265,487 255,483 248,477
            L 246,471
            C 248,463 252,455 255,451 Z
          "
          fill="rgba(150,137,95,0.18)"
          stroke="rgba(150,137,95,0.60)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Zamboanga peninsula */}
        <path
          d="
            M 255,462
            C 248,466 240,472 232,480
            C 224,488 219,499 218,509
            C 216,513 215,516 215,518
            C 218,520 223,519 228,516
            C 235,511 241,504 246,497
            C 250,491 253,484 255,477
            C 257,470 256,464 255,462 Z
          "
          fill="rgba(150,137,95,0.16)"
          stroke="rgba(150,137,95,0.54)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* ── BASILAN — S of Zamboanga 6.7N,122.0E ── */}
        <ellipse cx="216" cy="524" rx="14" ry="8"
          fill="rgba(150,137,95,0.10)" stroke="rgba(150,137,95,0.36)" strokeWidth="0.8" />

        {/* MINDANAO label */}
        <text x="310" y="492" textAnchor="middle" fill="rgba(150,137,95,0.5)"
              fontSize="8" letterSpacing="2.5" fontWeight="700" fontFamily="sans-serif">MINDANAO</text>

        {/* ── SERVICE AREA DOTS ── */}
        {SERVICE_CITIES.map((city) => {
          const color = COLORS[city.tier];
          const isActive = active?.name === city.name;
          const flipLeft = city.x > 300;
          const tipW = city.name.length * 6 + 12;
          const tipX = flipLeft ? city.x - city.r - 4 - tipW : city.x + city.r + 4;
          return (
            <g
              key={city.name}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActive(city)}
              onMouseLeave={() => setActive(null)}
            >
              <circle cx={city.x} cy={city.y} r={city.r} fill="none"
                stroke={color} strokeWidth="1.2" className="map-pulse"
                style={{ animationDelay: `${city.delay}s` }} />
              <circle cx={city.x} cy={city.y} r={city.r} fill="none"
                stroke={color} strokeWidth="0.8" className="map-pulse"
                style={{ animationDelay: `${city.delay + 1.1}s` }} />
              <circle cx={city.x} cy={city.y} r={city.r + 3}
                fill={color} opacity={isActive ? "0.28" : "0.14"} />
              <circle cx={city.x} cy={city.y}
                r={isActive ? city.r + 1 : city.r} fill={color} />
              <circle
                cx={city.x - city.r * 0.28} cy={city.y - city.r * 0.28}
                r={city.r * 0.32} fill="rgba(255,255,255,0.32)" />
              {isActive && (
                <g>
                  <rect x={tipX} y={city.y - 10}
                    width={tipW} height={18} rx="3"
                    fill="rgba(0,0,0,0.9)" stroke={color} strokeWidth="0.6" />
                  <text x={tipX + 6} y={city.y + 3}
                    fill={color} fontSize="8.5" fontFamily="sans-serif" letterSpacing="0.5">
                    {city.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

      </svg>

      {/* ── LEGEND ── */}
      <div className="relative z-10 mt-5 flex flex-row items-center justify-center gap-5 sm:gap-7">
        {[
          { color: "#D4AF37", size: 10, label: "Home Base · Iloilo City" },
          { color: "#B8A76F", size: 9,  label: "Key Service Cities" },
          { color: "#96895F", size: 7,  label: "Service Areas" },
        ].map(({ color, size, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="rounded-full flex-shrink-0"
              style={{ width: size, height: size, background: color,
                boxShadow: `0 0 8px 2px ${color}55` }} />
            <span className={`${RajdhaniFont.className} text-[11px] sm:text-xs uppercase tracking-[0.14em]`}
              style={{ color: "rgba(180,160,100,0.80)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── CTA BUTTONS ── */}
      <div className="relative z-10 mt-6 flex flex-row gap-3 w-full max-w-sm">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
          <Link href="/contact"
            className={`${RajdhaniFont.className} group relative inline-flex items-center justify-center w-full overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300`}
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.25) 0%, rgba(150,137,95,0.15) 100%)",
              border: "1.5px solid rgba(212,175,55,0.6)",
              color: "#D4AF37",
              boxShadow: "0 0 22px -6px rgba(212,175,55,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative flex items-center gap-2">
              Contact Us
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
          <Link href="/works"
            className={`${RajdhaniFont.className} group relative inline-flex items-center justify-center w-full overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300`}
            style={{
              background: "transparent",
              border: "1.5px solid rgba(150,137,95,0.45)",
              color: "rgba(200,168,75,0.9)",
            }}
          >
            <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
              style={{ background: "rgba(150,137,95,0.14)" }} />
            <span className="relative flex items-center gap-2">
              Our Works
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PhilippineServiceMap;
