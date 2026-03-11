"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "../../../ui/Button/Button";
import { MainPath } from "../../../services/router/routes";

import manHoldingDisconnection from "../../../assets/pages/serverError/manHoldingDisconnection.webp";

import styles from "./offlinePage.module.scss";

export default function OfflinePage() {
	const router = useRouter();

	function handleOfflineClick() {
		return router.push(MainPath.Main);
	}

	return (
		<div className={styles.offlinePageWrap}>
			<Image className={styles.manHoldingDisconnection} src={manHoldingDisconnection} alt="man holding disconnection" />
			<div className={styles.offlinePageContainer}>
				<h1 className={styles.offlinePageContainer__title}>Нет соединения с сервером...</h1>
				<p className={styles.offlinePageContainer__subtitle}>
					Пожалуйста, проверьте ваше интернет-соединение и попробуйте ещё раз....
				</p>
				<Button variant="outlined" className={styles.offlinePageContainer__actionElement} onClick={handleOfflineClick}>
					Вернуться на главную
				</Button>
			</div>
		</div>
	);
}
