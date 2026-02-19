// components/Hero/index.jsx
"use client";

import { useEffect, useState } from "react";
import Loader from "../Loader";
import Navbar from "../Navbar";
import GlassButtonDemo from "./GlassButton";
import DarkVeil from "./DarkVeill";
import CarouselCanvas from "./CarouselCanvas";
import useDeviceDetect from "../../hooks/useDeviceDetect";

/**
 * Hero Component
 *
 * মূল hero section যা:
 * - 3D image carousel দেখায়
 * - Responsive design সাপোর্ট করে
 * - Loading state manage করে
 * - UI elements render করে
 */
export default function Hero() {
  const { isMobile } = useDeviceDetect();
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [darkVeilReady, setDarkVeilReady] = useState(false);

  // DarkVeil delay: main content load হওয়ার পর
  useEffect(() => {
    const timer = setTimeout(() => {
      setDarkVeilReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[90vh] overflow-hidden relative">
      {/* Loading Screen */}
      {isLoading && <Loader progress={loadProgress} />}

      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Navbar />
      </div>

      {/* Hero Title */}
      <div className="absolute md:top-36 top-40 w-full text-center md:z-30 z-10">
        <h2 className="borel md:text-base text-sm text-white">Hello There —</h2>
        <h2 className="text-white xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold tracking-wide bruno">
          You&apos;ve Entered a Creative Dimension
        </h2>
        <GlassButtonDemo />
      </div>

      {/* Background Effect */}
      {darkVeilReady && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <DarkVeil scanlineFrequency={5} scanlineIntensity={0.2} />
        </div>
      )}

      {/* 3D Carousel */}
      <CarouselCanvas
        isMobile={isMobile}
        setIsLoading={setIsLoading}
        setLoadProgress={setLoadProgress}
      />

      {/* Bottom Text */}
      <div className="absolute md:bottom-10 bottom-20 w-full text-center md:z-30 z-10">
        <h2 className="text-white md:text-3xl text-2xl opacity-90 dm-serif">
          Introducing myself — I am{" "}
          <span className="autowide md:text-lg text-base">Mazharul Islam</span>
          <br /> Frontend Developer
        </h2>
      </div>
    </div>
  );
}
