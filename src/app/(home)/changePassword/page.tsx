"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

import { IChangePassword } from "../../../types/pages/Password";

import ChangePasswordModal from "../../../components/mainLayout/changePasswordModal/changePasswordModal";

import { InputTypeList } from "../../../helpers/Input";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { SetNewPassword } from "../../../services/api/auth/SetNewPassword";

import { MainPath } from "../../../services/router/routes";

import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import { mockLocalhostStr, mockLocalhostUrl } from "../../../services/api/auth/apiConstants";

import { formHelpers } from "../../../utils/formHelpers";
import { passwordPattern } from "../../../helpers/authConstants";
import ChangePassInput from "../../../components/mainLayout/changePassInput/ChangePassInput";
import Title from "../../../ui/title/Title";

import style from "./changePassword.module.scss";

export default function ChangePassword() {
	const [baseUrl, setBaseUrl] = useState<string>();
	const [isChangePasswordModalShown, setIsChangePasswordModalShown] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const uid = searchParams.get("uid");
	const token = searchParams.get("token");
	const router = useRouter();
	const mSeconds = 4000;

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IChangePassword>({ mode: "onBlur" });

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const saveButtonClick = async (data: IChangePassword) => {
		try {
			const isLocalhost =
				window.location.hostname.includes(mockLocalhostStr) || window.location.hostname.includes(mockLocalhostUrl);
			if (baseUrl && !isLocalhost && uid && token) {
				data.uid = uid;
				data.token = token;
				await SetNewPassword(baseUrl, data);
				router.push(MainPath.Login);
			} else {
				return router.push(MainPath.ServerError);
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status >= ApiResponseCode.SERVER_ERROR_STATUS_MIN &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
		}
	};

	const onSubmit = async (data: IChangePassword) => {
		await saveButtonClick(data);
		handleChangePasswordModal();
		reset();
	};

	const handleChangePasswordModal = () => {
		setIsChangePasswordModalShown(true);
		setTimeout(() => setIsChangePasswordModalShown(false), mSeconds);
	};

	return (
		<div className={style.changePasswordWrap}>
			<form className={style.changePasswordFormContainer} onSubmit={handleSubmit(onSubmit)}>
				<div className={style.changePasswordFormContainer__content}>
					<Title title={"Изменение пароля"} />
					<ChangePasswordModal open={isChangePasswordModalShown} />
					<ChangePassInput
						label={"Введите новый пароль"}
						type={InputTypeList.Password}
						placeholder="Пароль"
						subtitle="Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя бы одна цифра"
						error={formHelpers.getPasswordError(errors, control._formValues.password)}
						name={"new_password"}
						control={control}
						rules={{ required: true, pattern: passwordPattern }}
					/>
					<ChangePassInput
						label={"Повторите пароль"}
						type={InputTypeList.Password}
						placeholder="Пароль"
						error={formHelpers.getPasswordError(errors, control._formValues.password)}
						name={"re_new_password"}
						control={control}
						rules={{ required: true, pattern: passwordPattern }}
					/>
					{errors?.re_new_password?.message}
					<input className={style.saveButton} type={InputTypeList.Submit} value="Сохранить" />
				</div>
			</form>
		</div>
	);
}
