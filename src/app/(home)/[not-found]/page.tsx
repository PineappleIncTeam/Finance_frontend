import Image from "next/image";

import meditatingMan from "../../../assets/pages/notFound/meditatingMan.png";

import styles from "./page.module.css";

function NotFound() {
	return (
		<main className={styles.notFoundPageWrap}>
			<div className={styles.notFoundPageContainer}>
				<Image className={styles.notFoundPageContainer__image} src={meditatingMan} alt="meditating man" />
				<div className={styles.titleContainer}>
					<h1 className={styles.titleContainer__title}>404</h1>
					<p className={styles.titleContainer__subtitle}>Такой страницы у нас нет...</p>
					<p className={styles.titleContainer__subtitle}>Но есть помощник финансового планирования</p>
					<button className={styles.titleContainer__navigateAction}>Войти в приложение</button>
				</div>
			</div>
		</main>
	);
}

export default NotFound;
