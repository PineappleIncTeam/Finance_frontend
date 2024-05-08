"use client";

import Link from "next/link";

import Service from "../../pages/homeLayout/service/Service";

import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.homePageWrap}>
			<Link href="/login">LoginPage</Link>
			<div>
				<Service />
				<Link href={"/random"}>random</Link>
			</div>
			<Link href="/serverError/page">ServerErrorPage</Link>
		</div>
	);
}
