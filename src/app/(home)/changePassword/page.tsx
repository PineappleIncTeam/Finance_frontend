"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IChangePassword } from "../../../types/pages/Password";
import ChangePasswordModal from "../../../components/mainLayout/changePasswordModal/changePasswordModal";
import { passwordRegex } from "../../../helpers/password";

import { LetterIcon } from "../../../assets/script/changePassword/LetterIcon";
import { PaperAirLineIcon } from "../../../assets/script/changePassword/PaperAirLineIcon";
import { OpenLetterIcon } from "../../../assets/script/changePassword/OpenLetterIcon";
import { ArrowsIcon } from "../../../assets/script/changePassword/ArrowsIcon";
import { QuestionIcon } from "../../../assets/script/changePassword/QuestionIcon";
import { EmailIcon } from "../../../assets/script/changePassword/EmailIcon";
import { OvalIcon } from "../../../assets/script/changePassword/OvalIcon";
import { ManIcon } from "../../../assets/script/changePassword/ManIcon";
import { VisibilityOffIcon } from "../../../assets/script/changePassword/VisibilityOffIcon";

import style from "./changePassword.module.scss";

export default function ChangePassword() {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IChangePassword>({ mode: "onBlur" });

	const onSubmit = (data: IChangePassword) => {
		alert(JSON.stringify(data));
		handleChangePasswordModal();
		reset();
	};

	const [isEnterNewPasswordShown, setIsEnterNewPasswordShown] = useState<boolean>(false);
	const [isReenterNewPasswordShown, setIsReenterNewPasswordShown] = useState<boolean>(false);
	const [isChangePasswordModalShown, setIsChangePasswordModalShown] = useState<boolean>(false);

	const toggleEnterPasswordVisibility = () => {
		setIsEnterNewPasswordShown(isEnterNewPasswordShown ? false : true);
	};

	const toggleReenterPasswordVisibility = () => {
		setIsReenterNewPasswordShown(isReenterNewPasswordShown ? false : true);
	};

	const handleChangePasswordModal = () => {
		const numberSeconds = 4000;
		setIsChangePasswordModalShown(true);
		setTimeout(() => setIsChangePasswordModalShown(false), numberSeconds);
	};

	const validatePasswords = (value: string) => {
		if (watch("enterNewPassword") !== value) {
			return "Ваши пароли не совпадают";
		}
	};

	const passwordRules = {
		required: { value: true, message: "Поле обязательно для заполнения" },
		pattern: { value: passwordRegex, message: "Значение не соответствует формату пароля" },
	};

	return (
		<div className={style.changePasswordWrap}>
			<div className={style.changePasswordContainer}>
				<OvalIcon classNames={style.ovalIcon} />
				<QuestionIcon classNames={style.questionIcon} />
				<EmailIcon classNames={style.emailIcon} />
				<ArrowsIcon classNames={style.arrowsIcon} />
				<LetterIcon classNames={style.letterIcon} />
				<OpenLetterIcon classNames={style.openLetterIcon} />
				<ManIcon classNames={style.manIcon} />
				<PaperAirLineIcon classNames={style.paperAirLineIcon} />
				<OpenLetterIcon classNames={style.secondOpenLetterIcon} />
				<div className={style.changePasswordContainer__modal}>
					<div className={style.changePasswordContainer__modal__content}>
						<h1 className={style.changePasswordContainer__form__title}>Изменение пароля</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ChangePasswordModal open={isChangePasswordModalShown} />
							<label htmlFor="enterNewPassword" className={style.formWrap_passwordTitle}>
								Введите новый пароль
							</label>
							<Controller
								name="enterNewPassword"
								control={control}
								rules={passwordRules}
								defaultValue=""
								render={({ field }) => (
									<input
										id="enterNewPassword"
										className={style.changePasswordRow}
										type={isEnterNewPasswordShown ? "text" : "password"}
										placeholder="Пароль"
										{...field}
									/>
								)}
							/>
							<button type="button" onClick={toggleEnterPasswordVisibility}>
								<VisibilityOffIcon classNames={style.visibilityOffIcon} />
							</button>
							{errors?.enterNewPassword && <span role="alert">{errors.enterNewPassword.message}</span>}
							<p className={style.changePasswordHelper}>
								Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя
								бы одна цифра
							</p>
							<label htmlFor="reenterNewPassword" className={style.formWrap_passwordTitle}>
								Повторите пароль
							</label>
							<Controller
								name="reenterNewPassword"
								control={control}
								rules={{ ...passwordRules, validate: validatePasswords }}
								defaultValue=""
								render={({ field }) => (
									<input
										id="reenterNewPassword"
										className={style.changePasswordRow}
										type={isReenterNewPasswordShown ? "text" : "password"}
										placeholder="Пароль"
										{...field}
									/>
								)}
							/>
							<button type="button" onClick={toggleReenterPasswordVisibility}>
								<VisibilityOffIcon classNames={style.visibilityOffIcon2} />
							</button>
							{errors?.reenterNewPassword?.message}
							<input className={style.saveButton} type="submit" value="Сохранить" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
