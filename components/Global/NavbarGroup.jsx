"use client";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "@/components/Global/Sidebar";
function NavbarGroup() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={` fixed top-0 left-0 z-[100] h-24 transition-opacity duration-500 ${
        showNavbar ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-5 fixed top-0 left-0 lg:hidden">
        <Sidebar />
      </div>
      <div className="hidden lg:flex">
        <Navbar />
      </div>
    </div>
  );
}

export default NavbarGroup;
