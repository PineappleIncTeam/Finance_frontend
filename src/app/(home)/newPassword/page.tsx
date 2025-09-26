"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { env } from "next-runtime-env";

import { INewPassword } from "../../../types/pages/Password";
import AuthInput from "../../../ui/authInput/AuthInput";
import Title from "../../../ui/title/Title";
import NewPasswordModal from "../../../components/mainLayout/newPasswordModal/newPasswordModal";
import { formHelpers } from "../../../utils/formHelpers";
import { emailPattern, errorEmailIsNotRegister } from "../../../helpers/authConstants";
import { InputTypeList } from "../../../helpers/Input";

import { resetPasswordWithEmail } from "../../../services/api/auth/resetPasswordWithEmail";
import { MainPath } from "../../../services/router/routes";
import Button from "../../../ui/Button/Button";
import { ButtonType } from "../../../helpers/buttonFieldValues";

import styles from "./newPassword.module.scss";

export default function NewPassword() {
	const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");

	const router = useRouter();

	const baseUrl = String(env("NEXT_PUBLIC_BASE_URL") ?? "");

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

	const onSubmit = (data: INewPassword) => {
		setEmail(data?.email ?? "");
		restoreButtonClick(data);
		setTimeout(() => newPasswordModalVisible(false), secondCount);
		reset();
	};

	const newPasswordModalVisible = (prop: boolean) => {
		setIsNewPasswordModalOpen(prop);
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
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
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
					<NewPasswordModal email={email} open={isNewPasswordModalOpen} toggle={() => newPasswordModalVisible(false)} />
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
