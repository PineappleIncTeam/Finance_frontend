import Image from "next/image";
import Link from "next/link";

import { MainPath } from "../../../services/router/routes";

import meditatingMan from "../../../assets/pages/notFound/meditatingMan.webp";

import Button from "../../../ui/appButton/button";

import styles from "./notFound.module.scss";

function NotFound() {
	return (
		<main className={styles.notFoundPageWrap}>
			<div className={styles.notFoundPageContainer}>
				<Image className={styles.notFoundPageContainer__meditatingMan} src={meditatingMan} alt="meditating man" />
				<div className={styles.infoContainer}>
					<h1 className={styles.infoContainer__title}>404</h1>
					<p className={styles.infoContainer__subtitle}>Такой страницы у нас нет...</p>
					<p className={styles.infoContainer__subtitle}>Но есть помощник финансового планирования</p>
					<Link href={MainPath.Login} className={styles.infoContainer__navigateAction}>
						<Button variant={"notification"} className={styles.button} isLarge>
							Войти в приложение
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}

export default NotFound;
