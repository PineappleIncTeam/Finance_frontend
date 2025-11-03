"use client";

import { useAsyncErrorModal } from "../../../../hooks/useAsyncErrorModal";
import { useLockScroll } from "../../../../hooks/useLockScroll";

import styles from "./asyncErrorModal.module.scss";

export function AsyncErrorModal() {
	const { isOpen, error, closeModal } = useAsyncErrorModal();

	useLockScroll(isOpen);

	if (!isOpen) return <></>;

	function renderCloseIcon() {
		return (
			<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
				<path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
			</svg>
		);
	}

	return (
		<div className={styles.asyncErrorModalOverlay} onClick={closeModal} role="textbox">
			<div className={styles.asyncErrorModalWrap} onClick={(e) => e.stopPropagation()} role="textbox">
				<div className={styles.asyncErrorHeader}>
					<button className={styles.asyncErrorHeader__closeButton} onClick={closeModal}>
						{renderCloseIcon()}
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
