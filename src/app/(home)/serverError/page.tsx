import Image from "next/image";

import manHoldingDisconnection from "../../../assets/pages/serverError/manHoldingDisconnection.webp";

import styles from "./serverError.module.scss";

function ServerErrorPage() {
	return (
		<div className={styles.serverErrorWrap}>
			<Image className={styles.manHoldingDisconnection} src={manHoldingDisconnection} alt="man holding disconnection" />
			<div className={styles.serverErrorContainer}>
				<h1 className={styles.serverErrorContainer__title}>Ошибка на сервере...</h1>
				<p className={styles.serverErrorContainer__subtitle}>
					Приложение еще активно разрабатывается и ошибки случаются...
				</p>
				<p className={styles.serverErrorContainer__subtitle}>
					Пока Вы это читаете, по тревоге были подняты наши программисты и администраторы, которые уже прочитали
					подробный отчет об этой ошибке и приступили к ее устранению.
				</p>
				<p className={styles.serverErrorContainer__subtitle}>В ближайшее время она будет исправлена!</p>
			</div>
		</div>
	);
}

export default ServerErrorPage;
