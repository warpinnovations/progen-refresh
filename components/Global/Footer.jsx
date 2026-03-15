"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaBehance, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { motion } from "framer-motion";
import localFont from "next/font/local";
import { Oxanium, Rajdhani } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });
const RajdhaniFont = Rajdhani({ weight: "600", subsets: ["latin"] });

const SectionTitle = ({ children }) => (
  <h3 className={`text-[10px] font-semibold tracking-[0.22em] uppercase mb-5 ${OxaniumFont.className}`}
    style={{ color: "#96895f" }}>
    {children}
  </h3>
);

const FooterLink = ({ href, children }) => (
  <motion.a
    href={href}
    className={`block transition-colors duration-200 hover:text-[#D4AF37] ${RajdhaniFont.className}`}
    style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}
    whileHover={{ y: -1 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    {children}
  </motion.a>
);

const SocialIconCircle = ({ href, icon: Icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10 group"
    style={{ borderColor: "rgba(150,137,95,0.35)", background: "rgba(255,255,255,0.03)" }}
    whileHover={{ scale: 1.08 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <Icon className="w-3.5 h-3.5 transition-colors duration-300 group-hover:text-[#D4AF37]"
      style={{ color: "rgba(150,137,95,0.65)" }} />
  </motion.a>
);

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  const colVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.footer
      className="relative bg-black overflow-hidden"
      style={{ borderTop: "1px solid rgba(150,137,95,0.2)" }}
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(150,137,95,0.06) 0%, transparent 65%)" }} />

      {/* Main content */}
      <div className="relative z-10 max-w-screen-xl mx-auto pt-14 pb-10 px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10">

          {/* Col 1: Brand + address + socials */}
          <motion.div variants={colVariants} className="lg:col-span-2">
            <img src="/LandingPageAssets/logoNavbar.png" alt="Prometheus Logo" className="w-44 mb-5" />
            <div className={`space-y-1.5 text-sm mb-7 ${RajdhaniFont.className}`}
              style={{ color: "rgba(150,137,95,0.65)", letterSpacing: "0.05em" }}>
              <p>Daily Guardian Corporate Center</p>
              <p>Iloilo City, 5000</p>
            </div>
            <div className="flex gap-2.5">
              <SocialIconCircle href="https://facebook.com/PrometheusPr"                  icon={FaFacebookF} />
              <SocialIconCircle href="https://www.tiktok.com/@prometheusph"               icon={FaTiktok} />
              <SocialIconCircle href="https://www.linkedin.com/company/prometheusph/"     icon={FaLinkedinIn} />
              <SocialIconCircle href="https://www.behance.net/prometheus-ph"              icon={FaBehance} />
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div variants={colVariants}>
            <SectionTitle>Quick Links</SectionTitle>
            <ul className="space-y-3.5 text-sm">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/works">Our Works</FooterLink></li>
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/blogs">Blogs</FooterLink></li>
              <li><FooterLink href="/contact">Contact Us</FooterLink></li>
            </ul>
          </motion.div>

          {/* Col 3: Contact */}
          <motion.div variants={colVariants}>
            <SectionTitle>Contact</SectionTitle>
            <div className="space-y-3 text-sm">
              <p className={RajdhaniFont.className} style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>(033) 329-28-38</p>
              <p className={RajdhaniFont.className} style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>(033) 511-36-05</p>
              <FooterLink href="mailto:marketing@prometheus.ph">marketing@prometheus.ph</FooterLink>
            </div>
          </motion.div>

          {/* Col 4: Mission + Vision */}
          <motion.div variants={colVariants} className="md:col-span-2 lg:col-span-1">
            <SectionTitle>Mission</SectionTitle>
            <p className={`text-sm leading-relaxed mb-7 ${RajdhaniFont.className}`}
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>
              To forever chase excellence with curiosity as our guide.
            </p>
            <SectionTitle>Vision</SectionTitle>
            <p className={`text-sm leading-relaxed ${RajdhaniFont.className}`}
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>
              To build powerful connections through creativity and innovation.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(150,137,95,0.3), transparent)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className={`text-[10px] ${OxaniumFont.className}`}
            style={{ color: "rgba(150,137,95,0.4)", letterSpacing: "0.1em" }}>
            &copy; {new Date().getFullYear()} Prometheus. All Rights Reserved.
          </p>
          <p className={`text-[12px] font-bold ${MoonlanderFont.className}`}
            style={{ color: "rgba(212,175,55,0.9)", letterSpacing: "0.18em" }}>
            #IdeasEngineered
          </p>
          <div className="flex gap-5">
            <a href="/privacy-policy" className={`text-[10px] hover:text-[#D4AF37] transition-colors duration-200 ${OxaniumFont.className}`}
              style={{ color: "rgba(150,137,95,0.4)", letterSpacing: "0.08em" }}>Privacy Policy</a>
            <a href="/terms-of-service" className={`text-[10px] hover:text-[#D4AF37] transition-colors duration-200 ${OxaniumFont.className}`}
              style={{ color: "rgba(150,137,95,0.4)", letterSpacing: "0.08em" }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
