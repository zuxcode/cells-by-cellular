import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/dashboard/settings",
        destination: "/dashboard/settings/user-profile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
