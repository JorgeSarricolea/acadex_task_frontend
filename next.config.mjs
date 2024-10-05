/** @type {import('next').NextConfig} */
const routeMapping = {
  "/": "/pages/home",
  "/home": "/pages/home",
  "/login": "/pages/login",
  "/signup": "/pages/signup",
  // Add more routes here
};

const nextConfig = {
  async rewrites() {
    return Object.entries(routeMapping).map(([source, destination]) => ({
      source,
      destination,
    }));
  },
};

export default nextConfig;
