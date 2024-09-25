"use client";

import Link from "next/link";

import styles from "./privateProfile.module.scss";

function PrivateProfile() {
	return (
		<div className={styles.privateProfileWrap}>
			<Link href="/profitArea">profitArea</Link>
			<main>Main</main>
		</div>
	);
}

export default PrivateProfile;
