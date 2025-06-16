import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.module.scss": {
        loaders: ["sass-loader"],
        as: "*.module.css",
      },
    }
  }
};

export default nextConfig;
