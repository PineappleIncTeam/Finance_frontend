"use client";

import { IChangePasswordModal } from "../../../types/common/ComponentsProps";

import { useLockScroll } from "../../../hooks/useLockScroll";

import styles from "./changePasswordModal.module.scss";

const ChangePasswordModal = ({ open }: IChangePasswordModal) => {
	useLockScroll(open);

	return (
		<>
			<dialog open={open} className={styles.backgroundModal}>
				<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.changePasswordResponseModalWrap}>
					<div className={styles.changePasswordResponseModalContainer}>
						<h1 className={styles.changePasswordResponseModalContainer__title}>Новый пароль успешно сохранен !</h1>
						<p className={styles.changePasswordResponseModalContainer__subtitle}>
							Теперь вы можете войти в приложение с использованием своих обновленных учетных данных.
						</p>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default ChangePasswordModal;
