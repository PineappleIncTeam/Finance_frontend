"use client";

import Image from "next/image";

import Link from "next/link";

import { useState } from "react";

import cn from "classnames";

import { Button } from "../../../ui/button/button";
import { MainPath } from "../../../services/router/routes";
import closeIcon from "../../../assets/pages/mainPage/closeIcon.svg";

import styles from "./popupWindow.module.scss";

const PopupWindow = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<div className={cn(styles.popupContainer, { [styles.popupContainer_hidden]: !isOpen })}>
			<div className={styles.infoBlock}>
				<div className={styles.infoBlock__titleBlock}>
					<h3 className={styles.infoBlock__title}>Файлы cookies</h3>
					<button type="button" className={styles.infoBlock__button} onClick={() => setIsOpen(false)}>
						<Image src={closeIcon} alt="крестик" />
					</button>
				</div>
				<div className={styles.infoBlock__subtitle}>
					Все на сайте — для вас,{" "}
					<a
						href="https://ru.wikipedia.org/wiki/Cookie"
						target="_blank"
						rel="noreferrer"
						className={styles.infoBlock__link}>
						«cookies»
					</a>{" "}
					— для нас. Собираем их, чтобы сделать наш сайт еще удобнее. Ограничить или настроить их можно в браузере.
				</div>
				<Link href={MainPath.SignUp}>
					<Button content="Регистрация" styleName="buttonForRegistration" />
				</Link>
			</div>
		</div>
	);
};

export default PopupWindow;
