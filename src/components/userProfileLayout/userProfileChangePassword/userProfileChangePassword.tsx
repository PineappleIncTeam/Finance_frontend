import { useForm } from "react-hook-form";

import { IChangePasswordForm } from "../../../types/pages/userProfileSettings";
import AppInput from "../../../ui/appInput/AppInput";
import Button from "../../../ui/button/button";

import style from "./userProfileChangePassword.module.scss";

export const ChangePassword = () => {
	const { control } = useForm<IChangePasswordForm>({
		mode: "all",
		delayError: 200,
	});
	return (
		<form className={style.form}>
			<div className={style.title}>Смена пароля</div>
			<div className={style.form__settings}>
				<AppInput label={"Текущий пароль"} type={"password"} control={control} name="oldPassword" />
				<AppInput label={"Новый пароль"} type={"password"} name={"newPassword"} control={control} />
				<AppInput label={"Подтвердить пароль"} type={"password"} name={"repeatPassword"} control={control} />
			</div>
			<Button content={"Сохранить"} styleName={"outlineButton"} type={"submit"} />
		</form>
	);
};
