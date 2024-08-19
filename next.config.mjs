/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_BACKEND_API_URL: process.env.NEXT_BACKEND_API_URL,
    NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
  },
  images: {
    domains: ['localhost', 'muttakibucket.s3.us-east-1.amazonaws.com'],
  },
};

export default nextConfig;
