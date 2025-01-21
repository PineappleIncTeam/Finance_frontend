import { useForm } from "react-hook-form";

import { IChangePasswordForm } from "../../../types/pages/userProfileSettings";
import AppInput from "../../../ui/appInput/AppInput";
import Button from "../../../ui/button/button";

import { passwordPattern } from "../../../helpers/authConstants";

import { formHelpers } from "../../../utils/formHelpers";

import style from "./userProfileChangePassword.module.scss";

export const ChangePassword = () => {
	const {
		formState: { errors },
		control,
	} = useForm<IChangePasswordForm>({
		mode: "all",
		delayError: 200,
	});
	return (
		<form className={style.changePasswordForm}>
			<p className={style.changePasswordTitle}>Смена пароля</p>
			<div className={style.changePasswordForm__settings}>
				<AppInput
					label={"Текущий пароль"}
					type={"password"}
					control={control}
					name="oldPassword"
					rules={{ required: true, pattern: passwordPattern }}
					error={formHelpers.getPasswordError(errors, control._formValues.oldPassword)}
				/>
				<AppInput
					label={"Новый пароль"}
					type={"password"}
					name={"newPassword"}
					control={control}
					rules={{ required: true, pattern: passwordPattern }}
					error={formHelpers.getPasswordError(errors, control._formValues.newPassword)}
				/>
				<AppInput
					label={"Подтвердить пароль"}
					type={"password"}
					name={"repeatPassword"}
					control={control}
					rules={{ required: true, pattern: passwordPattern }}
					error={formHelpers.getPasswordError(errors, control._formValues.repeatPassword)}
				/>
			</div>
			<Button content={"Сохранить"} styleName={"outlineButton"} type={"submit"} />
		</form>
	);
};
