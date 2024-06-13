import Service from "../../pages/homeLayout/service/service1";

import Footer from "../../pages/homeLayout/footer/footer";

import styles from "./mainPage.module.scss";

export default function MainPage() {
	return (
		<>
			<main className={styles.mainPageWrap}>
				<Service />
				<Footer />
			</main>
		</>
	);
}
