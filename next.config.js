/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_TOKEN: process.env.API_TOKEN,
  },
};
