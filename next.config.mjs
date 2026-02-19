const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Production domain
      {
        protocol: "https",
        hostname: "www.outletexpense.xyz",
      },
    ],
  },
};

export default nextConfig;
