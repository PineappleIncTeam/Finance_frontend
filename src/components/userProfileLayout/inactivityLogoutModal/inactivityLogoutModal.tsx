import { useEffect, useState } from "react";

import { ButtonType } from "../../../helpers/buttonFieldValues";
import { IInactivityLogoutModal } from "../../../types/components/ComponentsTypes";
import Button from "../../../ui/Button/Button";

import styles from "./inactivityLogoutModal.module.scss";

export default function InactivityLogoutModal({ open, onStayClick, onLogoutClick }: IInactivityLogoutModal) {
	const initialValue: number = 60;
	const [time, setTime] = useState<number>(initialValue);
	const interval: number = 1000;
	const inMinuteSeconds: number = 60;

	useEffect(() => {
		if (time <= 0) {
			return;
		}
		const intervalId: NodeJS.Timeout = setInterval(() => {
			setTime(time - 1);
		}, interval);

		return () => clearInterval(intervalId);
	}, [time]);

	const formatTime = (seconds: number) => {
		const minutes: number = Math.floor(seconds / inMinuteSeconds);
		const remainingSeconds: number = seconds % inMinuteSeconds;
		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.modalContainer}>
				<p className={styles.modalContainer__title}>Вы всё ещё здесь?</p>
				<p className={styles.modalContainer__subtitle}>
					Поскольку не было никаких действий в приложении, выход будет произведён менее чем через 1 минуту. Вы хотите
					остаться?
				</p>
				<p className={styles.modalContainer__timer}>{formatTime(time)}</p>
				<div className={styles.buttonsContainer}>
					<Button variant={ButtonType.Contained} onClick={() => onLogoutClick()}>
						Выйти
					</Button>
					<Button variant={ButtonType.Outlined} onClick={() => onStayClick()}>
						Остаться
					</Button>
				</div>
			</div>
		</dialog>
	);
}
