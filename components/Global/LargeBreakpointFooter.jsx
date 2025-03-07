import React from "react";
import { FaFacebookF, FaTiktok, FaLinkedinIn, FaBehance, FaDribbble } from 'react-icons/fa';

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    className="cursor-pointer inline-block p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-500 transition duration-300 mr-4 last:mr-0"
  >
    {children}
  </a>
);

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="border-b-2 border-transparent hover:text-gray-300 hover:border-gray-100 pb-1 transition duration-300"
  >
    {children}
  </a>
);

const FooterColumn = ({ children }) => (
  <div className="w-1/2 md:w-1/5 mb-8 md:mb-0 text-sm sm:text-base text-center md:text-left">
    {children}
  </div>
);

const ThreeColumnFooter = () => {
  return (
    <div className="relative bg-customGray text-gray-100 -mb-8 px-8 font-ox">
      <div className="max-w-screen-xl hidden lg:flex lg:flex-col pt-8 pb-8 md:mx-4 xl:mx-auto">
        <div className="hidden lg:flex flex-wrap justify-between">
          <FooterColumn>
            <div className="flex items-center justify-center lg:justify-start">
              <img src="/LandingPageAssets/logoNavbar.png" className="w-52" alt="Logo" />
            </div>
            <p className="mt-4 max-w-xs font-medium text-sm mx-auto lg:mx-0 lg:mr-4 leading-loose text-center lg:text-left">
              Daily Guardian <br />
              Corporate Center <br />
              Iloilo City, 5000
            </p>
            <div className="mt-4 text-center lg:text-left md:-ml-4 md:-mr-6 lg:-mx-0">
              <SocialLink href="https://facebook.com/PrometheusPr">
                <FaFacebookF className="w-4 h-4" />
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@prometheusph">
                <FaTiktok className="w-4 h-4" />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/company/prometheusph/">
                <FaLinkedinIn className="w-4 h-4" />
              </SocialLink>
              <SocialLink href="https://www.behance.net/prometheus-ph">
                <FaBehance className="w-4 h-4" />
              </SocialLink>
              {/* <SocialLink href="https://dribbble.com/prometheusph">
                <FaDribbble className="w-4 h-4" />
              </SocialLink> */}
            </div>
          </FooterColumn>
          <FooterColumn>
            <h5 className="font-bold uppercase lg:text-left lg:ml-8 sm:text-center">Quick Links</h5>
            <ul className="mt-4 text-sm font-medium lg:ml-8 lg:text-left sm:text-center">
              <li className="mt-3">
                <FooterLink href="/">Home</FooterLink>
              </li>
              <li className="mt-3">
                <FooterLink href="/works">Our Works</FooterLink>
              </li>
              <li className="mt-3">
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li className="mt-3">
                <FooterLink href="/blogs">Blog</FooterLink>
              </li>
              {/* <li className="mt-3">
                <FooterLink href="/recon">Recon</FooterLink>
              </li> */}
              <li className="mt-3">
                <FooterLink href="/contact">Contact Us</FooterLink>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h5 className="font-bold uppercase lg:text-left sm:text-center">Contact</h5>
            <ul className="mt-4 text-sm font-medium lg:text-left sm:text-center">
              <li className="mt-3">
                <FooterLink href="tel:329-28-38">(033) 329-28-38</FooterLink>
              </li>
              <li className="mt-3">
                <FooterLink href="tel:511-36-06">(033) 511-36-05</FooterLink>
              </li>
              <li className="mt-3 sm:mr-12 sm:text-xs">
                <FooterLink href="mailto:marketing@prometheus.ph">marketing@prometheus.ph</FooterLink>
              </li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h5 className="font-bold uppercase lg:text-left sm:text-center">MISSION</h5>
            <p className="mt-4 ml-4 max-w-xs font-medium text-sm mx-auto lg:mx-0 lg:mr-8 leading-loose text-center lg:text-left sm:mr-4" >
            To forever chase excellence with curiosity as our guide.
            </p>
          </FooterColumn>
          <FooterColumn>
            <h5 className="font-bold uppercase lg:text-left sm:text-center">VISION</h5>
            <p className="mt-4 max-w-xs font-medium text-sm mx-auto lg:mx-0 lg:mr-8 leading-loose text-center lg:text-left">
                To build powerful connections through creativity and innovation across
                the widest variety of mediums and platforms.
            </p>
          </FooterColumn>
        </div>
        <div className="my-8 border-b-2 border-white" />
        <div className="pb-0 text-sm font-normal flex flex-col sm:flex-row justify-between items-center">
          <div>&copy; Copyright 2025, Prometheus.</div>
          <div>#IdeasEngineered</div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnFooter;
