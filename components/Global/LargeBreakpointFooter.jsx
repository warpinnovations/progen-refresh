"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTiktok, FaLinkedinIn, FaBehance } from 'react-icons/fa';
import { motion } from "framer-motion";
import localFont from "next/font/local";
import { Oxanium, Rajdhani } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });
const RajdhaniFont = Rajdhani({ weight: "600", subsets: ["latin"] });

const SocialLink = ({ href, icon: Icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10 group mr-2 last:mr-0"
    style={{ borderColor: "rgba(150,137,95,0.35)", background: "rgba(255,255,255,0.03)" }}
    whileHover={{ scale: 1.08 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <Icon className="w-3.5 h-3.5 transition-colors duration-300 group-hover:text-[#D4AF37]"
      style={{ color: "rgba(150,137,95,0.65)" }} />
  </motion.a>
);

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className={`block transition-colors duration-200 hover:text-[#D4AF37] ${RajdhaniFont.className}`}
    style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}
  >
    {children}
  </a>
);

const ColTitle = ({ children }) => (
  <h5 className={`text-[10px] font-semibold uppercase tracking-[0.22em] mb-5 ${OxaniumFont.className}`}
    style={{ color: "#96895f" }}>
    {children}
  </h5>
);

const ThreeColumnFooter = () => (
  <footer className="relative bg-black overflow-hidden" style={{ borderTop: "1px solid rgba(150,137,95,0.2)" }}>
    {/* Top shimmer line */}
    <div className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }} />

    {/* Ambient glow */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(150,137,95,0.07) 0%, transparent 65%)" }} />

    <div className="relative z-10 max-w-screen-xl mx-auto px-8 pt-16 pb-8">
      <motion.div
        className="flex flex-wrap justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Col 1: Brand + address + socials */}
        <div className="w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm">
          <img src="/LandingPageAssets/logoNavbar.png" className="w-44 mb-4" alt="Logo" />
          <p className={`mt-2 font-medium text-sm leading-loose ${RajdhaniFont.className}`}
            style={{ color: "rgba(150,137,95,0.65)" }}>
            Daily Guardian<br />Corporate Center<br />Iloilo City, 5000
          </p>
          <div className="mt-5">
            <SocialLink href="https://facebook.com/PrometheusPr"                  icon={FaFacebookF} />
            <SocialLink href="https://www.tiktok.com/@prometheusph"               icon={FaTiktok} />
            <SocialLink href="https://www.linkedin.com/company/prometheusph/"     icon={FaLinkedinIn} />
            <SocialLink href="https://www.behance.net/prometheus-ph"              icon={FaBehance} />
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm">
          <ColTitle>Quick Links</ColTitle>
          <ul className="space-y-3">
            <li><FooterLink href="/">Home</FooterLink></li>
            <li><FooterLink href="/works">Our Works</FooterLink></li>
            <li><FooterLink href="/about">About</FooterLink></li>
            <li><FooterLink href="/blogs">Blog</FooterLink></li>
            <li><FooterLink href="/contact">Contact Us</FooterLink></li>
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div className="w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm">
          <ColTitle>Contact</ColTitle>
          <ul className="space-y-3">
            <li><FooterLink href="tel:0333292838">(033) 329-28-38</FooterLink></li>
            <li><FooterLink href="tel:0335113605">(033) 511-36-05</FooterLink></li>
            <li><FooterLink href="mailto:marketing@prometheus.ph">marketing@prometheus.ph</FooterLink></li>
          </ul>
        </div>

        {/* Col 4: Mission */}
        {/* <div className="w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm">
          <ColTitle>Mission</ColTitle>
          <p className={`font-medium text-sm leading-loose ${RajdhaniFont.className}`}
            style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>
            To forever chase excellence with curiosity as our guide.
          </p>
        </div> */}

        {/* Col 5: Vision ***/}
        <div className="w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm">
          <ColTitle>Vision</ColTitle>
          <p className={`font-medium text-sm leading-loose ${RajdhaniFont.className}`}
            style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>
            To build powerful connections through creativity and innovation across the widest variety of mediums and platforms.
          </p>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="my-8 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(150,137,95,0.3), transparent)" }} />

      {/* Bottom bar */}
      <div className={`flex flex-col sm:flex-row justify-between items-center gap-2 text-sm ${OxaniumFont.className}`}>
        <p style={{ color: "rgba(150,137,95,0.4)", letterSpacing: "0.1em", fontSize: "10px" }}>
          &copy; {new Date().getFullYear()} Prometheus. All Rights Reserved.
        </p>
        <p className={MoonlanderFont.className}
          style={{ color: "rgba(212,175,55,0.9)", letterSpacing: "0.18em", fontSize: "12px" }}>
          #IdeasEngineered
        </p>
        <div className="flex gap-5">
          <a href="/privacy-policy" style={{ color: "rgba(150,137,95,0.4)", fontSize: "10px", letterSpacing: "0.08em" }}
            className="hover:text-[#D4AF37] transition-colors duration-200">Privacy Policy</a>
          <a href="/terms-of-service" style={{ color: "rgba(150,137,95,0.4)", fontSize: "10px", letterSpacing: "0.08em" }}
            className="hover:text-[#D4AF37] transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default ThreeColumnFooter;
