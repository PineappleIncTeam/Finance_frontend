"use client";

import { useState } from "react";
import cn from "classnames";

import Button from "../../../ui/button/button";
import { cookieLinkTitle } from "../../../mocks/cookiePopupWindow";

import styles from "./cookiePopupWindow.module.scss";

const CookiePopupWindow = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<div
			className={cn(styles.popupContainer, { [styles.popupContainer_hidden]: !isOpen })}
			onClick={() => setIsOpen(false)}>
			<div className={styles.textContentBlock} onClick={(e) => e.stopPropagation()}>
				<div className={styles.textContentBlock__titleBlock}>
					<h3 className={styles.textContentBlock__title}>Файлы cookies</h3>
				</div>
				<div className={styles.textContentBlock__subtitle}>
					Все на сайте — для вас,{" "}
					<a href={cookieLinkTitle} target="_blank" rel="noreferrer" className={styles.textContentBlock__link}>
						«cookies»
					</a>{" "}
					— для нас. Собираем их, чтобы сделать наш сайт еще удобнее. Ограничить или настроить их можно в браузере.
				</div>
				<Button content="Хорошо, принимаю" styleName="buttonConfirmCookies" onClick={() => setIsOpen(false)} />
			</div>
		</div>
	);
};

export default CookiePopupWindow;
