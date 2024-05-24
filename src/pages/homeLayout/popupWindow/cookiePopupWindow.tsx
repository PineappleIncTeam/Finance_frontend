"use client";

import Image from "next/image";

import Link from "next/link";

import { useState } from "react";

import cn from "classnames";

import { Button } from "../../../ui/button/button";
import { MainPath } from "../../../services/router/routes";
import { cookieLinkTitle } from "../../../mocks/cookiePopupWindow";
import closeIcon from "../../../assets/pages/mainPage/closeIcon.svg";

import styles from "./cookiePopupWindow.module.scss";

const CookiePopupWindow = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<div className={cn(styles.popupContainer, { [styles.popupContainer_hidden]: !isOpen })}>
			<div className={styles.textContentBlock}>
				<div className={styles.textContentBlock__titleBlock}>
					<h3 className={styles.textContentBlock__title}>Файлы cookies</h3>
					<button type="button" className={styles.textContentBlock__action} onClick={() => setIsOpen(false)}>
						<Image src={closeIcon} alt="крестик" />
					</button>
				</div>
				<div className={styles.textContentBlock__subtitle}>
					Все на сайте — для вас,{" "}
					<a
						href={cookieLinkTitle}
						target="_blank"
						rel="noreferrer"
						className={styles.textContentBlock__link}>
						«cookies»
					</a>{" "}
					— для нас. Собираем их, чтобы сделать наш сайт еще удобнее. Ограничить или настроить их можно в браузере.
				</div>
				<Link href={MainPath.SignUp} className={styles.textContentBlock__linkButton}>
					<Button content="Регистрация" styleName="buttonForRegistration" />
				</Link>
			</div>
		</div>
	);
};

export default CookiePopupWindow;
