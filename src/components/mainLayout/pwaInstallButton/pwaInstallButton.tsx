"use client";

import { useActions } from "../../../services/redux/hooks";
import { useAppSelector } from "../../../services/redux/hooks/useAppSelector";

import Button from "../../../ui/Button/Button";
import { pwaDetailsSelector } from "../../../services/redux/features/pwaDetails/pwaDetailsSelector";

import styles from "./pwaInstallButton.module.scss";

export default function PWAInstallButton() {
	const { setIsPWAInstalled } = useActions();

	const { isInstalled: isInstalledFromRedux } = useAppSelector(pwaDetailsSelector);

	const triggerNativeInstall = async () => {
		if (isInstalledFromRedux) {
			return;
		}

		const deferredPrompt = window.deferredPWAEvent;

		if (!deferredPrompt) {
			return;
		}

		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === "accepted") {
			window.deferredPWAEvent = null;

			setIsPWAInstalled(true);
		}
	};

	return (
		<div className={styles.pwaInstallButtonWrap}>
			<Button variant="contained" onClick={triggerNativeInstall} className={styles.pwaInstallButtonContainer}>
				Установить приложение
			</Button>
		</div>
	);
}
