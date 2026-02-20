// shaders.js
// GPU তে ইমেজ প্রসেস করার কোড

/**
 * ভার্টেক্স শেডার:
 * - প্রতিটি vertex (কোণ) এর পজিশন নির্ধারণ করে
 * - সমতল প্লেনকে কার্ভ আকৃতি দেয়
 *
 * কিভাবে কাজ করে:
 * 1. position.x কে radius দিয়ে ভাগ করে angle (theta) বের করে
 * 2. sin এবং cos ব্যবহার করে circular position তৈরি করে
 * 3. এতে flat image কার্ভ হয়ে যায়
 */
export const vertexShader = `
  varying vec2 vUv;  // UV coordinates - texture এর জন্য
  uniform float uRadius;  // কার্ভের ব্যাসার্ধ
  
  void main() {
    vUv = uv;  // UV পাস করা fragment shader এ
    
    vec3 p = position;  // বর্তমান vertex position
    
    // X position থেকে angle বের করা
    float theta = p.x / uRadius;
    
    // Trigonometry দিয়ে curve position
    float c = cos(theta);
    float s = sin(theta);
    
    // নতুন curved position
    vec3 curvedPosition = vec3(
      (uRadius * s) * 0.985,  // X: বৃত্তাকার X
      p.y,                     // Y: একই থাকবে
      uRadius * (1.0 - c)      // Z: সামনে-পেছনে
    );
    
    // Final position calculation
    gl_Position = projectionMatrix * modelViewMatrix * vec4(curvedPosition, 1.0);
  }
`;

/**
 * ফ্র্যাগমেন্ট শেডার:
 * - প্রতিটি pixel এর রং নির্ধারণ করে
 * - texture থেকে রং নিয়ে opacity প্রয়োগ করে
 * - saturation প্রয়োগ করে
 */
export const fragmentShader = `
  varying vec2 vUv;  // UV coordinates
  uniform sampler2D uTexture;  // ইমেজ টেক্সচার
  uniform float uOpacity;  // স্বচ্ছতা (0-1)
  uniform float uSaturation;  // স্যাচুরেশন (0 = গ্রেস্কেল, 1 = নরমাল, 2 = সুপার স্যাচুরেটেড)
  
  void main() {
    // টেক্সচার থেকে রং নেওয়া
    vec4 tex = texture2D(uTexture, vUv);
    
    // Saturation ক্যালকুলেশন
    // গ্রেস্কেল মান বের করা: চোখের সংবেদনশীলতা অনুযায়ী
    float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    
    // Mix করে saturation প্রয়োগ করা
    // gray এবং original color এর মধ্যে uSaturation অনুযায়ী মিক্স করা
    vec3 saturated = mix(vec3(gray), tex.rgb, uSaturation);
    
    // Final color with opacity
    gl_FragColor = vec4(saturated, tex.a * uOpacity);
  }
`;
