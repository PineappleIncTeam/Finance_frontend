"use client";

import { INewPasswordModal } from "../../../types/common/ComponentsProps";
import { InputTypeList } from "../../../helpers/Input";
import { useLockScroll } from "../../../hooks/useLockScroll";

import styles from "./newPasswordModal.module.scss";

const NewPasswordModal = ({ email, open, toggle }: INewPasswordModal) => {
	useLockScroll(open);

	return (
		<>
			<dialog open={open} className={styles.backgroundModal}>
				<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.newPasswordResponseModalWrap}>
					<div className={styles.newPasswordResponseModalContainer}>
						<h1 className={styles.newPasswordResponseModalContainer__title}>Письмо отправлено</h1>
						<p className={styles.newPasswordResponseModalContainer__subtitle}>
							На адрес {email} выслано письмо со ссылкой для восстановления доступа.{" "}
						</p>
						<p className={styles.newPasswordResponseModalContainer__subtitle}>
							В случае, если не нашли письма, проверьте папку «Спам» и правильность введенного адреса.
						</p>
						<button className={styles.repeatSendButton} type={InputTypeList.Button} onClick={toggle}>
							Повторить отправку
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default NewPasswordModal;
