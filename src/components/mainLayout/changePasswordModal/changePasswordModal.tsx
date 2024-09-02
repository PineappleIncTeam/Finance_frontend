"use client";

import { useEffect } from "react";

import { useScrollLock } from "../../../hooks/useScrollLock";

import { IChangePasswordModal } from "../../../types/common/ComponentsProps";

import style from "./changePasswordModal.module.scss";

const ChangePasswordModal = ({ open }: IChangePasswordModal) => {
	const lockScroll = useScrollLock(open);

	useEffect(() => {
		lockScroll();
	}, [lockScroll]);

	return (
		<>
			<dialog open={open} className={style.backgroundModal}>
				<div onClick={(e) => e.stopPropagation()} role="textbox" className={style.changePasswordResponseModalWrap}>
					<div className={style.changePasswordResponseModalContainer}>
						<h1 className={style.changePasswordResponseModalContainer__title}>Новый пароль успешно сохранен !</h1>
						<p className={style.changePasswordResponseModalContainer__subtitle}>
							Теперь вы можете войти в приложение с использованием своих обновленных учетных данных.
						</p>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default ChangePasswordModal;
