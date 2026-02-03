import Image from "next/image";

import { ButtonType } from "../../../helpers/buttonFieldValues";
import { IPwaErrorModal } from "../../../types/components/ComponentsTypes";
import Button from "../../../ui/Button/Button";

import warning from "../../../assets/pages/activate/warning.svg";

import styles from "./pwaErrorModal.module.scss";

function PwaErrorModal({ open, titleType = "1", toggle }: IPwaErrorModal) {
	const titleList = [
		"Приложение уже установлено на вашем устройстве.",
		"Приложение уже установлено на вашем устройстве или установка PWA пока недоступна. Попробуйте позже или проверьте настройки браузера.",
	];

	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.modalContainer}>
				<div className={styles.iconContainer}>
					<Image src={warning} alt="иконка" className={styles.iconContainer__icon} />
				</div>
				<p className={styles.modalContainer__title}>Установка PWA приложения</p>
				<p className={styles.modalContainer__subtitle}>{titleType === "1" ? titleList[0] : titleList[1]}</p>
				<div className={styles.buttonsContainer}>
					<Button variant={ButtonType.Outlined} onClick={() => toggle(false)}>
						{"Хорошо"}
					</Button>
				</div>
			</div>
		</dialog>
	);
}

export default PwaErrorModal;
