"use client";

import { MouseEvent } from "react";
import Image from "next/image";

import { useLockScroll } from "../../../../hooks/useLockScroll";

import { IApiErrorModal } from "../../../../types/common/ComponentsProps";

import warningElement from "../../../../assets/pages/activate/warning.svg";
import ErrorCloseIcon from "../../../../assets/script/errorPage/CloseIcon";

import styles from "./apiErrorModal.module.scss";

export default function ApiErrorModal({ modalState, onClose }: IApiErrorModal) {
	const { isOpen, title, message, errorType } = modalState;

	useLockScroll(isOpen);

	const secondsCount = 300;

	const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	if (!isOpen) return null;

	const getActionButton = () => {
		switch (errorType) {
			case "403":
				return (
					<button
						className={styles.apiErrorFooter__actionButton}
						onClick={() => {
							onClose();
							window.location.href = "/";
						}}>
						На главную
					</button>
				);
			case "408":
				return (
					<button
						className={styles.apiErrorFooter__actionButton}
						onClick={() => {
							onClose();
							setTimeout(() => window.location.reload(), secondsCount);
						}}>
						Перезагрузить страницу
					</button>
				);
			case "429":
				return (
					<button
						className={styles.apiErrorFooter__actionButton}
						onClick={() => {
							onClose();
							setTimeout(() => window.location.reload(), secondsCount);
						}}>
						Перезагрузить страницу
					</button>
				);

			case "500":
				return (
					<button
						className={styles.apiErrorFooter__actionButton}
						onClick={() => {
							onClose();
							window.location.href = "/";
						}}>
						На главную
					</button>
				);
			case "502":
				return (
					<button
						className={styles.apiErrorFooter__actionButton}
						onClick={() => {
							onClose();
							setTimeout(() => window.location.reload(), secondsCount);
						}}>
						Перезагрузить страницу
					</button>
				);
			case "503":
				return (
					<button
						className={styles.apiErrorFooter__actionButton}
						onClick={() => {
							onClose();
							window.location.href = "/";
						}}>
						На главную
					</button>
				);
			case "504":
				return (
					<button
						className={styles.apiErrorFooter__actionButton}
						onClick={() => {
							onClose();
							setTimeout(() => window.location.reload(), secondsCount);
						}}>
						Перезагрузить страницу
					</button>
				);
			default:
				return (
					<button className={styles.apiErrorFooter__actionButton} onClick={onClose}>
						Ещё раз
					</button>
				);
		}
	};

	return (
		<div className={styles.apiErrorModalOverlay} onClick={handleOverlayClick} role="textbox">
			<div className={styles.apiErrorModalWrap} role="dialog" aria-labelledby="error-modal-title">
				<div className={styles.apiErrorHeader}>
					<button className={styles.apiErrorHeader__closeButton} onClick={onClose} aria-label="Close error modal">
						<ErrorCloseIcon />
					</button>
					<div className={styles.apiErrorHeader__iconContainer}>
						<Image src={warningElement} alt={"warning"} className={styles.icon} />
					</div>
					<h2 id="error-modal-title" className={styles.apiErrorHeader__title}>
						{title}
					</h2>
				</div>

				<div className={styles.apiErrorContent}>
					<p className={styles.apiErrorContent__message}>{message}</p>
				</div>

				<div className={styles.apiErrorFooter}>
					{getActionButton()}
					<button className={styles.apiErrorFooter__secondaryButton} onClick={onClose}>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	);
}
