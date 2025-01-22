import { useForm } from "react-hook-form";

import { IChangePasswordForm } from "../../../types/pages/userProfileSettings";
import AppInput from "../../../ui/appInput/AppInput";
import Button from "../../../ui/button/button";

import { passwordPattern } from "../../../helpers/authConstants";

import { formHelpers } from "../../../utils/formHelpers";

import { InputTypeList } from "../../../helpers/Input";

import style from "./userProfileChangePassword.module.scss";

export const ChangePassword = () => {
	const {
		formState: { errors },
		control,
		handleSubmit,
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
				/>
				<AppInput
					label={"Новый пароль"}
					control={control}
					type={InputTypeList.Password}
					name={"newPassword"}
					rules={{ required: true, pattern: passwordPattern }}
					error={formHelpers.getPasswordError(errors, control._formValues.newPassword)}
				/>
				<AppInput
					label={"Подтвердить пароль"}
					control={control}
					type={InputTypeList.Password}
					name={"repeatPassword"}
					rules={{ required: true, pattern: passwordPattern }}
					error={formHelpers.getPasswordError(errors, control._formValues.repeatPassword)}
				/>
			</div>
			<Button content={"Сохранить"} styleName={"outlineButton"} type={"submit"} />
		</form>
	);
};
