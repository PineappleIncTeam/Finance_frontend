import Image from "next/image";

import { Button } from "../../../ui/button/button";
import closeIcon from "../../../assets/pages/mainPage/closeIcon.svg";

import styles from "./popupWindow.module.scss";

const PopupWindow = () => {
	return (
		<div className={styles.popupContainer}>
			<div className={styles.infoBlock}>
				<div className={styles.infoBlock__titleBlock}>
					<h3 className={styles.infoBlock__title}>Файлы cookies</h3>
					<button type="button">
						<Image src={closeIcon} alt="крестик" />
					</button>
				</div>
				<div className={styles.infoBlock__subtitle}>
					Все на сайте — для вас, <span className={styles.infoBlock__subtitle_green}>«cookies»</span> — для нас.
					Собираем их, чтобы сделать наш сайт еще удобнее. Ограничить или настроить их можно в браузере.
				</div>
				<Button content="Регистрация" styleName="buttonForRegistration" />
			</div>
		</div>
	);
};

export default PopupWindow;
