// hooks/useCarouselControls.js
"use client";

import { useEffect, useRef, useCallback } from "react";
import { ANIMATION_CONFIG } from "../components/Hero/constants";

/**
 * useCarouselControls Hook
 *
 * কি করে:
 * - মাউস drag এবং touch drag হ্যান্ডেল করে
 * - targetX এবং currentX ম্যানেজ করে
 * - smooth animation তৈরি করে
 *
 * কিভাবে কাজ করে:
 * 1. mousedown/touchstart: ড্র্যাগ শুরু
 * 2. mousemove/touchmove: targetX আপডেট
 * 3. mouseup/touchend: ড্র্যাগ শেষ
 * 4. animate loop: currentX ধীরে ধীরে targetX এর দিকে যায়
 */
export default function useCarouselControls() {
  // Refs: mutable values যা re-render trigger করে না
  const mouseDownRef = useRef(false); // ড্র্যাগ হচ্ছে কিনা
  const prevXRef = useRef(0); // আগের X position
  const targetXRef = useRef(0); // লক্ষ্য X position
  const currentXRef = useRef(0); // বর্তমান X position

  // Mouse down handler
  const handleMouseDown = useCallback((e) => {
    mouseDownRef.current = true;
    prevXRef.current = e.clientX;
  }, []);

  // Mouse up handler
  const handleMouseUp = useCallback(() => {
    mouseDownRef.current = false;
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (!mouseDownRef.current) return;

    // targetX আপডেট: বর্তমান - আগের position × sensitivity
    targetXRef.current -=
      (e.clientX - prevXRef.current) * ANIMATION_CONFIG.dragSensitivity;
    prevXRef.current = e.clientX;
  }, []);

  // Touch start handler (mobile)
  const handleTouchStart = useCallback((e) => {
    mouseDownRef.current = true;
    prevXRef.current = e.touches[0].clientX;
  }, []);

  // Touch end handler
  const handleTouchEnd = useCallback(() => {
    mouseDownRef.current = false;
  }, []);

  // Touch move handler
  const handleTouchMove = useCallback((e) => {
    if (!mouseDownRef.current) return;

    targetXRef.current -=
      (e.touches[0].clientX - prevXRef.current) *
      ANIMATION_CONFIG.dragSensitivity;
    prevXRef.current = e.touches[0].clientX;
  }, []);

  // Event listeners setup
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  ]);

  // Values গুলো return করা
  return {
    mouseDownRef,
    targetXRef,
    currentXRef,
  };
}
