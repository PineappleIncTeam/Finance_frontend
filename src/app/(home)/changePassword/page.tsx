"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { IChangePassword } from "../../../types/pages/Password";
import ChangePasswordModal from "../../../components/mainLayout/changePasswordModal/changePasswordModal";
import { passwordRegex } from "../../../helpers/password";
import { InputTypeList } from "../../../helpers/Input";

import { LetterIcon } from "../../../assets/script/changePassword/LetterIcon";
import { PaperAirLineIcon } from "../../../assets/script/changePassword/PaperAirLineIcon";
import { OpenLetterIcon } from "../../../assets/script/changePassword/OpenLetterIcon";
import { ArrowsIcon } from "../../../assets/script/changePassword/ArrowsIcon";
import { QuestionIcon } from "../../../assets/script/changePassword/QuestionIcon";
import { EmailIcon } from "../../../assets/script/changePassword/EmailIcon";
import { OvalIcon } from "../../../assets/script/changePassword/OvalIcon";
import { ManIcon } from "../../../assets/script/changePassword/ManIcon";
import { VisibilityOffIcon } from "../../../assets/script/changePassword/VisibilityOffIcon";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { SetPassword } from "../../../services/api/auth/ResetPasswordConfirm";

import { MainPath } from "../../../services/router/routes";

import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import { mockLocalhostStr, mockLocalhostUrl } from "../../../services/api/auth/apiConstants";

import style from "./changePassword.module.scss";

export default function ChangePassword() {
	const [baseUrl, setBaseUrl] = useState<string>();
	const [isNewPasswordShown, setIsNewPasswordShown] = useState<boolean>(false);
	const [isReNewPasswordShown, setIsReNewPasswordShown] = useState<boolean>(false);
	const [isChangePasswordModalShown, setIsChangePasswordModalShown] = useState<boolean>(false);
	const searchParams = useSearchParams();

	const uid = searchParams.get("uid");
	const token = searchParams.get("token");

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const router = useRouter();

	const isAxiosError = (error: unknown): error is AxiosError => {
		return (error as AxiosError).isAxiosError !== undefined;
	};

	const saveButtonClick = async (data: IChangePassword) => {
		try {
			const isLocalhost =
				window.location.hostname.includes(mockLocalhostStr) || window.location.hostname.includes(mockLocalhostUrl);
			if (baseUrl && !isLocalhost && uid && token) {
				data.uid = uid;
				data.token = token;
				await SetPassword(baseUrl, data);
				router.push(MainPath.Login);
			} else {
				return router.push(MainPath.ServerError);
			}
		} catch (error) {
			if (
				isAxiosError(error) &&
				error.response &&
				error.response.status >= ApiResponseCode.SERVER_ERROR_STATUS_MIN &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
		}
	};

	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IChangePassword>({ mode: "onBlur" });

	const onSubmit = (data: IChangePassword) => {
		saveButtonClick(data);
		handleChangePasswordModal();
		reset();
	};

	const toggleNewPasswordVisibility = () => {
		setIsNewPasswordShown(isNewPasswordShown ? false : true);
	};

	const toggleReNewPasswordVisibility = () => {
		setIsReNewPasswordShown(isReNewPasswordShown ? false : true);
	};

	const handleChangePasswordModal = () => {
		const numberSeconds = 4000;
		setIsChangePasswordModalShown(true);
		setTimeout(() => setIsChangePasswordModalShown(false), numberSeconds);
	};

	const validatePasswords = (value: string) => {
		if (watch("new_password") !== value) {
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
							<label htmlFor="new_password" className={style.formWrap_passwordTitle}>
								Введите новый пароль
							</label>
							<Controller
								name="new_password"
								control={control}
								rules={passwordRules}
								defaultValue=""
								render={({ field }) => (
									<input
										id="new_password"
										className={style.changePasswordRow}
										type={isNewPasswordShown ? InputTypeList.Text : InputTypeList.Password}
										placeholder="Пароль"
										{...field}
									/>
								)}
							/>
							<button type="button" onClick={toggleNewPasswordVisibility}>
								<VisibilityOffIcon classNames={style.visibilityOffIcon} />
							</button>
							{errors?.new_password && <span role="alert">{errors.new_password.message}</span>}
							<p className={style.changePasswordHelper}>
								Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя
								бы одна цифра
							</p>
							<label htmlFor="reenterNewPassword" className={style.formWrap_passwordTitle}>
								Повторите пароль
							</label>
							<Controller
								name="re_new_password"
								control={control}
								rules={{ ...passwordRules, validate: validatePasswords }}
								defaultValue=""
								render={({ field }) => (
									<input
										id="re_new_password"
										className={style.changePasswordRow}
										type={isReNewPasswordShown ? InputTypeList.Text : InputTypeList.Password}
										placeholder="Пароль"
										{...field}
									/>
								)}
							/>
							<button type="button" onClick={toggleReNewPasswordVisibility}>
								<VisibilityOffIcon classNames={style.visibilityOffIcon2} />
							</button>
							{errors?.re_new_password?.message}
							<input className={style.saveButton} type={InputTypeList.Submit} value="Сохранить" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
