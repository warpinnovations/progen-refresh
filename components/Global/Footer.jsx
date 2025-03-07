import React from "react";
import { FaFacebook, FaBehance, FaDribbble, FaLinkedinIn, FaTiktok } from 'react-icons/fa';

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 pb-1 transition duration-300 mt-2 mx-2"
  >
    {children}
  </a>
);

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    className="inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-3"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <div className="bg-customGray  overflow-x-hidden text-gray-100">
      <div className="max-w-screen-xl mx-auto py-6 pt-10 lg:py-6">
        <div className="lg:hidden flex flex-col items-center justify-center px-8">
          <div className="flex justify-center md:justify-start">
            <img src="/LandingPageAssets/logo.png" alt="Logo" className="w-52" />
          </div>
          <div className="mt-6 text-sm font-medium flex flex-wrap justify-center items-center flex-col font-ox sm:flex-row z-10">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/works">Our Works</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/blogs">Blogs</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </div>
          <div className="mt-6 z-10">
            <SocialLink href="https://facebook.com/PrometheusPr">
              <FaFacebook className="w-8 h-8" />
            </SocialLink>
            <SocialLink href="https://www.tiktok.com/@prometheusph">
              <FaTiktok className="w-8 h-8" />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/prometheusph/">
              <FaLinkedinIn className="w-8 h-8" />
            </SocialLink>
            <SocialLink href="https://www.behance.net/prometheus-ph">
              <FaBehance className="w-8 h-8" />
            </SocialLink>
            {/* <SocialLink href="https://dribbble.com/prometheusph">
              <FaDribbble className="w-8 h-8" />
            </SocialLink> */}
          </div>
          <p className="text-center text-sm mt-6 font-medium tracking-wide text-white font-ox">
            &copy; Copyright 2025, Prometheus. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;