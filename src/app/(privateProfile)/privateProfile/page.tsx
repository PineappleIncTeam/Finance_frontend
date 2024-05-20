"use client";

import Link from "next/link";

import styles from "./privateProfile.module.scss";

export default function PrivateProfile() {
	return (
		<div className={styles.privateProfileWrap}>
			<Link href="/profitArea">profitArea</Link>
			<main>Main</main>
		</div>
	);
}
