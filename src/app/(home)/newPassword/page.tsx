"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { INewPassword } from "../../../types/pages/Password";
import AuthInput from "../../../ui/authInput/AuthInput";
import Title from "../../../ui/title/Title";
import Button from "../../../ui/Button/Button1";
import NewPasswordModal from "../../../components/mainLayout/newPasswordModal/newPasswordModal";
import { resetPasswordWithEmail } from "../../../services/api/auth/ResetPasswordWithEmail";
import { MainPath } from "../../../services/router/routes";
import { formHelpers } from "../../../utils/formHelpers";
import { emailPattern, errorEmailIsNotRegister } from "../../../helpers/authConstants";
import { InputTypeList } from "../../../helpers/Input";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";
import { ButtonType } from "../../../helpers/buttonFieldValues";

import styles from "./newPassword.module.scss";

export default function NewPassword() {
	const [isNewPasswordModalShown, setIsNewPasswordModalShown] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [baseUrl, setBaseUrl] = useState<string>();

	const router = useRouter();

	const secondCount = 7000;

	const {
		formState: { errors },
		control,
		setError,
		handleSubmit,
		reset,
	} = useForm<INewPassword>({
		defaultValues: {
			email: "",
		},
		mode: "all",
		delayError: 200,
	});

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const onSubmit = (data: INewPassword) => {
		setEmail(data?.email ?? "");
		restoreButtonClick(data);
		setTimeout(() => newPasswordModalVisible(false), secondCount);
		reset();
	};

	const newPasswordModalVisible = (prop: boolean) => {
		setIsNewPasswordModalShown(prop);
	};

	const isAxiosError = (error: unknown): error is AxiosError => {
		return (error as AxiosError).isAxiosError !== undefined;
	};

	const restoreButtonClick = async (data: INewPassword) => {
		try {
			if (baseUrl) {
				const response = await resetPasswordWithEmail(baseUrl, data);
				if (response !== null && response.status === axios.HttpStatusCode.NoContent) {
					newPasswordModalVisible(true);
				}
			}
		} catch (error) {
			if (isAxiosError(error) && error?.response?.status === axios.HttpStatusCode.BadRequest) {
				setError("email", {
					type: "server",
					message: errorEmailIsNotRegister,
				});
			} else if (
				isAxiosError(error) &&
				error.response &&
				error.response.status >= ApiResponseCode.SERVER_ERROR_STATUS_MIN &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
		}
	};

	function handleReturnBack() {
		router.push(MainPath.Login);
	}

	return (
		<div className={styles.newPasswordWrap}>
			<form className={styles.newPasswordFormContainer} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.newPasswordFormContainer__content}>
					<Title title={"Восстановление пароля"} />
					<NewPasswordModal
						email={email}
						open={isNewPasswordModalShown}
						toggle={() => newPasswordModalVisible(false)}
					/>
					<AuthInput
						control={control}
						label="Введите почту"
						type={InputTypeList.Email}
						placeholder="_@_._"
						name="email"
						error={formHelpers.getEmailError(errors)}
						rules={{ required: true, pattern: emailPattern }}
					/>
					<div className={styles.newPasswordFormContainer__buttons}>
						<Button
							variant={ButtonType.Outlined}
							type={InputTypeList.Button}
							className={styles.button}
							onClick={handleReturnBack}>
							Отменить
						</Button>
						<Button variant={ButtonType.Notification} type={InputTypeList.Submit} className={styles.button}>
							Восстановить
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
