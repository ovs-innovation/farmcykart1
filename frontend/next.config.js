const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
  scope: "/",
  sw: "service-worker.js",
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  turbopack: {},
  images: {
    domains: ["res.cloudinary.com", "i.postimg.cc"],
  },

  i18n: {
    locales: ["en", "es", "fr", "de"],
    defaultLocale: "en",
  },
};

module.exports = withPWA(nextConfig);
