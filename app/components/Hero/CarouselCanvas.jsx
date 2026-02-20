// components/Hero/CarouselCanvas.jsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";
import {
  IMAGE_PATHS,
  MOBILE_CONFIG,
  DESKTOP_CONFIG,
  ANIMATION_CONFIG,
} from "./constants";
import { loadAllTextures } from "../../utils/textureLoader";

/**
 * CarouselCanvas Component
 *
 * Props:
 * @param {boolean} isMobile - মোবাইল কিনা
 * @param {function} setIsLoading - loading state setter
 * @param {function} setLoadProgress - progress state setter
 *
 * কিভাবে কাজ করে:
 * 1. Three.js scene, camera, renderer তৈরি করে
 * 2. ইমেজ texture গুলো load করে
 * 3. প্রতিটি ইমেজের জন্য curved mesh তৈরি করে
 * 4. Animation loop চালায়
 * 5. User interaction handle করে
 */
export default function CarouselCanvas({
  isMobile,
  setIsLoading,
  setLoadProgress,
}) {
  // Canvas element এর reference
  const canvasRef = useRef(null);

  // Three.js objects এর references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshesRef = useRef([]);
  const texturesRef = useRef([]);
  const geometryRef = useRef(null);
  const animationRef = useRef(null);

  // Drag control refs
  const mouseDownRef = useRef(false);
  const prevXRef = useRef(0);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);

  // Initialization flag
  const isInitializedRef = useRef(false);

  // Device অনুযায়ী config নেওয়া
  const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;

  /**
   * wrap Function
   * - circular array এর জন্য
   * - যেমন: index 10 → index 2 (8টি item থাকলে)
   */
  const wrap = useCallback((value, max) => {
    return ((value % max) + max) % max;
  }, []);

  /**
   * createMeshes Function
   * - প্রতিটি texture এর জন্য mesh তৈরি করে
   * - ShaderMaterial ব্যবহার করে custom shader প্রয়োগ করে
   */
  const createMeshes = useCallback(
    (textures, geometry, scene) => {
      const meshes = [];
      const numMeshes = Math.min(IMAGE_PATHS.length * 2, 16);

      for (let i = 0; i < numMeshes; i++) {
        // ShaderMaterial: custom GPU shader ব্যবহার করে
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: textures[i % textures.length] },
            uRadius: { value: config.radius },
            uOpacity: { value: 0 }, // শুরুতে invisible
          },
          vertexShader,
          fragmentShader,
          transparent: true,
        });

        // Mesh: geometry + material = visible object
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        meshes.push(mesh);
      }

      return meshes;
    },
    [config.radius],
  );

  /**
   * fadeInMeshes Function
   * - meshes গুলো ধীরে ধীরে visible করে
   * - staggered animation তৈরি করে
   */
  const fadeInMeshes = useCallback((meshes) => {
    meshes.forEach((mesh, index) => {
      setTimeout(() => {
        const fadeIn = () => {
          if (mesh?.material?.uniforms?.uOpacity) {
            const opacity = mesh.material.uniforms.uOpacity;
            if (opacity.value < 1) {
              opacity.value += ANIMATION_CONFIG.fadeInStep;
              requestAnimationFrame(fadeIn);
            }
          }
        };
        fadeIn();
      }, index * ANIMATION_CONFIG.fadeInDelay);
    });
  }, []);

  /**
   * Animation Loop
   * - প্রতি frame এ চলে
   * - mesh positions আপডেট করে
   * - scene render করে
   */
  const animate = useCallback(() => {
    // eslint-disable-next-line react-hooks/immutability
    animationRef.current = requestAnimationFrame(animate);

    if (!isInitializedRef.current) return;

    const meshes = meshesRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const scene = sceneRef.current;

    if (!meshes.length || !camera || !renderer || !scene) return;

    // Auto scroll: drag না করলে নিজে থেকে চলবে
    if (!mouseDownRef.current) {
      targetXRef.current -= ANIMATION_CONFIG.autoScrollSpeed;
    }

    // Smooth easing: currentX ধীরে ধীরে targetX এর দিকে যায়
    currentXRef.current +=
      (targetXRef.current - currentXRef.current) * ANIMATION_CONFIG.easing;

    const numMeshes = meshes.length;
    const centerIndex = Math.floor(numMeshes / 2);

    // প্রতিটি mesh এর position update
    for (let i = 0; i < meshes.length; i++) {
      const mesh = meshes[i];
      if (!mesh) continue;

      // Wrap: circular positioning
      const raw = i - currentXRef.current;
      const wrapped = wrap(raw + centerIndex, numMeshes) - centerIndex;

      // Angle calculation: arc এ position
      const angle = wrapped * (config.arcSpread / (config.numVisible - 1));

      // Visibility check: দৃশ্যমান range এ আছে কিনা
      mesh.visible = Math.abs(wrapped) <= config.numVisible / 2;
      if (!mesh.visible) continue;

      // Position set: trigonometry দিয়ে circular position
      mesh.position.x = config.radius * Math.sin(angle);
      mesh.position.z = config.radius * (1 - Math.cos(angle));
      mesh.scale.set(1, 1, 1);

      // Camera এর দিকে তাকানো
      mesh.lookAt(camera.position.x, 0, camera.position.z);
    }

    // Scene render
    renderer.render(scene, camera);
  }, [config, wrap]);

  // Mouse/Touch event handlers
  const handleMouseDown = useCallback((e) => {
    mouseDownRef.current = true;
    prevXRef.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseDownRef.current = false;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!mouseDownRef.current) return;
    targetXRef.current -=
      (e.clientX - prevXRef.current) * ANIMATION_CONFIG.dragSensitivity;
    prevXRef.current = e.clientX;
  }, []);

  const handleTouchStart = useCallback((e) => {
    mouseDownRef.current = true;
    prevXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    mouseDownRef.current = false;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!mouseDownRef.current) return;
    targetXRef.current -=
      (e.touches[0].clientX - prevXRef.current) *
      ANIMATION_CONFIG.dragSensitivity;
    prevXRef.current = e.touches[0].clientX;
  }, []);

  // Resize handler
  const handleResize = useCallback(() => {
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    if (!camera || !renderer) return;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  // Main initialization effect
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene তৈরি: সব 3D objects এর container
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const isMobile = window.innerWidth <= 768; // breakpoint
    const fov = !isMobile ? 75 : 120;
    // Camera তৈরি: দৃশ্য দেখার perspective
    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.01, // Near clipping plane
      20, // Far clipping plane
    );
    camera.position.z = config.cameraZ;
    scene.add(camera);
    cameraRef.current = camera;

    // Renderer তৈরি: scene কে canvas এ আঁকে
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true, // মসৃণ edges
      alpha: true, // transparent background
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Pixel Ratio: high DPI displays এ ভালো quality
    renderer.setPixelRatio(
      Math.min(config.pixelRatio, window.devicePixelRatio),
    );
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Geometry তৈরি: plane এর shape
    const geometry = new THREE.PlaneGeometry(
      config.planeWidth,
      config.planeHeight,
      config.widthSegments, // বেশি segments = বেশি smooth curve
      1,
    );
    geometryRef.current = geometry;

    // Event listeners add
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Textures load এবং meshes তৈরি
    const init = async () => {
      try {
        const textureLoader = new THREE.TextureLoader();

        const textures = await loadAllTextures(
          IMAGE_PATHS,
          textureLoader,
          renderer,
          setLoadProgress,
          isMobile,
        );

        texturesRef.current = textures;

        if (textures.length > 0) {
          const meshes = createMeshes(textures, geometry, scene);
          meshesRef.current = meshes;

          isInitializedRef.current = true;
          fadeInMeshes(meshes);
          animate();
        }

        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error("Initialization failed:", error);
        setIsLoading(false);
      }
    };

    init();

    // Cleanup function
    return () => {
      // Animation cancel
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Event listeners remove
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      // Renderer dispose
      rendererRef.current?.dispose();

      // Geometry dispose
      geometryRef.current?.dispose();

      // Meshes dispose
      meshesRef.current.forEach((mesh) => {
        mesh?.material?.dispose();
      });

      // Textures dispose
      texturesRef.current.forEach((texture) => {
        texture?.dispose();
      });

      // Reset refs
      meshesRef.current = [];
      texturesRef.current = [];
      isInitializedRef.current = false;
    };
  }, [
    isMobile,
    config,
    animate,
    createMeshes,
    fadeInMeshes,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    handleResize,
    setIsLoading,
    setLoadProgress,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute md:top-14 top-10 inset-0 z-10 webgl"
    />
  );
}
