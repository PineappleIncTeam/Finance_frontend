import { ButtonType } from "../../../helpers/buttonFieldValues";
import { IInactivityLogoutModal } from "../../../types/components/ComponentsTypes";
import Button from "../../../ui/Button/Button";

import styles from "./inactivityLogoutModal.module.scss";

export default function InactivityLogoutModal({ open }: IInactivityLogoutModal) {
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.modalContainer}>
				<p className={styles.modalContainer__title}>Вы всё ещё здесь?</p>
				<p className={styles.modalContainer__subtitle}>
					Поскольку не было никаких действий в приложении, выход будет произведён менее чем через 2 минуты. Вы хотите
					остаться?
				</p>
				<div className={styles.buttonsContainer}>
					<Button variant={ButtonType.Contained} onClick={() => undefined}>
						Выйти
					</Button>
					<Button variant={ButtonType.Outlined} onClick={() => undefined}>
						Остаться
					</Button>
				</div>
			</div>
		</dialog>
	);
}
