<<<<<<< HEAD
import {withSentryConfig} from "@sentry/nextjs";
=======
import withSerwistInit from "@serwist/next";
>>>>>>> 0ba0aeeb (feat: add and configure pwa service worker library)

import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

<<<<<<< HEAD
export default withSentryConfig(nextConfig, {
  org: "pineappleinc",
  project: "fintech-frnn-fe-proj",
  silent: !process.env.CI,
  widenClientFileUpload: false,
  // tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: false
});
=======
export default withSerwist(nextConfig);
>>>>>>> 0ba0aeeb (feat: add and configure pwa service worker library)
