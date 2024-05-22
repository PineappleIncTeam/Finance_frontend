import Service from "../../pages/homeLayout/service/service";

import Footer from "../../pages/homeLayout/footer/footer";

import PopupWindow from "../../pages/homeLayout/popupWindow/popupWindow";

import styles from "./mainPage.module.scss";

export default function MainPage() {
	return (
		<>
			<main className={styles.mainPageWrap}>
				<Service />
				<Footer />
			</main>
			<PopupWindow />
		</>
	);
}
