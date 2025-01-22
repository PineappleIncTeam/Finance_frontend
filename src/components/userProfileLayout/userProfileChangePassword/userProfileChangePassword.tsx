import { useForm } from "react-hook-form";

import { IChangePasswordForm } from "../../../types/pages/userProfileSettings";
import AppInput from "../../../ui/appInput/AppInput";
import Button from "../../../ui/button/button";

import { errorPasswordRepeat } from "../../../helpers/authConstants";

import { InputTypeList } from "../../../helpers/Input";

import { passwordValidate } from "../../../utils/passwordValidate";

import style from "./userProfileChangePassword.module.scss";

export const ChangePassword = () => {
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
		<form className={style.changePasswordForm} onSubmit={handleSubmit(onSubmit)}>
			<p className={style.changePasswordTitle}>Смена пароля</p>
			<div className={style.changePasswordForm__settings}>
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
			<Button content={"Сохранить"} styleName={"outlineButton"} type={"submit"} />
		</form>
	);
};
