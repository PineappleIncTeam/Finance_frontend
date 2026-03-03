import withSerwistInit from "@serwist/next";
import { env } from "next-runtime-env";

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const apiUrl = env("NEXT_PUBLIC_BASE_URL");
const oauthUrl = "https://id.vk.ru";

const cspHeader = ` 
	default-src 'self';
	script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
	style-src 'self' 'unsafe-inline';
	img-src 'self' blob: data:;
	font-src 'self';
	object-src 'none';
	base-uri 'self';
	form-action 'self';
	frame-ancestors 'none';
	connect-src 'self' ${apiUrl} ${oauthUrl};
	upgrade-insecure-requests;
`;

const withSerwist = withSerwistInit({
	swSrc: "src/sw.ts",
	swDest: "public/sw.js",
});

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		formats: ["image/avif", "image/webp"],
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "Content-Security-Policy",
						value: cspHeader.replace(/\n/g, ""),
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value:
							"camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), fullscreen=(self)",
					},
				],
			},
		];
	},
};

export default withSerwist(nextConfig);
