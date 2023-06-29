/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "promo-kh.s3.amazonaws.com",
      "promo-kh.s3.ap-southeast-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig
