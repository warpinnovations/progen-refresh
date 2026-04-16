"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import sendEmail from "../Contact/emailAPI";
import "react-toastify/ReactToastify.css";
import DOMPurify from "dompurify";
import CSSStars from "@/components/Global/CSSStars";
import localFont from "next/font/local";
import { Rajdhani, Oxanium } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const RajdhaniFont = Rajdhani({ weight: "700", subsets: ["latin"] });
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
  "Market Research",
];

const internAreas = [
  "Public Relations",
  "Creative Design",
  "Social Media",
  "Digital Marketing",
  "Events",
  "Software Dev",
  "Copywriting",
  "Photography / Video",
];

// --- File Upload Field ---
const FileField = ({ label, name, accept, onChange, file, fontClass }) => {
  const inputRef = React.useRef(null);
  return (
    <div>
      <label className={`block text-[11px] sm:text-xs text-[#96895F] uppercase tracking-[0.15em] font-bold mb-2 ${fontClass}`}>
        {label}
      </label>
      <div
        className="flex items-center gap-3 w-full p-3 rounded-xl cursor-pointer transition-all duration-300"
        onClick={() => inputRef.current?.click()}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: file ? "1px solid rgba(212,175,55,0.5)" : "1px solid rgba(150,137,95,0.2)",
          color: file ? "#D4AF37" : "rgba(255,255,255,0.3)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
          className="w-4 h-4 shrink-0" style={{ color: file ? "#D4AF37" : "rgba(150,137,95,0.5)" }}>
          <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
        </svg>
        <span className={`text-xs sm:text-sm truncate ${fontClass}`}>
          {file ? file.name : "Click to upload"}
        </span>
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          className="hidden"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

const ContactForm = () => {
  const formRef = useRef(null);
  const [mode, setMode] = useState("contact");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    message: "",
    services: [],
  });
  const [files, setFiles] = useState({
    appLetter: null,
    resume: null,
    portfolio: null,
  });

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setFormData({ firstName: "", lastName: "", email: "", number: "", message: "", services: [] });
    setFiles({ appLetter: null, resume: null, portfolio: null });
  };

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

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "contact" && formData.services.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }
    if (mode === "intern" && formData.services.length === 0) {
      toast.error("Please select at least one area of interest.");
      return;
    }
    setSubmitting(true);
    try {
      const sanitized = {
        firstName: escapeHTML(DOMPurify.sanitize(formData.firstName)),
        lastName: escapeHTML(DOMPurify.sanitize(formData.lastName)),
        email: escapeHTML(DOMPurify.sanitize(formData.email)),
        number: escapeHTML(DOMPurify.sanitize(formData.number)),
        message: escapeHTML(DOMPurify.sanitize(formData.message)),
      };

      const isCareer = mode === "career";
      const isIntern = mode === "intern";

      const messageBody = isCareer
        ? `💼 CAREER APPLICATION\n\nName: ${sanitized.firstName} ${sanitized.lastName}\nContact: ${sanitized.number}\nEmail: ${sanitized.email}\n\n(Applicant will send documents via email)`
        : isIntern
        ? `⭐ INTERNSHIP APPLICATION\n\nName: ${sanitized.firstName} ${sanitized.lastName}\nContact: ${sanitized.number}\nEmail: ${sanitized.email}\nAreas of Interest: ${formData.services.join(", ")}\n\n(Applicant will send documents via email)`
        : sanitized.message;

      await sendEmail({
        from_email: "marketing@prometheus.ph",
        from_name: "Prometheus",
        to_name: sanitized.firstName + " " + sanitized.lastName,
        user_email: sanitized.email,
        number: sanitized.number,
        application_type: isCareer ? "💼 CAREER APPLICATION" : isIntern ? "⭐ INTERNSHIP APPLICATION" : "📩 INQUIRY",
        selected_services: formData.services.join(", "),
        message: messageBody,
        to_email: isCareer ? "admin@prometheus.ph" : isIntern ? "internships@prometheus.ph" : "marketing@prometheus.ph",
      });

      setFormData({ firstName: "", lastName: "", email: "", number: "", message: "", services: [] });
      setFiles({ appLetter: null, resume: null, portfolio: null });
      toast.success(mode === "contact" ? "Email has been sent!" : "Application submitted! We'll be in touch.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = `${RajdhaniFont.className} w-full p-3 rounded-xl bg-white/[0.04] border border-[#96895F]/20 text-white/90 text-sm sm:text-base placeholder-white/25 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all duration-300`;
  const labelClasses = `${OxaniumFont.className} block text-[11px] sm:text-xs text-[#96895F] uppercase tracking-[0.15em] font-bold mb-2`;

  const leftTitle = mode === "intern"
    ? <><span className="text-[#f5f5f5]">Start Your</span><br /><span className="text-prOrange">Journey Here</span></>
    : mode === "career"
    ? <><span className="text-[#f5f5f5]">Launch Your</span><br /><span className="text-prOrange">Career Here</span></>
    : <><span className="text-[#f5f5f5]">Your Ticket to</span><br /><span className="text-prOrange">Greater Heights</span></>;

  const leftBody = mode === "intern"
    ? "Join the team. Learn fast. Get hands-on experience on real campaigns."
    : mode === "career"
    ? "Join the crew. Grow fast. Work on real campaigns with the best in Western Visayas."
    : "We're aiming for greatness. Let's build something extraordinary together.";

  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CSSStars />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(150, 137, 95, 0.04) 0%, transparent 70%)",
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
            background: "linear-gradient(135deg, rgba(15,15,15,0.9), rgba(20,18,14,0.85))",
            borderColor: "rgba(150, 137, 95, 0.15)",
            boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.6), inset 0 0 80px rgba(150, 137, 95, 0.03)",
          }}
        >
          <div className="absolute inset-[2px] rounded-2xl bg-black/30 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row">
            {/* Left side */}
            <div className="hidden md:flex flex-col items-center justify-center flex-1 p-8 lg:p-12">
              <motion.img
                className="w-64 lg:w-80 opacity-70"
                src="/AboutAssets/circle_logo.webp"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <div className="mt-8 text-center">
                <h3
                  className={`${MoonlanderFont.className} text-xl lg:text-2xl font-black uppercase mb-3`}
                  style={{ textShadow: "0 0 20px rgba(150, 137, 95, 0.15)" }}
                >
                  {leftTitle}
                </h3>
                <p
                  className={`${RajdhaniFont.className} text-white/50 text-sm lg:text-base max-w-xs mx-auto`}
                  style={{ letterSpacing: "0.04em", lineHeight: "1.6" }}
                >
                  {leftBody}
                </p>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="hidden md:block w-[1px] my-8 bg-gradient-to-b from-transparent via-[#96895F]/20 to-transparent" />

            {/* Right side - Form */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Mode tabs */}
              <div className="mb-6">
                <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(150,137,95,0.15)" }}>
                  {[
                    { id: "contact", label: "Inquire" },
                    { id: "career", label: "Career" },
                    { id: "intern", label: "Internships" },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleModeSwitch(id)}
                      className={`${OxaniumFont.className} relative px-4 py-2 rounded-lg text-[10px] uppercase tracking-[0.15em] font-bold transition-all duration-300`}
                      style={{
                        color: mode === id ? "#D4AF37" : "rgba(150,137,95,0.5)",
                        background: mode === id ? "linear-gradient(135deg, rgba(150,137,95,0.18), rgba(212,175,55,0.1))" : "transparent",
                        border: mode === id ? "1px solid rgba(212,175,55,0.35)" : "1px solid transparent",
                        boxShadow: mode === id ? "0 0 16px rgba(212,175,55,0.12)" : "none",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className={`${OxaniumFont.className} text-[#96895f] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-2 flex items-center gap-2`}>
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                    animate={{ boxShadow: ["0 0 6px rgba(212,175,55,0.6)", "0 0 12px rgba(212,175,55,1)", "0 0 6px rgba(212,175,55,0.6)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span>
                    {mode === "intern" ? "Internship Application" : mode === "career" ? "Career Application" : "Send Us A Message"}
                  </span>
                </div>
                <div className="h-[2px] w-16 bg-gradient-to-r from-[#D4AF37] via-[#96895F] to-transparent" />
                <p className={`${OxaniumFont.className} text-xs text-[#96895F]/70 mt-3 tracking-wide`}>
                  {mode === "career"
                    ? <>Submissions go to <span className="text-[#96895F]">admin@prometheus.ph</span></>
                    : mode === "intern"
                    ? <>Submissions go to <span className="text-[#96895F]">internships@prometheus.ph</span></>
                    : <>Reach us at <span className="text-[#96895F]">marketing@prometheus.ph</span></>}
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {/* Hidden fields read by EmailJS sendForm */}
                <input type="hidden" name="to_email" value={mode === "contact" ? "marketing@prometheus.ph" : "admin@prometheus.ph"} />
                <input type="hidden" name="application_type" value={mode === "career" ? "💼 CAREER APPLICATION" : "⭐ INTERNSHIP APPLICATION"} />
                <input type="hidden" name="selected_services" value={formData.services.join(", ")} />
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className={labelClasses}>First Name</label>
                    <input type="text" id="firstName" name="firstName" placeholder="Peter"
                      value={formData.firstName} onChange={handleChange} className={inputClasses} required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Weyland"
                      value={formData.lastName} onChange={handleChange} className={inputClasses} required />
                  </div>
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="number" className={labelClasses}>Contact Number</label>
                    <input type="text" id="number" name="number" placeholder="09123456789"
                      value={formData.number} onChange={handleChange}
                      pattern="[0-9]{11}" title="Please enter an 11-digit phone number"
                      className={inputClasses} required />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClasses}>Email Address</label>
                    <input type="email" id="email" name="email" placeholder="peterweyland@gmail.com"
                      value={formData.email} onChange={handleChange} className={inputClasses} required />
                  </div>
                </div>

                {/* Areas of Interest — intern only */}
                {mode === "intern" && (
                  <div>
                    <label className={labelClasses}>Area(s) of Interest</label>
                    <div className="flex flex-wrap gap-2">
                      {internAreas.map((item) => {
                        const isSelected = formData.services.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => handleServiceToggle(item)}
                            className={`${RajdhaniFont.className} px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border`}
                            style={{
                              background: isSelected ? "linear-gradient(135deg, rgba(150,137,95,0.2), rgba(212,175,55,0.1))" : "rgba(255,255,255,0.03)",
                              borderColor: isSelected ? "rgba(212,175,55,0.6)" : "rgba(150,137,95,0.15)",
                              color: isSelected ? "#D4AF37" : "rgba(255,255,255,0.5)",
                              boxShadow: isSelected ? "0 0 15px rgba(212,175,55,0.15)" : "none",
                            }}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Services — contact only */}
                {mode === "contact" && (
                  <div>
                    <label className={labelClasses}>Select Services</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((item) => {
                        const isSelected = formData.services.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => handleServiceToggle(item)}
                            className={`${RajdhaniFont.className} px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border`}
                            style={{
                              background: isSelected ? "linear-gradient(135deg, rgba(150,137,95,0.2), rgba(212,175,55,0.1))" : "rgba(255,255,255,0.03)",
                              borderColor: isSelected ? "rgba(212,175,55,0.6)" : "rgba(150,137,95,0.15)",
                              color: isSelected ? "#D4AF37" : "rgba(255,255,255,0.5)",
                              boxShadow: isSelected ? "0 0 15px rgba(212,175,55,0.15)" : "none",
                            }}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* File uploads — career */}
                {mode === "career" && (
                  <div className="space-y-3">
                    <FileField
                      label="Application Letter *"
                      name="appLetter"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      file={files.appLetter}
                      fontClass={OxaniumFont.className}
                    />
                    <FileField
                      label="Resume / CV *"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      file={files.resume}
                      fontClass={OxaniumFont.className}
                    />
                    <FileField
                      label="Creative Portfolio (if applicable)"
                      name="portfolio"
                      accept=".pdf,.zip,.png,.jpg,.jpeg"
                      required={false}
                      onChange={handleFileChange}
                      file={files.portfolio}
                      fontClass={OxaniumFont.className}
                    />
                  </div>
                )}

                {/* File uploads — intern */}
                {mode === "intern" && (
                  <div className="space-y-3">
                    <FileField
                      label="Internship Letter *"
                      name="appLetter"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      file={files.appLetter}
                      fontClass={OxaniumFont.className}
                    />
                    <FileField
                      label="Resume / CV *"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      file={files.resume}
                      fontClass={OxaniumFont.className}
                    />
                    <FileField
                      label="Creative Portfolio (if applicable)"
                      name="portfolio"
                      accept=".pdf,.zip,.png,.jpg,.jpeg"
                      required={false}
                      onChange={handleFileChange}
                      file={files.portfolio}
                      fontClass={OxaniumFont.className}
                    />
                  </div>
                )}

                {/* Message — contact only */}
                {mode === "contact" && (
                  <div>
                    <label htmlFor="message" className={labelClasses}>Message</label>
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
                )}

                {/* Submit */}
                <div className="flex justify-end pt-2">
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className={`${OxaniumFont.className} px-8 py-3 rounded-xl text-sm uppercase tracking-[0.15em] font-bold transition-all duration-300`}
                    style={{
                      background: "linear-gradient(135deg, rgba(150,137,95,0.2), rgba(212,175,55,0.15))",
                      border: "1.5px solid rgba(212,175,55,0.5)",
                      color: submitting ? "rgba(212,175,55,0.4)" : "#D4AF37",
                      boxShadow: "0 0 20px rgba(212,175,55,0.1)",
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}
                    whileHover={!submitting ? { boxShadow: "0 0 30px rgba(212,175,55,0.25)", scale: 1.02 } : {}}
                    whileTap={!submitting ? { scale: 0.98 } : {}}
                  >
                    {submitting ? "Uploading..." : mode === "contact" ? "Send Message" : "Submit Application"}
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
