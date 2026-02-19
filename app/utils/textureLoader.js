// utils/textureLoader.js
import * as THREE from "three";

/**
 * loadTexture Function
 *
 * কি করে:
 * - ইমেজ URL থেকে Three.js texture তৈরি করে
 * - উচ্চ মানের জন্য বিভিন্ন সেটিংস প্রয়োগ করে
 * - loading progress ট্র্যাক করে
 *
 * Parameters:
 * @param {string} url - ইমেজের path
 * @param {THREE.TextureLoader} loader - texture loader instance
 * @param {THREE.WebGLRenderer} renderer - renderer instance
 * @param {number} index - বর্তমান ইমেজের index
 * @param {number} total - মোট ইমেজ সংখ্যা
 * @param {function} onProgress - progress callback
 * @param {boolean} isMobile - mobile device কিনা
 */
export const loadTexture = (
  url,
  loader,
  renderer,
  index,
  total,
  onProgress,
  isMobile,
) => {
  return new Promise((resolve) => {
    loader.load(
      url,
      // Success callback
      (texture) => {
        try {
          // Anisotropic Filtering:
          // - তির্যক angle থেকে দেখলে ইমেজ blur হয় না
          // - মোবাইলে 4, ডেস্কটপে 8
          texture.anisotropy = Math.min(
            isMobile ? 4 : 8,
            renderer.capabilities.getMaxAnisotropy(),
          );

          // Texture Filtering:
          // - LinearMipmapLinearFilter: সবচেয়ে ভালো quality
          // - দূরে গেলে ইমেজ smooth থাকে
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;

          // Mipmaps:
          // - ছোট ভার্সন তৈরি করে
          // - দূরত্ব অনুযায়ী সঠিক ভার্সন ব্যবহার করে
          texture.generateMipmaps = true;

          // Color Space:
          // - সঠিক color দেখানোর জন্য
          texture.colorSpace = THREE.SRGBColorSpace;

          // Progress update
          onProgress(((index + 1) / total) * 100);

          resolve(texture);
        } catch (err) {
          console.error(`Error processing texture ${url}:`, err);
          resolve(null);
        }
      },
      // Progress callback (unused)
      undefined,
      // Error callback
      (err) => {
        console.error(`Failed to load ${url}:`, err);
        resolve(null);
      },
    );
  });
};

/**
 * loadAllTextures Function
 *
 * কি করে:
 * - সব ইমেজ একসাথে load করে
 * - null texture বাদ দেয়
 */
export const loadAllTextures = async (
  imagePaths,
  loader,
  renderer,
  onProgress,
  isMobile,
) => {
  const textures = [];

  for (let i = 0; i < imagePaths.length; i++) {
    const texture = await loadTexture(
      imagePaths[i],
      loader,
      renderer,
      i,
      imagePaths.length,
      onProgress,
      isMobile,
    );

    if (texture) {
      textures.push(texture);
    }
  }

  return textures;
};
