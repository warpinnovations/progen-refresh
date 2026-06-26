import React from "react";
import type { Metadata } from "next";
import NavbarGroup from "@/components/Global/NavbarGroup";
import OurServices from "@/components/LandingPage/OurServices";
import Footer from "@/components/Global/Footer";

export const metadata: Metadata = {
  title: "Our Services | Prometheus",
  description:
    "Explore the full range of Prometheus services — strategy, creative, branding, digital marketing, media, social media, event management, and software solutions.",
};

const page = () => {
  return (
    <main className="bg-black">
      <NavbarGroup />
      <OurServices />
      <Footer />
    </main>
  );
};

export default page;
