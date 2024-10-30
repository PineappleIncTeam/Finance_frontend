"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AxiosError } from "axios";

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

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { ResetPassword } from "../../../services/api/auth/ResetPassword";

import { MainPath } from "../../../services/router/routes";

import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import style from "./newPassword.module.scss";

export default function NewPassword() {
	const [isNewPasswordModalShown, setIsNewPasswordModalShown] = useState(false);
	const [email, setEmail] = useState("");
	const [baseUrl, setBaseUrl] = useState<string>();

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<INewPassword>({ mode: "onBlur" });

	const onSubmit = (data: INewPassword) => {
		if (data) {
			setEmail(data?.email);
			restoreButtonClick(data);
			handleNewPasswordModal();
			reset();
		}
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

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const router = useRouter();

	const isAxiosError = (error: unknown): error is AxiosError => {
		return (error as AxiosError).isAxiosError !== undefined;
	};

	const restoreButtonClick = async (data: INewPassword) => {
		try {
			if (baseUrl) {
				await ResetPassword(baseUrl, data);
				router.push(MainPath.ChangePassword);
			} else {
				return router.push(MainPath.ServerError);
			}
		} catch (error) {
			if (
				isAxiosError(error) &&
				error?.response?.status >= ApiResponseCode.SERVER_ERROR_STATUS_MIN &&
				error?.response?.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
		}
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
							<label htmlFor="email" className={style.formWrap__emailTitle}>
								Введите почту
							</label>
							<Controller
								name="email"
								control={control}
								rules={emailRules}
								defaultValue=""
								render={({ field }) => (
									<input id="email" className={style.newPasswordRow} placeholder="_@_._" {...field} />
								)}
							/>
							{errors?.email && <span role="alert">{errors.email.message}</span>}
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
