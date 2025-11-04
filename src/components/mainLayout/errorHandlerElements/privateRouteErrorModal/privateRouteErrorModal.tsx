"use client";

import { useLockScroll } from "../../../../hooks/useLockScroll";

import { IPrivateRouteErrorModal } from "../../../../types/common/ComponentsProps";

import ErrorCloseIcon from "../../../../assets/script/errorPage/CloseIcon";

import styles from "./privateRouteErrorModal.module.scss";

export function PrivateRouteErrorModal({ isOpen, closeModal }: IPrivateRouteErrorModal) {
	useLockScroll(isOpen);

	if (!isOpen) return <></>;

	return (
		<div className={styles.privateRouteModalOverlay} onClick={closeModal} role="textbox">
			<div className={styles.privateRouteModalWrap} onClick={(e) => e.stopPropagation()} role="textbox">
				<div className={styles.privateRouteHeader}>
					<button className={styles.privateRouteHeader__closeButton} onClick={closeModal}>
						<ErrorCloseIcon />
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
