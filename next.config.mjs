/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  webpack: (config, { dev, isServer }) => {
    console.log("Next.js build config:", { dev, isServer });
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
