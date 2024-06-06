import style from "./changePasswordModal.module.scss";

export const ChangePasswordModal = () => {
	return (
		<div className={style.backgroundModal}>
			<div className={style.changePasswordResponseModalWrap}>
			<div className={style.changePasswordResponseModalContainer}>
				<h1 className={style.changePasswordResponseModalContainer__title}>Новый пароль успешно сохранен !</h1>
				<p className={style.changePasswordResponseModalContainer__subtitle}>
					Теперь вы можете войти в приложение с использованием своих обновленных учетных данных.
				</p>
			</div>
		</div>
		</div>
		
	);
}
