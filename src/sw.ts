/* eslint-disable no-magic-numbers */
import { defaultCache } from "@serwist/next/worker";
import { type PrecacheEntry, Serwist, CacheFirst, StaleWhileRevalidate, NetworkOnly, ExpirationPlugin } from "serwist";

declare const self: any & {
	__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: [
		// 1. Статические ресурсы: CacheFirst (для повышения производительности)
		{
			matcher: /\.(?:js|css|woff2?|png|jpg|jpeg|svg|webp|ico|json)$/,
			handler: new CacheFirst({
				cacheName: "static-assets",
				plugins: [
					new ExpirationPlugin({
						maxEntries: 100,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
					}),
				],
			}),
		},
		// 2. Публичные страницы (блог, о нас): StaleWhileRevalidate
		{
			matcher: /\/(?:blog|blogPage|aboutUs|aboutApp)(?:\/.*)?$/,
			handler: new StaleWhileRevalidate({
				cacheName: "public-pages-cache",
				plugins: [
					new ExpirationPlugin({
						maxEntries: 50,
						maxAgeSeconds: 24 * 60 * 60, // 24 hours
					}),
				],
			}),
		},
		// 3. Страницы аутентификации/восстановления: NetworkOnly
		{
			matcher: /\/(?:login|signUp|changePassword|newPassword|activate)(?:\/.*)?$/,
			handler: new NetworkOnly(),
		},
		// 4. API запросы (Private/Fintech): NetworkOnly
		{
			matcher: ({ url }) => url.pathname.includes("/api/v1/"),
			handler: new NetworkOnly(),
		},
		// Правила кэширования по умолчанию для других ресурсов Next.js
		...defaultCache,
	],
	fallbacks: {
		entries: [
			{
				url: "/offline",
				matcher({ request }) {
					return request.destination === "document";
				},
			},
		],
	},
});

serwist.addEventListeners();
