"use client";

import { useState } from "react";

import cn from "classnames";

import Button from "../../../ui/button/button";
import { cookieLinkTitle } from "../../../mocks/cookiePopupWindow";

import useAppSelector from "../../../hooks/useAppSelector";
import cookieStatusSelector from "../../../services/redux/features/cookieStatus/cookieStatusSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { setCookieStatus } from "../../../services/redux/features/cookieStatus/cookieStatusSlice";

import styles from "./cookiePopupWindowPage.module.scss";

const CookiePopupWindowPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const dispatch = useAppDispatch();

	const { status } = useAppSelector(cookieStatusSelector);

	const handleClick = () => {
		setIsOpen(false);
		dispatch(setCookieStatus("rejected"));
	};

	return (
		<div
			className={cn(styles.popupContainer, { [styles.popupContainer_hidden]: status === "confirmed" || !isOpen })}
			onClick={handleClick}
			role="button">
			<div className={styles.textContentBlock} onClick={(e) => e.stopPropagation()} role="button">
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
				<Button
					content="Хорошо, принимаю"
					styleName="buttonConfirmCookies"
					onClick={() => dispatch(setCookieStatus("confirmed"))}
				/>
			</div>
		</div>
	);
};

export default CookiePopupWindowPage;
