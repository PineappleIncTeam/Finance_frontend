import { useForm } from "react-hook-form";

import { IChangePasswordForm } from "../../../types/pages/userProfileSettings";
import AppInput from "../../../ui/appInput/AppInput";

import { errorPasswordRepeat } from "../../../helpers/authConstants";

import { InputTypeList } from "../../../helpers/Input";

import { passwordValidate } from "../../../utils/passwordValidate";

import Button from "../../../ui/appButton/button";

import styles from "./userProfileChangePassword.module.scss";

export const UserProfileChangePassword = () => {
	const {
		formState: { errors },
		control,
		handleSubmit,
		watch,
	} = useForm<IChangePasswordForm>({
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			repeatPassword: "",
		},
		mode: "all",
		delayError: 200,
	});

	const onSubmit = async (data: IChangePasswordForm) => {
		return data;
	};

	const validateRepeatPassword = (value: string | boolean | undefined) => {
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
					rules={{ required: true }}
					error={errors.oldPassword}
				/>
				<AppInput
					label={"Новый пароль"}
					control={control}
					type={InputTypeList.Password}
					name={"newPassword"}
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
					rules={{ required: true, validate: validateRepeatPassword }}
					error={errors.repeatPassword}
				/>
			</div>
			<Button variant={"outlined"} type={"submit"}>
				Сохранить
			</Button>
		</form>
	);
};
