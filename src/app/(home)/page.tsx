import Service from "../../pageElements/homeLayout/service/service";

import Footer from "../../components/mainLayout/footer/footer";

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
