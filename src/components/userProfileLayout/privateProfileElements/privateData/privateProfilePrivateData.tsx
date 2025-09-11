import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { IPrivateDataFrom } from "../../../../types/pages/userProfileSettings";
import AppInput from "../../../../ui/appInput/AppInput";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../hooks/useAppSelector";

import { RadioButton } from "../../../../ui/radio/radioButton";

import Button from "../../../../ui/Button/Button";
import { ButtonType } from "../../../../helpers/buttonFieldValues";
import { InputTypeList } from "../../../../helpers/Input";

import { userDataActions } from "../../../../services/redux/features/userData/UserDataActions";
import { userSelector } from "../../../../services/redux/features/userData/UserDataSelector";

import styles from "./privateProfilePrivateData.module.scss";

export const PrivateProfilePrivateData = () => {
	const dispatch = useAppDispatch();
	const { userData } = useAppSelector(userSelector);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IPrivateDataFrom>({
		defaultValues: {
			nickname: userData?.nickname || "",
			country: userData?.country || "",
			gender: userData?.gender || "male",
			email: userData?.email || "",
			avatar: userData?.avatar || "",
		},
		mode: "all",
		delayError: 200,
	});

	useEffect(() => {
		dispatch(userDataActions.pending());
	}, [dispatch]);

	useEffect(() => {
		reset({
			nickname: userData?.nickname || "",
			country: userData?.country || "",
			gender: userData?.gender || "male",
			email: userData?.email || "",
			avatar: userData?.avatar || "",
		});
	}, [userData, reset]);

	const onSubmit = (data: IPrivateDataFrom) => {
		dispatch(
			userDataActions.update({
				nickname: data.nickname,
				country: data.country,
				gender: data.gender,
				avatar: data.avatar,
			}),
		);
	};

	return (
		<form className={styles.privateDataForm} onSubmit={handleSubmit(onSubmit)}>
			<p className={styles.privateDataForm__title}>Личные данные</p>
			<div className={styles.privateDataSettingsWrap}>
				<AppInput
					label={"Nickname"}
					type={"text"}
					control={control}
					placeholder="Имя"
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
				<AppInput
					label={"Введите страну"}
					type={"text"}
					name={"country"}
					control={control}
					placeholder="Введите страну"
				/>
				<AppInput label={"Email"} type={"text"} name={"email"} control={control} placeholder="my@email.ru" disabled />
			</div>
			{userData.error && <p className={styles.error}>{userData.error}</p>}
			<Button variant={ButtonType.Outlined} type={InputTypeList.Submit}>
				Сохранить
			</Button>
		</form>
	);
};
