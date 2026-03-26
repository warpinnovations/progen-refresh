"use client"
import { useState, useEffect } from "react";

const getDeviceType = () => {
  if (typeof window === "undefined") return "desktop";
  const userAgent = navigator.userAgent;
  if (/Mobi/.test(userAgent) || /Android/i.test(userAgent)) {
    return "mobile";
  }
  return "desktop";
};

const useDeviceDetect = () => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    setDeviceType(getDeviceType());
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile: deviceType === "mobile" };
};

export default useDeviceDetect;
