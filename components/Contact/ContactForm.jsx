"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import sendEmail from "../Contact/emailAPI";
import "react-toastify/ReactToastify.css";
import DOMPurify from "dompurify";
import CSSStars from "@/components/Global/CSSStars";
import localFont from "next/font/local";
import { Rajdhani, Oxanium } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const RajdhaniFont = Rajdhani({ weight: "600", subsets: ["latin"] });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });

const escapeHTML = (str) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const services = [
  "Strategy",
  "Creative",
  "Branding",
  "Digital Marketing",
  "Media",
  "Social Media",
  "Event Management",
  "Software Solutions",
  "Wedding Studio",
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    message: "",
    services: [],
  });

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    const sanitizedData = {
      ...formData,
      firstName: escapeHTML(DOMPurify.sanitize(formData.firstName)),
      lastName: escapeHTML(DOMPurify.sanitize(formData.lastName)),
      email: escapeHTML(DOMPurify.sanitize(formData.email)),
      number: escapeHTML(DOMPurify.sanitize(formData.number)),
      message: escapeHTML(DOMPurify.sanitize(formData.message)),
    };

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      message: "",
      services: [],
    });

    sendEmail({
      from_email: "marketing@prometheus.ph",
      from_name: "Prometheus",
      to_name: sanitizedData.firstName + " " + sanitizedData.lastName,
      user_email: sanitizedData.email,
      number: sanitizedData.number,
      message: `
        First Name: ${sanitizedData.firstName} \n
        Last Name: ${sanitizedData.lastName} \n
        Number: ${sanitizedData.number} \n
        Email: ${sanitizedData.email} \n
        Services Selected: ${sanitizedData.services.join(", ")} \n
        Message: ${sanitizedData.message}
      `,
    });

    toast.success("Email has been sent!");
  };

  const inputClasses = `${RajdhaniFont.className} w-full p-3 rounded-xl bg-white/[0.04] border border-[#96895F]/20 text-white/90 text-sm sm:text-base placeholder-white/25 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-300`;
  const labelClasses = `${OxaniumFont.className} block text-[11px] sm:text-xs text-[#96895F] uppercase tracking-[0.15em] font-bold mb-2`;

  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CSSStars />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(150, 137, 95, 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <ToastContainer />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border-2 overflow-hidden backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,15,15,0.9), rgba(20,18,14,0.85))",
            borderColor: "rgba(150, 137, 95, 0.15)",
            boxShadow:
              "0 20px 60px -15px rgba(0, 0, 0, 0.6), inset 0 0 80px rgba(150, 137, 95, 0.03)",
          }}
        >
          {/* Inner dark layer */}
          <div className="absolute inset-[2px] rounded-2xl bg-black/30 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row">
            {/* Left side - Logo + Info */}
            <div className="hidden md:flex flex-col items-center justify-center flex-1 p-8 lg:p-12">
              <motion.img
                className="w-64 lg:w-80 opacity-70"
                src="/AboutAssets/circle_logo.webp"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <div className="mt-8 text-center">
                <h3
                  className={`${MoonlanderFont.className} text-xl lg:text-2xl font-black text-white uppercase mb-3`}
                  style={{ textShadow: "0 0 20px rgba(150, 137, 95, 0.15)" }}
                >
                  Your Ticket to
                  <br />
                  <span className="text-prOrange">Greater Heights</span>
                </h3>
                <p
                  className={`${RajdhaniFont.className} text-white/50 text-sm lg:text-base max-w-xs mx-auto`}
                  style={{ letterSpacing: "0.04em", lineHeight: "1.6" }}
                >
                  We&apos;re aiming for greatness. Let&apos;s build something
                  extraordinary together.
                </p>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="hidden md:block w-[1px] my-8 bg-gradient-to-b from-transparent via-[#96895F]/20 to-transparent" />

            {/* Right side - Form */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="mb-6">
                <div
                  className={`${OxaniumFont.className} text-[#96895f] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-2 flex items-center gap-2`}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                    animate={{
                      boxShadow: [
                        "0 0 6px rgba(212, 175, 55, 0.6)",
                        "0 0 12px rgba(212, 175, 55, 1)",
                        "0 0 6px rgba(212, 175, 55, 0.6)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span>Send Us A Message</span>
                </div>
                <div className="h-[2px] w-16 bg-gradient-to-r from-[#D4AF37] via-[#96895F] to-transparent" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className={labelClasses}>
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Peter"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClasses}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Weyland"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="number" className={labelClasses}>
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      placeholder="09123456789"
                      value={formData.number}
                      onChange={handleChange}
                      pattern="[0-9]{11}"
                      title="Please enter a 11-digit phone number e.g. (09123456789)"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="peterweyland@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label className={labelClasses}>Select Services</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => {
                      const isSelected = formData.services.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceToggle(service)}
                          className={`${RajdhaniFont.className} px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border`}
                          style={{
                            background: isSelected
                              ? "linear-gradient(135deg, rgba(150, 137, 95, 0.2), rgba(212, 175, 55, 0.1))"
                              : "rgba(255,255,255,0.03)",
                            borderColor: isSelected
                              ? "rgba(212, 175, 55, 0.6)"
                              : "rgba(150, 137, 95, 0.15)",
                            color: isSelected ? "#D4AF37" : "rgba(255,255,255,0.5)",
                            boxShadow: isSelected
                              ? "0 0 15px rgba(212, 175, 55, 0.15)"
                              : "none",
                          }}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    placeholder="Tell us your story or ask us anything!"
                    onChange={handleChange}
                    className={inputClasses}
                    rows="5"
                    style={{ resize: "none" }}
                    required
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-2">
                  <motion.button
                    type="submit"
                    className={`${OxaniumFont.className} px-8 py-3 rounded-xl text-sm uppercase tracking-[0.15em] font-bold transition-all duration-300`}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(150, 137, 95, 0.2), rgba(212, 175, 55, 0.15))",
                      border: "1.5px solid rgba(212, 175, 55, 0.5)",
                      color: "#D4AF37",
                      boxShadow: "0 0 20px rgba(212, 175, 55, 0.1)",
                    }}
                    whileHover={{
                      boxShadow: "0 0 30px rgba(212, 175, 55, 0.25)",
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#96895F]/25 rounded-tr-lg" />
          </div>
          <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#96895F]/25 rounded-bl-lg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
