"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { LetterIcon } from "../../../assets/pages/changePassword/LetterIcon";

import { PaperAirLineIcon } from "../../../assets/pages/changePassword/PaperAirLineIcon";
import { OpenLetterIcon } from "../../../assets/pages/changePassword/OpenLetterIcon";
import { ArrowsIcon } from "../../../assets/pages/changePassword/ArrowsIcon";
import { QuestionIcon } from "../../../assets/pages/changePassword/QuestionIcon";
import { EmailIcon } from "../../../assets/pages/changePassword/EmailIcon";

import { OvalIcon } from "../../../assets/pages/changePassword/OvalIcon";
import { ManIcon } from "../../../assets/pages/changePassword/ManIcon";
import { VisibilityOffIcon } from "../../../assets/pages/changePassword/VisibilityOffIcon";

import { ChangePasswordModal } from "../../../components/appResponse/changePasswordModal/changePasswordModal";

import style from "./changePassword.module.scss";

export interface IChangePassword {
	enterNewPassword: string;
	reenterNewPassword: string;
}

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
							<label className={style.label}>
								Введите новый пароль
								<input
									type={isEnterNewPasswordShown ? "text" : "password"}
									className={style.changePasswordRow}
									placeholder="Пароль"
									{...register("enterNewPassword", {
										pattern: /[A-Za-z]{3}/,
									})}
								/>
								<VisibilityOffIcon classNames={style.visibilityOffIcon} cb={toggleEnterPasswordVisibility} />
							</label>
							{errors?.enterNewPassword && <p>Проверьте пароль</p>}
							<p className={style.changePasswordHelper}>
								Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя
								бы одна цифра
							</p>
							<label className={style.label}>
								Повторите пароль
								<input
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
							</label>
							{errors?.reenterNewPassword?.message}
							<input className={style.saveButton} type="submit" value="Сохранить" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
