import "../reset.css";
import "../globals.css";

import MainHeader from "../../components/mainLayout/mainHeader/MainHeader";

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
				<MainHeader />
				{children}
			</body>
		</html>
	);
}
