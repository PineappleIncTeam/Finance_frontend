/* eslint-disable camelcase */
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Freenance",
		short_name: "Freenance",
		description: "Manage your finances easily and conveniently with Freenance.",
		start_url: "/",
		scope: "/",
		display: "standalone",
		orientation: "portrait",
		background_color: "#ffffff",
		theme_color: "#1a572e",
		lang: "ru",
		categories: ["finance", "productivity"],
		icons: [
			{
				src: "/icon-192.png",
				sizes: "192x192",
				type: "image/png",
			},
		],
	};
}
