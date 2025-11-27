"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useActions, useAppSelector } from "../../../../services/redux/hooks";
import { useRuntimeEnv } from "../../../../hooks/useRuntimeEnv";

import { AuthTypes } from "../../../../types/pages/Authorization";
import { IPrivateDataForm } from "../../../../types/components/ComponentsTypes";
import { ICountryData, TChangeUserProfileDataRequest } from "../../../../types/api/PersonalAccount";
import AppInput from "../../../../ui/appInput/AppInput";
import { RadioButton } from "../../../../ui/radio/radioButton";
import Button from "../../../../ui/Button/Button";
import { updateUserProfileData } from "../../../../services/api/userProfile/updateUserData";
import { userDataSelector } from "../../../../services/redux/features/userData/UserDataSelector";
import { countriesDataSelector } from "../../../../services/redux/features/countriesData/countriesDataSelector";
import { ButtonType } from "../../../../helpers/buttonFieldValues";
import { InputTypeList } from "../../../../helpers/Input";
import { ruCountryNumber } from "../../../../helpers/userDataConstants";
import { mockBaseUrl } from "../../../../mocks/envConsts";

import styles from "./privateProfilePrivateData.module.scss";

export const PrivateProfilePrivateData = () => {
	const userData = useAppSelector(userDataSelector);
	const countriesData = useAppSelector(countriesDataSelector);
	const { setUserData } = useActions();

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

	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);

	const userProfileData = userData.userData;

	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);

	const isVkAuth = localStorage.getItem("authType") === AuthTypes.vkServiceAuth;

	useEffect(() => {
		resetFieldsData();

		return () => {
			resetFieldsData();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function getCountryID(countryTitle: string, countriesData: ICountryData[]): number {
		const upperCaseCountryTitle = countryTitle.toUpperCase();
		const country = countriesData.find((countryData) => countryData.name === upperCaseCountryTitle);

		return country ? country.id : ruCountryNumber;
	}

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
			country: getCountryID(data.countryName, countriesData),
			avatar: userProfileData.avatar,
			defaultAvatar: userProfileData.defaultAvatar,
		};

		const updateUserDataResponse = await updateUserProfileData(updatingUserDataRequest, baseUrl);
		const updatedData = updateUserDataResponse?.data ?? updateUserDataResponse;
		setUserData(updatedData);
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
					disabled={isVkAuth}
				/>
				<div className={styles.privateDataRadioButtons}>
					<RadioButton control={control} name="gender" value="M" label="Муж." />
					<RadioButton control={control} name="gender" value="F" label="Жен." />
				</div>
				<AppInput
					label={"Введите страну"}
					type={"text"}
					name={"countryName"}
					control={control}
					placeholder="Введите страну"
					disabled={isVkAuth}
				/>
				<AppInput label={"Email"} type={"text"} name={"email"} control={control} placeholder="my@email.ru" disabled />
			</div>
			{userData.error && <p className={styles.error}>{userData.error}</p>}
			<Button variant={ButtonType.Outlined} type={InputTypeList.Submit} disabled={isVkAuth}>
				Сохранить
			</Button>
			{isVkAuth && <p className={styles.privateDataFormError}>Нельзя отредактировать данные профиля</p>}
		</form>
	);
};
