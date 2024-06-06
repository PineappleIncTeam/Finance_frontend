"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { LetterIcon } from "../../../assets/script/changePassword/LetterIcon";

import { PaperAirLineIcon } from "../../../assets/script/changePassword/PaperAirLineIcon";
import { OpenLetterIcon } from "../../../assets/script/changePassword/OpenLetterIcon";
import { ArrowsIcon } from "../../../assets/script/changePassword/ArrowsIcon";
import { QuestionIcon } from "../../../assets/script/changePassword/QuestionIcon";
import { EmailIcon } from "../../../assets/script/changePassword/EmailIcon";

import { OvalIcon } from "../../../assets/script/changePassword/OvalIcon";
import { ManIcon } from "../../../assets/script/changePassword/ManIcon";
import { VisibilityOffIcon } from "../../../assets/script/changePassword/VisibilityOffIcon";

import { ChangePasswordModal } from "../../../components/appResponse/changePasswordModal/changePasswordModal";

import { IChangePassword } from "../../../types/pages/Password";

import style from "./changePassword.module.scss";


export default function ChangePassword() {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IChangePassword>({ mode: "onBlur" });

	const onSubmit = (data: IChangePassword) => {
		alert(JSON.stringify(data));
		handleChangePasswordModal();
		// changePasswordRequest;
		reset();
	};

	const [isEnterNewPasswordShown, setIsEnterNewPasswordShown] = useState(false);
	const [isReenterNewPasswordShown, setIsReenterNewPasswordShown] = useState(false);
	const [isChangePasswordModalShown, setIsChangePasswordModalShown] = useState(false);

	const toggleEnterPasswordVisibility = () => {
		setIsEnterNewPasswordShown(isEnterNewPasswordShown ? false : true);
	};

	const toggleReenterPasswordVisibility = () => {
		setIsReenterNewPasswordShown(isReenterNewPasswordShown ? false : true);
	};

	const handleChangePasswordModal = () => {
		setIsChangePasswordModalShown(true)
	}

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
							{isChangePasswordModalShown && <ChangePasswordModal/>}
							<label htmlFor="enterNewPassword" className={style.label}>Введите новый пароль</label>
								<input
									id="enterNewPassword"
									type={isEnterNewPasswordShown ? "text" : "password"}
									className={style.changePasswordRow}
									placeholder="Пароль"
									{...register("enterNewPassword", {
										pattern: /[A-Za-z]{3}/,
									})}
								/>
								<VisibilityOffIcon classNames={style.visibilityOffIcon} cb={toggleEnterPasswordVisibility} />
							{errors?.enterNewPassword && <p>Проверьте пароль</p>}
							<p className={style.changePasswordHelper}>
								Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя
								бы одна цифра
							</p>
							<label htmlFor="reenterNewPassword" className={style.label}>Повторите пароль</label>
								<input
									id="reenterNewPassword"
									className={style.changePasswordRow}
									type={isReenterNewPasswordShown ? "text" : "password"}
									placeholder="Пароль"
									{...register("reenterNewPassword", {
										required: {
											value: true,
											message: "Поле обязательно для заполнения",
										},
										validate: (value: string) => {
											if (watch("enterNewPassword") !== value) {
												return "Ваши пароли не совпадают";
											}
										},
									})}
								/>
								<VisibilityOffIcon classNames={style.visibilityOffIcon2} cb={toggleReenterPasswordVisibility} />						
							{errors?.reenterNewPassword?.message}
							<input className={style.saveButton} type="submit" value="Сохранить" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
