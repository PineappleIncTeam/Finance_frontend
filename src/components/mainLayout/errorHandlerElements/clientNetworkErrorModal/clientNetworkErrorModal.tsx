"use client";

import { useClientNetworkErrorModal } from "../../../../hooks/useClientNetworkErrorModal";
import { useLockScroll } from "../../../../hooks/useLockScroll";

import ErrorCloseIcon from "../../../../assets/script/errorPage/CloseIcon";

import styles from "./clientNetworkErrorModal.module.scss";

export function ClientNetworkErrorModal() {
	const { isOpen, error, closeModal } = useClientNetworkErrorModal();

	useLockScroll(isOpen);

	if (!isOpen) return <></>;

	return (
		<div className={styles.clientNetworkErrorModalOverlay} onClick={closeModal} role="textbox">
			<div className={styles.clientNetworkErrorModalWrap} onClick={(e) => e.stopPropagation()} role="textbox">
				<div className={styles.clientNetworkErrorHeader}>
					<button className={styles.clientNetworkErrorHeader__closeButton} onClick={closeModal}>
						<ErrorCloseIcon />
					</button>
					<h2 className={styles.clientNetworkErrorHeader__title}>Ошибка сети во время выполнения</h2>
				</div>
				<div className={styles.errorContentWrap}>
					<p className={styles.errorContentWrap__errorMessage}>
						<strong>Сообщение: </strong>
						{error?.message}
					</p>
					{error?.stack && (
						<div className={styles.stackTraceWrap}>
							<strong className={styles.stackTraceWrap__title}>Стек вызовов:</strong>
							<pre className={styles.stackTraceWrap__preSubtitle}>{error.stack}</pre>
						</div>
					)}
				</div>
				<div className={styles.clientNetworkErrorFooter}>
					<button className={styles.clientNetworkErrorFooter__actionButton} onClick={closeModal}>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	);
}
