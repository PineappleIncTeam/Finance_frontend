"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

import { IChangePassword, IChangePasswordForm } from "../../../types/pages/Password";
import Title from "../../../ui/title/Title";
import ChangePassInput from "../../../components/mainLayout/changePassInput/changePassInput";
import ChangePasswordModal from "../../../components/mainLayout/changePasswordModal/changePasswordModal";
import { SetNewPassword } from "../../../services/api/auth/SetNewPassword";
import { MainPath } from "../../../services/router/routes";
import { mockLocalhostStr, mockLocalhostUrl } from "../../../services/api/auth/apiConstants";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";
import { InputTypeList } from "../../../helpers/Input";
import { errorPasswordRepeat, passwordPattern } from "../../../helpers/authConstants";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { formHelpers } from "../../../utils/formHelpers";
import Button from "../../../ui/Button/button";
import { ButtonType } from "../../../helpers/buttonFieldValues";

import styles from "./changePassword.module.scss";

export default function ChangePassword() {
	const [baseUrl, setBaseUrl] = useState<string>();
	const [isChangePasswordModalShown, setIsChangePasswordModalShown] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const router = useRouter();

	const uid = searchParams.get("uid");
	const token = searchParams.get("token");

	const secondsCount = 4000;

	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IChangePasswordForm>({
		defaultValues: {
			password: "",
			// eslint-disable-next-line camelcase
			re_password: "",
		},
		mode: "all",
		delayError: 200,
	});

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const validateRepeatPassword = (value: string) => {
		const password = watch("password");
		return value === password || errorPasswordRepeat;
	};

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

	const onSubmit = async (data: IChangePasswordForm) => {
		const apiData: IChangePassword = {
			// eslint-disable-next-line camelcase
			new_password: data.password,
			// eslint-disable-next-line camelcase
			re_new_password: data.re_password,
			token: token ?? "",
			uid: uid ?? "",
		};
		await saveButtonClick(apiData);
		handleChangePasswordModal();
		reset();
	};

	const handleChangePasswordModal = () => {
		setIsChangePasswordModalShown(true);
		setTimeout(() => setIsChangePasswordModalShown(false), secondsCount);
	};

	return (
		<div className={styles.changePasswordWrap}>
			<form className={styles.changePasswordFormContainer} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.changePasswordFormContainer__content}>
					<Title title={"Изменение пароля"} />
					<ChangePasswordModal open={isChangePasswordModalShown} />
					<ChangePassInput
						control={control}
						label={"Введите новый пароль"}
						type={InputTypeList.Password}
						placeholder="Пароль"
						subtitle="Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя бы одна цифра"
						error={formHelpers.getPasswordError(errors, control._formValues.password)}
						name="password"
						rules={{ required: true, pattern: passwordPattern }}
						autoComplete="off"
					/>
					<ChangePassInput
						control={control}
						label={"Повторите пароль"}
						type={InputTypeList.Password}
						placeholder="Пароль"
						error={errors.re_password?.message}
						name="re_password"
						rules={{ required: true, validate: validateRepeatPassword }}
						autoComplete="off"
					/>
					<Button variant={ButtonType.Notification} type="submit" className={styles.saveButton}>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	);
}
