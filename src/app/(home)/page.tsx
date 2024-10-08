import Service from "../../pages/homeLayout/service/service";

import Footer from "../../pages/homeLayout/footer/footer";

import styles from "./mainPage.module.scss";

function MainPage() {
	return (
		<>
			<main className={styles.mainPageWrap}>
				<Service />
				<Footer />
			</main>
		</>
	);
}

export default MainPage;
