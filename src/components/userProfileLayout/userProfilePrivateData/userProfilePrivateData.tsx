import { useForm } from "react-hook-form";

import { IPrivateDataFrom } from "../../../types/pages/userProfileSettings";
import AppInput from "../../../ui/appInput/AppInput";
import Button from "../../../ui/button/button";
import { RadioButton } from "../../../ui/radio/radioButton";

import style from "./userProfilePrivateData.module.scss";

export const PrivateData = () => {
	const { control } = useForm<IPrivateDataFrom>({
		defaultValues: {
			nickname: "nickname",
			country: "country",
			gender: "male",
			email: "example@mail.com",
		},
		mode: "all",
		delayError: 200,
	});
	return (
		<form className={style.form}>
			<div className={style.title}>Личные данные</div>
			<div className={style.form__settings}>
				<AppInput
					label={"Nickname"}
					type={"text"}
					control={control}
					name="nickname"
					rules={{ maxLength: 32 }}
					error={"Не более 32 символов"}
				/>
				<div className={style.radioButtons}>
					<RadioButton control={control} name="gender" value="male" label="Муж." />
					<RadioButton control={control} name="gender" value="female" label="Жен." />
				</div>
				<AppInput label={"Введите страну"} type={"text"} name={"country"} control={control} />
				<AppInput label={"Email"} type={"text"} name={"email"} control={control} disabled />
			</div>
			<Button content={"Сохранить"} styleName={"outlineButton"} type={"submit"} />
		</form>
	);
};