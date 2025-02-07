import type { MetadataRoute } from "next"
 
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: [
				"/",
				"/aboutUs",
				"/aboutApp",
				"/blog",
				"/blogPage",
				"/login",
				"/signUp",
				"/userAgreement",
			],
			disallow: [
				"/analytics",
				"/calculator",
				"/costs",
				"/expenses",
				"/profitMoney",
				"/savings",
				"/activate",
				"/changePassword",
				"/newPassword",
				"/serverError",
			],
		},
		sitemap: "https://acme.com/sitemap.xml",
	}
}