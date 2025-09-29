"use client";

import { useForm } from "react-hook-form";
import { env } from "next-runtime-env";

import { useAppDispatch } from "../../../../services/redux/hooks/useAppDispatch";
import { useAppSelector } from "../../../../services/redux/hooks/useAppSelector";

import { IPrivateDataForm } from "../../../../types/components/ComponentsTypes";
import { TChangeUserProfileDataRequest } from "../../../../types/api/PersonalAccount";
import AppInput from "../../../../ui/appInput/AppInput";
import { RadioButton } from "../../../../ui/radio/radioButton";
import Button from "../../../../ui/Button/Button";
import { updateUserProfileData } from "../../../../services/api/userProfile/updateUserData";
import { userDataSelector } from "../../../../services/redux/features/userData/UserDataSelector";
import { ButtonType } from "../../../../helpers/buttonFieldValues";
import { InputTypeList } from "../../../../helpers/Input";
import { setUser } from "../../../../services/redux/features/userData/UserDataSlice";

import styles from "./privateProfilePrivateData.module.scss";

export const PrivateProfilePrivateData = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector(userDataSelector);

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<IPrivateDataForm>({
		defaultValues: {
			nickname: userData.userData?.nickname || "",
			gender: userData.userData?.gender || "M",
			countryName: userData.userData?.country_name || "",
			email: userData.userData?.email || "",
		},
	});

	const userProfileData = userData.userData;

	const baseUrl = String(env("NEXT_PUBLIC_BASE_URL") ?? "");

	const resetFieldsData = () => {
		reset({
			nickname: userProfileData?.nickname || "",
			gender: userProfileData?.gender || "M",
			countryName: userProfileData?.country_name || "",
			email: userProfileData?.email || "",
		});
	};

	const onSubmit = async (data: IPrivateDataForm) => {
		const updatingUserDataRequest: TChangeUserProfileDataRequest = {
			nickname: data.nickname,
			gender: data.gender,
			country: 0, // need to fix

			avatar: userProfileData.avatar,
			defaultAvatar: userProfileData.defaultAvatar,
		};

		const updateUserDataResponse = await updateUserProfileData(updatingUserDataRequest, baseUrl);
		const updatedData = updateUserDataResponse?.data ?? updateUserDataResponse;
		dispatch(setUser(updatedData));
		resetFieldsData();
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
					name={"countryName"}
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
