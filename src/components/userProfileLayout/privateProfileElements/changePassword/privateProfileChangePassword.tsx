"use client";

import { useForm } from "react-hook-form";

import { useRuntimeEnv } from "../../../../hooks/useRuntimeEnv";

import { IChangePasswordForm } from "../../../../types/pages/userProfileSettings";
import { IChangingUserProfilePasswordRequest } from "../../../../types/api/PersonalAccount";
import AppInput from "../../../../ui/appInput/AppInput";
import Button from "../../../../ui/Button/Button";
import { changeUserProfilePassword } from "../../../../services/api/userProfile/changePassword";
import { errorPasswordRepeat } from "../../../../helpers/authConstants";
import { InputTypeList } from "../../../../helpers/Input";
import { ButtonType } from "../../../../helpers/buttonFieldValues";
import { passwordValidate } from "../../../../utils/passwordValidate";
import { mockBaseUrl } from "../../../../mocks/envConsts";

import styles from "./privateProfileChangePassword.module.scss";

export const PrivateProfileChangePassword = () => {
	const {
		handleSubmit,
		watch,
		reset,
		control,
		formState: { errors },
	} = useForm<IChangePasswordForm>({
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			repeatPassword: "",
		},
	});

	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);

	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);
	const onSubmit = async (data: IChangePasswordForm) => {
		const changePasswordData: IChangingUserProfilePasswordRequest = {
			data: {
				// eslint-disable-next-line camelcase
				current_password: data.oldPassword,
				// eslint-disable-next-line camelcase
				new_password: data.newPassword,
			},
			baseUrl: baseUrl,
		};

		await changeUserProfilePassword(changePasswordData);
		reset();
	};

	const validateRepeatPassword = (value: string | boolean | undefined) => {
		// eslint-disable-next-line react-hooks/incompatible-library
		const password = watch("newPassword");
		return value === password || errorPasswordRepeat;
	};

	return (
		<form className={styles.changePasswordFormWrap} onSubmit={handleSubmit(onSubmit)}>
			<p className={styles.changePasswordFormWrap__title}>Смена пароля</p>
			<div className={styles.changePasswordSettingsWrap}>
				<AppInput
					label={"Текущий пароль"}
					control={control}
					type={InputTypeList.Password}
					name={"oldPassword"}
					placeholder="Текущий пароль"
					rules={{ required: true }}
					error={errors.oldPassword}
				/>
				<AppInput
					label={"Новый пароль"}
					control={control}
					type={InputTypeList.Password}
					name={"newPassword"}
					placeholder="Новый пароль"
					rules={{
						required: true,
						validate: passwordValidate,
					}}
					error={errors.newPassword}
				/>
				<AppInput
					label={"Подтвердить пароль"}
					control={control}
					type={InputTypeList.Password}
					name={"repeatPassword"}
					placeholder="Подтвердите пароль"
					rules={{ required: true, validate: validateRepeatPassword }}
					error={errors.repeatPassword}
				/>
			</div>
			<Button variant={ButtonType.Outlined} type={InputTypeList.Submit}>
				Сохранить
			</Button>
		</form>
	);
};
