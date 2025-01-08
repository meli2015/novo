/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mangabr-p.b-cdn.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
