import { IInactivityLogoutModal } from "../../../types/components/ComponentsTypes";

import styles from "./inactivityLogoutModal.module.scss";

export default function InactivityLogoutModal({ open }: IInactivityLogoutModal) {
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.modalContainer}>
				<p className={styles.modalContainer__subtitle}>Вы всё ещё здесь?</p>
				<p className={styles.modalContainer__subtitle}>
					Поскольку не было никаких действий в приложении, выход будет произведён менее чем через 2 минуты. Вы хотите
					остаться?
				</p>
			</div>
		</dialog>
	);
}
