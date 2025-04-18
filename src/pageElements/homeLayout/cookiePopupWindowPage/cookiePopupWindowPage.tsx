"use client";

import { useState } from "react";
import cn from "classnames";
import Link from "next/link";

import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";

import { MainPath } from "../../../services/router/routes";
import { setCookieStatus } from "../../../services/redux/features/cookieStatus/cookieStatusSlice";
import cookieStatusSelector from "../../../services/redux/features/cookieStatus/cookieStatusSelector";
import Button from "../../../ui/Button/button";
import { ButtonType } from "../../../helpers/buttonFieldValues";
import { InputTypeList } from "../../../helpers/Input";

import styles from "./cookiePopupWindowPage.module.scss";

const CookiePopupWindowPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const dispatch = useAppDispatch();
	const { cookieStatus } = useAppSelector(cookieStatusSelector);

	const handleClick = () => {
		setIsOpen(false);
		dispatch(setCookieStatus("rejected"));
	};

	return (
		<div
			className={cn(styles.popupContainer, {
				[styles.popupContainer_hidden]: cookieStatus === "confirmed" || !isOpen,
			})}
			onClick={handleClick}
			role="button">
			<div className={styles.textContentBlock} onClick={(e) => e.stopPropagation()} role="button">
				<div className={styles.textContentBlock__titleBlock}>
					<h3 className={styles.textContentBlock__title}>Файлы cookies</h3>
				</div>
				<div className={styles.textContentBlock__subtitle}>
					Все на сайте — для вас,{" "}
					<Link href={MainPath.UserAgreement} className={styles.textContentBlock__link} onClick={handleClick}>
						«cookies»
					</Link>{" "}
					— для нас. Собираем их, чтобы сделать наш сайт еще удобнее. Ограничить или настроить их можно в браузере.
				</div>
				<Button
					variant={ButtonType.Outlined}
					onClick={() => dispatch(setCookieStatus("confirmed"))}
					className={styles.textContentBlock__button}
					type={InputTypeList.Button}
					isLarge>
					Хорошо, принимаю
				</Button>
			</div>
		</div>
	);
};

export default CookiePopupWindowPage;
