import React from "react";

import { useForm } from "react-hook-form";

import { useAppSelector } from "../../../../services/redux/hooks/useAppSelector";

import { useAppDispatch } from "../../../../services/redux/hooks/useAppDispatch";

import { userSelector } from "../../../../services/redux/features/userData/UserDataSelector";

import { userDataActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

import { getCorrectBaseUrl } from "../../../../utils/baseUrlConverter";

import { updateUserData } from "../../../../services/api/auth/updateUserData";

import { IUserData } from "../../../../types/redux/StoreTypes";

import { InputTypeList } from "../../../../helpers/Input";
import { ButtonType } from "../../../../helpers/buttonFieldValues";

import Switcher from "../../../../ui/switcher/Switcher";
import { Selector } from "../../../../ui/selector/Selector";
import Button from "../../../../ui/Button/Button";
import { DeleteIcon } from "../../../../assets/script/expenses/DeleteIcon";

import styles from "./privateProfilePrivateAppSettings.module.scss";

export type IPrivateAppSettings = {
	currency: string;
	darkTheme: boolean;
	finAssistant: boolean;
};

export const PrivateProfilePrivateAppSettings: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const currentSettings = user?.settings || { currency: "USD", theme: "light", assistant: false };

	const { control, handleSubmit } = useForm<IPrivateAppSettings>({
		defaultValues: {
			currency: currentSettings.currency,
			darkTheme: currentSettings.theme === "dark",
			finAssistant: currentSettings.assistant,
		},
	});

	const onSubmit = async (data: IPrivateAppSettings) => {
		dispatch(userDataActions.updatePending());
		try {
			const baseUrl = getCorrectBaseUrl();
			const payload = {
				settings: {
					currency: data.currency,
					theme: data.darkTheme ? "dark" : "light",
					assistant: data.finAssistant,
				},
			} as Partial<IUserData>;
			const resp = await updateUserData(payload, baseUrl);
			const updated = resp?.data ?? resp;
			dispatch(userDataActions.updateFulfilled(updated));
			dispatch(userDataActions.fulfilled(updated));
		} catch (err: any) {
			dispatch(userDataActions.updateRejected(err?.message ?? "Ошибка при обновлении настроек"));
		}
	};

	return (
		<form className={styles.privateAppSettingsFormWrap} onSubmit={handleSubmit(onSubmit)}>
			<p className={styles.privateAppSettingsFormWrap__title}>Настройки</p>
			<div className={styles.privateAppSettingsFormContainer}>
				<Selector
					name="currency"
					label="Валюта"
					options={["Российский рубль", "Американский доллар"]}
					control={control}
					placeholder="Выбор валюты"
				/>
				<Switcher control={control} name="darkTheme" label="Темная тема" />
				<Switcher control={control} name="finAssistant" label="Финансовый помощник" />
				<div className={styles.privateAppSettingsRemoveButton}>
					<DeleteIcon classNames={styles.privateAppSettingsRemoveButton__icon} />
					<button type={InputTypeList.Button} disabled className={styles.privateAppSettingsRemoveButton__title}>
						Удалить аккаунт
					</button>
				</div>
			</div>
			<Button variant={ButtonType.Outlined} type={InputTypeList.Submit}>
				Сохранить
			</Button>
		</form>
	);
};
