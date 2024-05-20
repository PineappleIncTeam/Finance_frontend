"use client";

import Link from "next/link";

import Service from "../../pages/homeLayout/service/service1";

import { MainPath } from "../../services/router/routes";

import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.homePageWrap}>
			<Link href="/login">LoginPage</Link>
			<div>
				<Service />
				<Link href={"/random"}>random</Link>
			</div>
			<Link href={MainPath.ServerError}>ServerErrorPage</Link>
		</div>
	);
}
