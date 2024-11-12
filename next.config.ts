// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',           // This is the source URL (root path)
        destination: '/dashboard/weather-news', // The destination URL
        permanent: false,      // Set to true if it's a permanent redirect (308)
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig;
