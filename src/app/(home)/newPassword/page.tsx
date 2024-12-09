"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import { INewPassword } from "../../../types/pages/Password";
import Input from "../../../ui/input/Input";
import Title from "../../../ui/title/Title";
import NewPasswordModal from "../../../components/mainLayout/newPasswordModal/newPasswordModal";
import { formHelpers } from "../../../utils/formHelpers";
import { emailPattern } from "../../../helpers/authConstants";
import { InputType } from "../../../helpers/Input";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import { ResetPassword } from "../../../services/api/auth/ResetPassword";

import { MainPath } from "../../../services/router/routes";

import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import style from "./newPassword.module.scss";

export default function NewPassword() {

	const [isNewPasswordModalShown, setIsNewPasswordModalShown] = useState(false);
	const [email, setEmail] = useState<string>("");
	const [baseUrl, setBaseUrl] = useState<string>();

	const {
		formState: { errors },
		control,
		handleSubmit,
		reset,
	} = useForm<INewPassword | any>({
		defaultValues: {
			email: "",
		},
		mode: "all",
		delayError: 200,
	});

	const onSubmit = (data: INewPassword) => {
		setEmail(data?.email ?? "");
		restoreButtonClick(data);
		newPasswordModalVisible(true);
		reset();
	};

	const newPasswordModalVisible = (prop: boolean) => {
		setIsNewPasswordModalShown(prop);
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
			<form className={style.newPasswordFormContainer} onSubmit={handleSubmit(onSubmit)}>
				<div className={style.newPasswordFormContainer__Content}>
					<Title title={"Восстановление пароля"} />
					<NewPasswordModal
						email={email}
						open={isNewPasswordModalShown}
						toggle={() => newPasswordModalVisible(false)}
					/>
					<Input
						control={control}
						label="Введите почту"
						type={InputType.Email}
						placeholder="_@_._"
						name="email"
						error={formHelpers.getEmailError(errors)}
						rules={{ required: true, pattern: emailPattern }}
					/>
					<div className={style.newPasswordFormContainer__buttons}>
						<input className={style.backButton} type={InputType.Submit} value="Назад" />
						<input className={style.restoreButton} type={InputType.Submit} value="Восстановить" />
					</div>
				</div>
			</form>
		</div>
	);
}
