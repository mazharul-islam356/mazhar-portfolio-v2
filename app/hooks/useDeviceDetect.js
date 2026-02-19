// hooks/useDeviceDetect.js
"use client";

import { useEffect, useState } from "react";

/**
 * useDeviceDetect Hook
 *
 * কি করে:
 * - window এর width চেক করে mobile কিনা বোঝে
 * - resize হলে আপডেট করে
 *
 * কেন দরকার:
 * - মোবাইল এবং ডেস্কটপে আলাদা সেটিংস দরকার
 * - responsive design এর জন্য
 */
export default function useDeviceDetect(breakpoint = 768) {
  // State: মোবাইল কিনা
  const [isMobile, setIsMobile] = useState(false);

  // State: window width
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // ফাংশন: window size চেক করা
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });
      setIsMobile(width < breakpoint);
    };

    // প্রথমবার চেক
    checkDevice();

    // resize event listener
    window.addEventListener("resize", checkDevice);

    // cleanup: component unmount হলে listener সরিয়ে দেওয়া
    return () => window.removeEventListener("resize", checkDevice);
  }, [breakpoint]);

  return { isMobile, windowSize };
}
