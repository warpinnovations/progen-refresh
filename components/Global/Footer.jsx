"use client";

import React from "react";
import { FaFacebookF, FaBehance, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { motion } from "framer-motion";

// -- Reusable & Animated Components --

const SectionTitle = ({ children }) => (
  <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-300 mb-5">
    {children}
  </h3>
);

const FooterLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-200"
    whileHover={{ y: -2 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    {children}
  </motion.a>
);

const ContactInfo = ({ children }) => (
  <p className="text-gray-400 leading-relaxed">{children}</p>
);

const SocialIconCircle = ({ href, icon: Icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 hover:bg-[#D4AF37] text-gray-300 hover:text-black rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300 hover:drop-shadow-[0_0_5px_rgba(212,175,55,0.7)]"
    whileHover={{ scale: 1.1 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <Icon className="h-5 w-5" />
  </motion.a>
);

// -- Main Footer Component with Entry Animations --

const Footer = () => {

  const footerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.footer
      className="bg-[#181818] font-sans text-sm border-t border-gray-800/50"
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* === TOP SECTION === */}
      <div className="max-w-screen-xl mx-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">

          {/* Col 1: Brand & Address */}
          <motion.div variants={columnVariants} className="lg:col-span-2">
            <img src="/LandingPageAssets/logoNavbar.png" alt="Prometheus Logo" className="w-48 mb-6" />
            <div className="space-y-3 text-gray-400 text-base">
              <p>Daily Guardian</p>
              <p>Corporate Center</p>
              <p>Iloilo City, 5000</p>
            </div>
            <div className="flex space-x-3 mt-8">
              <SocialIconCircle href="https://facebook.com/PrometheusPr" icon={FaFacebookF} />
              <SocialIconCircle href="https://www.tiktok.com/@prometheusph" icon={FaTiktok} />
              <SocialIconCircle href="https://www.linkedin.com/company/prometheusph/" icon={FaLinkedinIn} />
              <SocialIconCircle href="https://www.behance.net/prometheus-ph" icon={FaBehance} />
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div variants={columnVariants}>
            <SectionTitle>Quick Links</SectionTitle>
            <ul className="space-y-4">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/works">Our Works</FooterLink></li>
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/blogs">Blogs</FooterLink></li>
              <li><FooterLink href="/contact">Contact Us</FooterLink></li>
            </ul>
          </motion.div>

          {/* Col 3: Contact */}
          <motion.div variants={columnVariants}>
            <SectionTitle>Contact</SectionTitle>
            <div className="space-y-4">
              <ContactInfo>(033) 329-28-38</ContactInfo>
              <ContactInfo>(033) 511-36-05</ContactInfo>
              <FooterLink href="mailto:marketing@prometheus.ph">marketing@prometheus.ph</FooterLink>
            </div>
          </motion.div>

          {/* Col 4: Mission & Vision */}
          <motion.div variants={columnVariants} className="md:col-span-2 lg:col-span-1">
            <SectionTitle>Mission</SectionTitle>
            <p className="text-gray-400 mb-8 leading-relaxed">To forever chase excellence with curiosity as our guide.</p>
            <SectionTitle>Vision</SectionTitle>
            <p className="text-gray-400 leading-relaxed">To build powerful connections through creativity and innovation.</p>
          </motion.div>
        </div>

        {/* --- Gradient Divider & Hashtag --- */}
        <div className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 order-2 sm:order-1 mt-4 sm:mt-0">&copy; Copyright {new Date().getFullYear()}, Prometheus.</p>
          <div className="h-px w-full sm:w-1/3 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent order-1 sm:order-2"></div>
          <p className="text-gray-400 font-semibold tracking-wider order-3 sm:order-3 mt-4 sm:mt-0">#IdeasEngineered</p>
        </div>
      </div>

      {/* === BOTTOM BAR === */}
      <div className="bg-[#121212] py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Prometheus. All Rights Reserved.</p>
          <div className="flex gap-6 text-xs">
            <a href="/privacy-policy" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;