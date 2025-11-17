import {withSentryConfig} from "@sentry/nextjs";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
  org: "pineappleinc",
  project: "fintech-frnn-fe-proj",
  silent: !process.env.CI,
  widenClientFileUpload: false,
  // tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: false
});