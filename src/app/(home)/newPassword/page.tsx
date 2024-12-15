"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { INewPassword } from "../../../types/pages/Password";
import AuthInput from "../../../ui/authInput/AuthInput";
import Title from "../../../ui/title/Title";
import NewPasswordModal from "../../../components/mainLayout/newPasswordModal/newPasswordModal";
import { formHelpers } from "../../../utils/formHelpers";
import { emailPattern } from "../../../helpers/authConstants";
import { InputTypeList } from "../../../helpers/Input";

import style from "./newPassword.module.scss";

export default function NewPassword() {
	const [isNewPasswordModalShown, setIsNewPasswordModalShown] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");

	const {
		formState: { errors },
		control,
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
		newPasswordModalVisible(true);
		reset();
	};

	const newPasswordModalVisible = (prop: boolean) => {
		setIsNewPasswordModalShown(prop);
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
					<AuthInput
						control={control}
						label="Введите почту"
						type={InputTypeList.Email}
						placeholder="_@_._"
						name="email"
						error={formHelpers.getEmailError(errors)}
						rules={{ required: true, pattern: emailPattern }}
					/>
					<div className={style.newPasswordFormContainer__buttons}>
						<input className={style.backButton} type={InputTypeList.Submit} value="Назад" />
						<input className={style.restoreButton} type={InputTypeList.Submit} value="Восстановить" />
					</div>
				</div>
			</form>
		</div>
	);
}
