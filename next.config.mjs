/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [1320, 420, 768, 991, 1024, 1200, 1500],
    path: "/_next/image",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_HOST + "/:path*", // Proxy to Backend
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: /node_modules/,
        poll: 10000, // Check for changes every second
      };
    }
    return config;
  },
};

export default nextConfig;
