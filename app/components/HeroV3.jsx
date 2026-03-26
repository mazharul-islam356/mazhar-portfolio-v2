"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const images = [
  "/quixalor-home.png",
  "/mks.png",
  "/gadcheap.png",
  "/maxcart.png",
  "/celtel.png",
  "/applenewtn.png",
  "/taiba.png",
  "/applenewtn.png",
  "/voterkotha-home.png",
  "/saki-home.png",
  "/celtel.png",
  "/taiba.png",
  "/commeriva-home.png",
  "/mks.png",
  "/taiba.png",
];

export default function HeroV3() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const startX = useRef(0);
  const isDragging = useRef(false);

  // ✅ Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Drag Start
  const startDrag = (x) => {
    isDragging.current = true;
    startX.current = x;
  };

  // ✅ Drag End
  const endDrag = (x) => {
    if (!isDragging.current) return;

    const diff = x - startX.current;

    if (diff > 50) {
      setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (diff < -50) {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }

    isDragging.current = false;
  };

  // ✅ Position Logic (Responsive)
  const getPosition = (i) => {
    let diff = i - index;

    if (diff < -Math.floor(images.length / 2)) diff += images.length;
    if (diff > Math.floor(images.length / 2)) diff -= images.length;

    // MOBILE → only 3 items
    if (isMobile) {
      if (diff === 0) return "center";
      if (diff === -1) return "left1";
      if (diff === 1) return "right1";
      return "hidden";
    }

    // DESKTOP → 5 items
    if (diff === 0) return "center";
    if (diff === -1) return "left1";
    if (diff === -2) return "left2";
    if (diff === 1) return "right1";
    if (diff === 2) return "right2";

    return "hidden";
  };

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div
        className="relative w-full h-100 md:h-120 cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onMouseUp={(e) => endDrag(e.clientX)}
        onMouseLeave={(e) => endDrag(e.clientX)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchEnd={(e) => endDrag(e.changedTouches[0].clientX)}
      >
        {images.map((img, i) => {
          const pos = getPosition(i);

          let classes =
            "absolute top-1/2 left-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ";

          // ✅ CENTER
          if (pos === "center") {
            classes +=
              "z-30 translate-x-[-50%] scale-90 md:scale-75 [transform:rotateY(0deg)] opacity-100";
          }

          // ✅ LEFT
          else if (pos === "left1") {
            classes += isMobile
              ? "z-20 translate-x-[-130%] scale-80 opacity-90"
              : "z-20 translate-x-[-160%] scale-90 [transform:rotateY(25deg)] opacity-90";
          } else if (pos === "left2") {
            classes +=
              "z-10 translate-x-[-260%] scale-90 [transform:rotateY(35deg)] opacity-80";
          }

          // ✅ RIGHT
          else if (pos === "right1") {
            classes += isMobile
              ? "z-20 translate-x-[30%] scale-80 opacity-90"
              : "z-20 translate-x-[60%] scale-90 [transform:rotateY(-25deg)] opacity-90";
          } else if (pos === "right2") {
            classes +=
              "z-10 translate-x-[160%] scale-90 [transform:rotateY(-35deg)] opacity-80";
          }

          // ✅ HIDDEN
          else {
            classes += "opacity-0 scale-50 pointer-events-none";
          }

          return (
            <Image
              key={i}
              width={500}
              height={500}
              src={img}
              alt="carousel"
              draggable={false}
              className={`${classes} w-60 h-32 md:w-[320px] md:h-55 object-cover md:rounded-xl rounded-sm shadow-xl select-none`}
            />
          );
        })}
      </div>
    </div>
  );
}
