// constants.js
// এই ফাইলে সব কনফিগারেশন রাখা হয়েছে
// সহজে পরিবর্তন করা যায়

export const IMAGE_PATHS = [
  "/celtel.png",
  "/mks.png",
  "/taibamart-home.png",
  "/gadcheap.png",
  "/applenewtn.png",
  "/maxcart.png",
  "/voterkotha-home.png",
  "/saki-home.png",
];

// মোবাইল ডিভাইসের জন্য সেটিংস
export const MOBILE_CONFIG = {
  numVisible: 4.5, // স্ক্রিনে কতগুলো ইমেজ দেখাবে
  radius: 3, // ক্যারোসেলের ব্যাসার্ধ (ছোট = বেশি কেন্দ্রীভূত)
  arcSpread: 0.8 * Math.PI, // ইমেজগুলোর বিস্তার কতটুকু হবে
  planeWidth: 2, // প্রতিটি ইমেজের প্রস্থ
  planeHeight: 1.2, // প্রতিটি ইমেজের উচ্চতা
  widthSegments: 23, // কার্ভের স্মুথনেস (বেশি = ভালো কোয়ালিটি)
  pixelRatio: 5, // পিক্সেল রেশিও (বেশি = ভালো কোয়ালিটি)
  cameraZ: 4, // ক্যামেরার দূরত্ব
};

// ডেস্কটপের জন্য সেটিংস
export const DESKTOP_CONFIG = {
  numVisible: 8,
  radius: 4.5,
  arcSpread: 1.4 * Math.PI,
  planeWidth: 2.6,
  planeHeight: 1.55,
  widthSegments: 30,
  pixelRatio: 5,
  cameraZ: 5.5,
};

// অ্যানিমেশন সেটিংস
export const ANIMATION_CONFIG = {
  autoScrollSpeed: 0.005, // অটো স্ক্রোল স্পিড
  dragSensitivity: 0.01, // ড্র্যাগ সেনসিটিভিটি
  easing: 0.075, // স্মুথনেস (কম = বেশি স্মুথ)
  fadeInStep: 0.05, // ফেড ইন স্পিড
  fadeInDelay: 50, // প্রতিটি ইমেজের ফেড ইন ডিলে
};
