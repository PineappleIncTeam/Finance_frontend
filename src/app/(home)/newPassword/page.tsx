"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { INewPassword } from "../../../types/pages/Password";
import NewPasswordModal from "../../../components/mainLayout/newPasswordModal/newPasswordModal";
import { emailRegex } from "../../../helpers/password";

import { LetterIcon } from "../../../assets/script/changePassword/LetterIcon";
import { PaperAirLineIcon } from "../../../assets/script/changePassword/PaperAirLineIcon";
import { OpenLetterIcon } from "../../../assets/script/changePassword/OpenLetterIcon";
import { ArrowsIcon } from "../../../assets/script/changePassword/ArrowsIcon";
import { QuestionIcon } from "../../../assets/script/changePassword/QuestionIcon";
import { EmailIcon } from "../../../assets/script/changePassword/EmailIcon";
import { OvalIcon } from "../../../assets/script/changePassword/OvalIcon";
import { ManIcon } from "../../../assets/script/changePassword/ManIcon";

import style from "./newPassword.module.scss";

export default function NewPassword() {
	const [isNewPasswordModalShown, setIsNewPasswordModalShown] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<INewPassword>({ mode: "onBlur" });

	const onSubmit = (data: INewPassword) => {
		setEmail(data?.enterEmail);
		handleNewPasswordModal();
		reset();
	};

	const handleNewPasswordModal = () => {
		setIsNewPasswordModalShown(true);
	};

	const closeNewPasswordModal = () => {
		setIsNewPasswordModalShown(false);
	};

	const emailRules = {
		required: { value: true, message: "Поле обязательно для заполнения" },
		pattern: { value: emailRegex, message: "Значение не соответствует формату email" },
	};

	return (
		<div className={style.newPasswordWrap}>
			<div className={style.newPasswordContainer}>
				<OvalIcon classNames={style.ovalIcon} />
				<QuestionIcon classNames={style.questionIcon} />
				<EmailIcon classNames={style.emailIcon} />
				<ArrowsIcon classNames={style.arrowsIcon} />
				<LetterIcon classNames={style.letterIcon} />
				<OpenLetterIcon classNames={style.openLetterIcon} />
				<ManIcon classNames={style.manIcon} />
				<PaperAirLineIcon classNames={style.paperAirLineIcon} />
				<OpenLetterIcon classNames={style.secondOpenLetterIcon} />
				<div className={style.newPasswordContainer__modal}>
					<div className={style.newPasswordContainer__modal__content}>
						<h1 className={style.newPasswordContainer__form__title}>Восстановление пароля</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<NewPasswordModal email={email} open={isNewPasswordModalShown} toggle={closeNewPasswordModal} />
							<label htmlFor="enterEmail" className={style.formWrap__emailTitle}>
								Введите почту
							</label>
							<Controller
								name="enterEmail"
								control={control}
								rules={emailRules}
								defaultValue=""
								render={({ field }) => (
									<input id="enterEmail" className={style.newPasswordRow} placeholder="_@_._" {...field} />
								)}
							/>
							{errors?.enterEmail && <span role="alert">{errors.enterEmail.message}</span>}
							<div className={style.newPassword__modal__buttons}>
								<input className={style.backButton} type="submit" value="Назад" />
								<input className={style.restoreButton} type="submit" value="Восстановить" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
