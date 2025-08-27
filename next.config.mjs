/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "truenorthmonitoringbucket.s3.ca-central-1.amazonaws.com",
      },
    ],
  },
  
};

export default nextConfig;
