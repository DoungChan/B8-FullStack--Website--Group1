const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "promo-kh.s3.amazonaws.com",
      "promo-kh.s3.ap-southeast-1.amazonaws.com",
      "promo-kh.s3-ap-southeast-1.amazonaws.com",
    ],
  },
  env: {
    NEXT_SERVER_SIDE_API_URL: process.env.SERVER_SIDE_API_URL,
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_TOKEN: process.env.API_TOKEN,
    NEXT_PUBLIC_DOMIAN_URL: process.env.DOMIAN_URL,
  },
};

module.exports = nextConfig;
