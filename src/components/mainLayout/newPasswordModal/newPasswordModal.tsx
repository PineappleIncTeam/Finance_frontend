"use client";

import { useEffect } from "react";

import { useScrollLock } from "../../../hooks/useScrollLock";

import { INewPasswordModal } from "../../../types/common/ComponentsProps";

import style from "./newPasswordModal.module.scss";

const NewPasswordModal = ({ email, open, toggle }: INewPasswordModal) => {
	const lockScroll = useScrollLock(open);

	useEffect(() => {
		lockScroll();
	}, [lockScroll]);

	return (
		<>
			<dialog open={open} className={style.backgroundModal}>
				<div onClick={(e) => e.stopPropagation()} role="textbox" className={style.newPasswordResponseModalWrap}>
					<div className={style.newPasswordResponseModalContainer}>
						<h1 className={style.newPasswordResponseModalContainer__title}>Письмо отправлено</h1>
						<p className={style.newPasswordResponseModalContainer__subtitle}>
							На адрес {email} выслано письмо со ссылкой для восстановления доступа.{" "}
						</p>
						<p className={style.newPasswordResponseModalContainer__subtitle}>
							В случае, если не нашли письма, проверьте папку «Спам» и правильность введенного адреса.
						</p>
						<button className={style.repeatSendButton} type="button" onClick={toggle}>
							Повторить отправку
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default NewPasswordModal;
