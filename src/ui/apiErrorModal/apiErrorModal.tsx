"use client";

import { MouseEvent } from "react";
import Image from "next/image";

import { useLockScroll } from "../../hooks/useLockScroll";

import { IApiErrorModal } from "../../types/common/ComponentsProps";

import warningElement from "../../assets/pages/activate/warning.svg";

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
			case "cors":
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

			case "timeout":
				return (
					<button
						className={styles.apiErrorFooter__actionButton}
						onClick={() => {
							onClose();
							window.dispatchEvent(new CustomEvent("connection-issues"));
						}}>
						Проверить соединение
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

	function renderCloseIcon() {
		return (
			<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
				<path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
			</svg>
		);
	}

	return (
		<div className={styles.apiErrorModalOverlay} onClick={handleOverlayClick} role="textbox">
			<div className={styles.apiErrorModalWrap} role="dialog" aria-labelledby="error-modal-title">
				<div className={styles.apiErrorHeader}>
					<button className={styles.apiErrorHeader__closeButton} onClick={onClose} aria-label="Close error modal">
						{renderCloseIcon()}
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
