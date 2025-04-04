import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.module.scss": {
          loaders: ["sass-loader"],
          as: "*.module.css",
      },
      }
    }
  }
};

export default nextConfig;
