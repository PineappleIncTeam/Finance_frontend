import "../reset.css";
import "../globals.css";

import UserProfileHeader1 from "../../components/userProfileLayout/userProfileHeader/userProfileHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "freenance",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<UserProfileHeader1 />
				{children}
			</body>
		</html>
	);
}
