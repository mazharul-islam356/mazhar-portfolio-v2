// components/Hero/index.jsx
"use client";

import { useState } from "react";
import Navbar from "../Navbar";
import GlassButtonDemo from "./GlassButton";
import CarouselCanvas from "./CarouselCanvas";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Loader from "../Loader";

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

  return (
    <div className="w-full md:h-screen h-[89vh] overflow-hidden relative bg-black">
      {/* Loading Screen */}
      {isLoading && <Loader progress={loadProgress} />}

      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Navbar />
      </div>

      {/* Hero Title */}
      <div className="absolute top-40  w-full text-center md:z-30 z-10">
        <h2 className="borel md:text-base text-sm text-white">Hello There —</h2>
        <h2 className="text-white xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold tracking-wide bruno">
          You&apos;ve Entered a Creative Dimension
        </h2>
        <GlassButtonDemo />
      </div>

      {/* Background Effect */}

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-10 md:w-72 w-40 h-40 md:h-72 md:bg-purple-500/40 bg-purple-500/60  rounded-full blur-[100px] animate-spin" />
        <div className="absolute bottom-10 right-20 md:w-96 md:h-96 w-32 h-32 md:bg-purple-500/40 bg-purple-500/60  rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-125 md:h-125 w-60 h-60 md:bg-purple-600/20 bg-purple-500/40  rounded-full blur-[150px]" />
      </div>

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
