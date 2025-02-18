import { useForm } from "react-hook-form";

import { IPrivateDataFrom } from "../../../types/pages/userProfileSettings";
import AppInput from "../../../ui/appInput/AppInput";

import { RadioButton } from "../../../ui/radio/radioButton";

import Button from "../../../ui/Button/button";
import { ButtonType } from "../../../helpers/buttonFieldValues";

import styles from "./userProfilePrivateData.module.scss";

export const UserProfilePrivateData = () => {
	const {
		control,
		formState: { errors },
	} = useForm<IPrivateDataFrom>({
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
		<form className={styles.privateDataForm}>
			<p className={styles.privateDataForm__title}>Личные данные</p>
			<div className={styles.privateDataSettingsWrap}>
				<AppInput
					label={"Nickname"}
					type={"text"}
					control={control}
					name="nickname"
					rules={{
						maxLength: {
							value: 32,
							message: "Не более 32 символов",
						},
					}}
					error={errors.nickname?.message}
				/>
				<div className={styles.privateDataRadioButtons}>
					<RadioButton control={control} name="gender" value="male" label="Муж." />
					<RadioButton control={control} name="gender" value="female" label="Жен." />
				</div>
				<AppInput label={"Введите страну"} type={"text"} name={"country"} control={control} />
				<AppInput label={"Email"} type={"text"} name={"email"} control={control} disabled />
			</div>
			<Button variant={ButtonType.Outlined} type={"submit"}>
				Сохранить
			</Button>
		</form>
	);
};
