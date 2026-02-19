"use client";

import Image from "next/image";
import { useState } from "react";

export default function CustomImage({ src, alt, width, height }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="loader"></div>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
