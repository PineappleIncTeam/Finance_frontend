"use client";

import { useLockScroll } from "../../../../hooks/useLockScroll";

import { IPrivateRouteErrorModal } from "../../../../types/common/ComponentsProps";

import styles from "./privateRouteErrorModal.module.scss";

export function PrivateRouteErrorModal({ isOpen, closeModal }: IPrivateRouteErrorModal) {
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
		<div className={styles.privateRouteModalOverlay} onClick={closeModal} role="textbox">
			<div className={styles.privateRouteModalWrap} onClick={(e) => e.stopPropagation()} role="textbox">
				<div className={styles.privateRouteHeader}>
					<button className={styles.privateRouteHeader__closeButton} onClick={closeModal}>
						{renderCloseIcon()}
					</button>
					<h2 className={styles.privateRouteHeader__title}>Ошибка авторизации</h2>
				</div>
				<div className={styles.errorContentWrap}>
					<p className={styles.errorContentWrap__title}>Для доступа в приложение требуется пройти авторизацию!</p>
				</div>
				<div className={styles.privateRouteFooter}>
					<button className={styles.privateRouteFooter__actionButton} onClick={closeModal}>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	);
}
