"use client";

import { useForm } from "react-hook-form";

import { LetterIcon } from "../../../assets/script/changePassword/LetterIcon";

import { PaperAirLineIcon } from "../../../assets/script/changePassword/PaperAirLineIcon";
import { OpenLetterIcon } from "../../../assets/script/changePassword/OpenLetterIcon";
import { ArrowsIcon } from "../../../assets/script/changePassword/ArrowsIcon";
import { QuestionIcon } from "../../../assets/script/changePassword/QuestionIcon";
import { EmailIcon } from "../../../assets/script/changePassword/EmailIcon";

import { OvalIcon } from "../../../assets/script/changePassword/OvalIcon";
import { ManIcon } from "../../../assets/script/changePassword/ManIcon";

import { INewPassword } from "../../../types/pages/Password";

import style from "./newPassword.module.scss";


export default function NewPassword() {
	
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<INewPassword>({ mode: "onBlur" });

	const onSubmit = (data: INewPassword) => {
		alert(JSON.stringify(data));
		reset();
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
							<label htmlFor="enterEmail" className={style.label}>Введите почту</label>
							<input 
							id="enterEmail"
							className={style.newPasswordRow} 
							placeholder="_@_._" 
							{...register("enterEmail", {
								required: {
									value: true,
									message: "Поле обязательно для заполнения",
								},
								pattern: {
									value: /\S+@\S+\.\S+/,
									message: "Значение не соответсвует формату email"
								}
							})
							}
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
