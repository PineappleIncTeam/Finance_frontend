"use client";

import Link from "next/link";

// import Main from "./main/page";

import styles from "./page.module.css";

export default function PrivateProfile() {
	return (
		<div className={styles.homePageWrap}>
			<Link href="/profitArea">profitArea</Link>
			<main>Main</main>
		</div>
	);
}
