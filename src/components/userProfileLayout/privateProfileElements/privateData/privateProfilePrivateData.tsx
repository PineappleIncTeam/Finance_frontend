import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../../../services/redux/hooks/useAppDispatch";

import { useAppSelector } from "../../../../services/redux/hooks/useAppSelector";

import { userDataActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

import { userSelector } from "../../../../services/redux/features/userData/UserDataSelector";

import { getCorrectBaseUrl } from "../../../../utils/baseUrlConverter";

import { getUserData } from "../../../../services/api/auth/getUserData";

import { updateUserData } from "../../../../services/api/auth/updateUserData";

import { ButtonType } from "../../../../helpers/buttonFieldValues";

import AppInput from "../../../../ui/appInput/AppInput";

import { RadioButton } from "../../../../ui/radio/radioButton";

import Button from "../../../../ui/Button/Button";

import { InputTypeList } from "../../../../helpers/Input";

import styles from "./privateProfilePrivateData.module.scss";

export type IPrivateDataForm = {
	nickname: string;
	gender: string;
	country: string;
	email?: string;
	avatar?: string;
};

export const PrivateProfilePrivateData: React.FC = () => {
	const dispatch = useAppDispatch();
	const { userData } = useAppSelector(userSelector);

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<IPrivateDataForm>({
		defaultValues: {
			nickname: userData?.nickname || "",
			gender: userData?.gender || "male",
			country: userData?.country || "",
			email: userData?.email || "",
			avatar: userData?.avatar || "",
		},
	});

	useEffect(() => {
		(async () => {
			dispatch(userDataActions.pending());
			try {
				const baseUrl = getCorrectBaseUrl();
				const resp = await getUserData(baseUrl);
				const data = resp?.data ?? resp;
				dispatch(userDataActions.fulfilled(data));
			} catch (err: any) {
				dispatch(userDataActions.rejected(err?.message ?? "Ошибка при загрузке профиля"));
			}
		})();
	}, [dispatch]);

	useEffect(() => {
		reset({
			nickname: userData?.nickname || "",
			gender: userData?.gender || "male",
			country: userData?.country || "",
			email: userData?.email || "",
		});
	}, [userData, reset]);

	const onSubmit = async (data: IPrivateDataForm) => {
		dispatch(userDataActions.updatePending());
		try {
			const baseUrl = getCorrectBaseUrl();
			const payload: any = {
				nickname: data.nickname,
				gender: data.gender,
				country: data.country,
			};
			const resp = await updateUserData(payload, baseUrl);
			const updated = resp?.data ?? resp;
			dispatch(userDataActions.updateFulfilled(updated));
			dispatch(userDataActions.fulfilled(updated));
		} catch (err: any) {
			dispatch(userDataActions.updateRejected(err?.message ?? "Ошибка при обновлении"));
		}
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
