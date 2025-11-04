"use client";

import { useAsyncErrorModal } from "../../../../hooks/useAsyncErrorModal";
import { useLockScroll } from "../../../../hooks/useLockScroll";

import ErrorCloseIcon from "../../../../assets/script/errorPage/CloseIcon";

import styles from "./asyncErrorModal.module.scss";

export function AsyncErrorModal() {
	const { isOpen, error, closeModal } = useAsyncErrorModal();

	useLockScroll(isOpen);

	if (!isOpen) return <></>;

	return (
		<div className={styles.asyncErrorModalOverlay} onClick={closeModal} role="textbox">
			<div className={styles.asyncErrorModalWrap} onClick={(e) => e.stopPropagation()} role="textbox">
				<div className={styles.asyncErrorHeader}>
					<button className={styles.asyncErrorHeader__closeButton} onClick={closeModal}>
						<ErrorCloseIcon />
					</button>
					<h2 className={styles.asyncErrorHeader__title}>Ошибка выполнения</h2>
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
				<div className={styles.asyncErrorFooter}>
					<button className={styles.asyncErrorFooter__actionButton} onClick={closeModal}>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	);
}
