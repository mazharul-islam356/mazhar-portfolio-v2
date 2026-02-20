"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";
import {
  IMAGE_PATHS,
  MOBILE_CONFIG,
  DESKTOP_CONFIG,
  ANIMATION_CONFIG,
} from "./constants";
import { loadAllTextures } from "../../utils/textureLoader";

const wrap = (value, max) => ((value % max) + max) % max;

export default function CarouselCanvas({
  isMobile,
  setIsLoading,
  setLoadProgress,
}) {
  const canvasRef = useRef(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  const meshesRef = useRef([]);
  const texturesRef = useRef([]);
  const geometryRef = useRef(null);

  const rafRef = useRef(0);
  const initializedRef = useRef(false);

  // drag
  const downRef = useRef(false);
  const prevXRef = useRef(0);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);

  // fade clock
  const startTimeRef = useRef(0);

  const config = useMemo(
    () => (isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG),
    [isMobile],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera (keep your existing behavior)
    const isMobileViewport = window.innerWidth <= 768;
    const fov = !isMobileViewport ? 75 : 120;

    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.01,
      20,
    );
    camera.position.z = config.cameraZ;
    cameraRef.current = camera;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(
      Math.min(config.pixelRatio, window.devicePixelRatio),
    );
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Geometry
    const geometry = new THREE.PlaneGeometry(
      config.planeWidth,
      config.planeHeight,
      config.widthSegments,
      1,
    );
    geometryRef.current = geometry;

    // Create meshes (same count logic)
    const createMeshes = (textures) => {
      const meshes = [];
      const numMeshes = Math.min(IMAGE_PATHS.length * 2, 16);

      for (let i = 0; i < numMeshes; i++) {
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: textures[i % textures.length] },
            uRadius: { value: config.radius },
            uOpacity: { value: 0 },
            uSaturation: { value: 0.7 },
          },
          vertexShader,
          fragmentShader,
          transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        meshes.push(mesh);
      }
      return meshes;
    };

    // Stagger fade-in (same feel as setTimeout version, but cheaper)
    // Uses: delay per mesh + incremental opacity per frame
    const updateFade = (timeMs) => {
      const meshes = meshesRef.current;
      if (!meshes.length) return;

      const t = (timeMs - startTimeRef.current) / 1000;

      const delay = (ANIMATION_CONFIG.fadeInDelay ?? 60) / 1000; // ms->s
      // Convert your "step per frame" to a rough speed:
      // If fadeInStep=0.03 at ~60fps => ~1.8 opacity/sec
      const speed = (ANIMATION_CONFIG.fadeInStep ?? 0.03) * 60;

      for (let i = 0; i < meshes.length; i++) {
        const m = meshes[i];
        const localT = Math.max(0, t - i * delay);
        const opacity = Math.min(1, localT * speed);
        const u = m.material?.uniforms?.uOpacity;
        if (u) u.value = opacity;
      }
    };

    // Animate (same layout + lookAt)
    const animate = (timeMs) => {
      rafRef.current = requestAnimationFrame(animate);
      if (!initializedRef.current) return;

      const meshes = meshesRef.current;
      const cam = cameraRef.current;
      const rend = rendererRef.current;
      const scn = sceneRef.current;
      if (!meshes.length || !cam || !rend || !scn) return;

      // fade update
      updateFade(timeMs);

      // auto scroll
      if (!downRef.current) {
        targetXRef.current -= ANIMATION_CONFIG.autoScrollSpeed;
      }

      // easing
      currentXRef.current +=
        (targetXRef.current - currentXRef.current) * ANIMATION_CONFIG.easing;

      const numMeshes = meshes.length;
      const centerIndex = Math.floor(numMeshes / 2);

      for (let i = 0; i < numMeshes; i++) {
        const mesh = meshes[i];

        const raw = i - currentXRef.current;
        const wrapped = wrap(raw + centerIndex, numMeshes) - centerIndex;

        const angle = wrapped * (config.arcSpread / (config.numVisible - 1));

        mesh.visible = Math.abs(wrapped) <= config.numVisible / 2;
        if (!mesh.visible) continue;

        mesh.position.x = config.radius * Math.sin(angle);
        mesh.position.z = config.radius * (1 - Math.cos(angle));
        mesh.scale.set(1, 1, 1);

        // keep EXACT orientation behavior
        mesh.lookAt(cam.position.x, 0, cam.position.z);
      }

      rend.render(scn, cam);
    };

    // Pointer events (same drag logic, less global overhead)
    const onPointerDown = (e) => {
      downRef.current = true;
      prevXRef.current = e.clientX;
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onPointerUp = (e) => {
      downRef.current = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!downRef.current) return;
      targetXRef.current -=
        (e.clientX - prevXRef.current) * ANIMATION_CONFIG.dragSensitivity;
      prevXRef.current = e.clientX;
    };

    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });
    canvas.addEventListener("pointerup", onPointerUp, { passive: true });
    canvas.addEventListener("pointercancel", onPointerUp, { passive: true });
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });

    const onResize = () => {
      const cam = cameraRef.current;
      const rend = rendererRef.current;
      if (!cam || !rend) return;
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.updateProjectionMatrix();
      rend.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Init
    (async () => {
      try {
        setIsLoading(true);

        const textureLoader = new THREE.TextureLoader();

        const textures = await loadAllTextures(
          IMAGE_PATHS,
          textureLoader,
          renderer,
          setLoadProgress,
          isMobileViewport,
        );

        if (disposed) return;

        texturesRef.current = textures;

        if (textures.length > 0) {
          meshesRef.current = createMeshes(textures);
          initializedRef.current = true;
          startTimeRef.current = performance.now();
          rafRef.current = requestAnimationFrame(animate);
        }

        setTimeout(() => !disposed && setIsLoading(false), 500);
      } catch (error) {
        console.error("Initialization failed:", error);
        !disposed && setIsLoading(false);
      }
    })();

    // Cleanup
    return () => {
      disposed = true;

      cancelAnimationFrame(rafRef.current);

      window.removeEventListener("resize", onResize);

      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointermove", onPointerMove);

      // dispose
      meshesRef.current.forEach((mesh) => {
        if (!mesh) return;
        scene.remove(mesh);
        mesh.material?.dispose?.();
      });
      meshesRef.current = [];

      geometryRef.current?.dispose?.();
      geometryRef.current = null;

      texturesRef.current.forEach((t) => t?.dispose?.());
      texturesRef.current = [];

      rendererRef.current?.dispose?.();
      rendererRef.current = null;

      sceneRef.current = null;
      cameraRef.current = null;
      initializedRef.current = false;
    };
  }, [config, setIsLoading, setLoadProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute md:top-14 top-10 inset-0 z-10 webgl"
    />
  );
}
