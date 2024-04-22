"use client";

import MainHeader from "../components/mainLayout/mainHeader/MainHeader";
import Footer from "../components/mainLayout/footer/Footer";
import Service from "../pages/mainLayout/service/Service";

import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.homePageWrap}>
			<MainHeader />
			<main>
				<Service />
			</main>
			<Footer />
		</div>
	);
}
