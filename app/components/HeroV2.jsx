"use client";
import { CarouselCircular } from "@ddevkim/carousel-circular-3d";
import "@ddevkim/carousel-circular-3d/dist/index.css";
import { useEffect, useState } from "react";

export default function Hero2() {
  const items = [
    {
      id: 1,

      image: "/taiba.png",
      alt: "Image 1",
    },
    {
      id: 2,

      image: "/mks.png",
      alt: "Image 2",
    },
    {
      id: 3,

      image: "/gadcheap.png",
      alt: "Image 2",
    },
    {
      id: 4,

      image: "/maxcart.png",
      alt: "Image 2",
    },
    {
      id: 5,

      image: "/celtel.png",
      alt: "Image 2",
    },
    { id: 6, image: "/applenewtn.png", alt: "Image 2" },
    { id: 7, image: "/taiba.png", alt: "Image 2" },
    { id: 8, image: "/applenewtn.png", alt: "Image 2" },
    { id: 9, image: "/voterkotha-home.png", alt: "Image 3" },
    { id: 10, image: "/saki-home.png", alt: "Image 2" },
    { id: 11, image: "/celtel.png", alt: "Image 2" },
    { id: 12, image: "/taiba.png", alt: "Image 2" },
    { id: 13, image: "/commeriva-home.png", alt: "Image 1" },
    { id: 14, image: "/mks.png", alt: "Image 2" },
    // { id: 15, image: "/mks.png", alt: "Image 2" },
    // { id: 16, image: "/mks.png", alt: "Image 2" },
    // { id: 17, image: "/mks.png", alt: "Image 2" },
    // { id: 18, image: "/mks.png", alt: "Image 2" },
    // { id: 19, image: "/mks.png", alt: "Image 2" },
    // { id: 20, image: "/mks.png", alt: "Image 2" },
  ];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const mobileConfig = {
    containerHeight: 125,
    geometry: {
      depthIntensity: 1,
      radius: 220,
      cameraAngle: 1,
      perspective: 700,
    },
    visualEffect: {
      enableReflection: true,
      minScale: 0.1,
    },
  };

  const desktopConfig = {
    containerHeight: 290,
    geometry: {
      depthIntensity: 5,
      radius: 500,
      cameraAngle: -1,
      perspective: 2000,
    },
    visualEffect: {
      enableReflection: true,
      minScale: -0.2,
    },
  };

  const config = isMobile ? mobileConfig : desktopConfig;
  return (
    <div>
      <CarouselCircular
        containerHeight={config.containerHeight}
        items={items}
        enableLightboxWhenClick={true}
        autoRotateConfig={{
          enabled: true,
          speed: isMobile ? 0.1 : 0.1,
        }}
        lightboxOptions={{
          enableKeyboardNavigation: true,
          closeOnEsc: true,
          backgroundBlur: 10,
        }}
        visualEffect={config.visualEffect}
        geometry={config.geometry}
      />
    </div>
  );
}
