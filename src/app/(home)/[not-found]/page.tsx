import Image from "next/image";
import Link from "next/link";

import meditatingMan from "../../../assets/pages/notFound/meditatingMan.png";

import styles from "./page.module.css";

function NotFound() {
	return (
		<main className={styles.notFoundPageWrap}>
			<div className={styles.notFoundPageContainer}>
				<Image className={styles.notFoundPageContainer__meditatingMan} src={meditatingMan} alt="meditating man" />
				<div className={styles.infoContainer}>
					<h1 className={styles.infoContainer__title}>404</h1>
					<p className={styles.infoContainer__subtitle}>Такой страницы у нас нет...</p>
					<p className={styles.infoContainer__subtitle}>Но есть помощник финансового планирования</p>
					<Link href="/LoginPage">
						<button className={styles.infoContainer__navigateAction}>Войти в приложение</button>
					</Link>
				</div>
			</div>
		</main>
	);
}

export default NotFound;
