"use client";

import { useForm } from "react-hook-form";

import { useAppSelector } from "../../../../services/redux/hooks/useAppSelector";
import { useAppDispatch } from "../../../../services/redux/hooks/useAppDispatch";

import { IPrivateAppSettingsForm } from "../../../../types/components/ComponentsTypes";
import { IUserSettingsState } from "../../../../types/redux/StateTypes";
import Switcher from "../../../../ui/switcher/switcher";
import { Selector } from "../../../../ui/selector/Selector";
import Button from "../../../../ui/Button/Button";
import { userSettingsSelector } from "../../../../services/redux/features/userSettings/userSettingsSelector";
import { setUserSettings } from "../../../../services/redux/features/userSettings/userSettingsSlice";
import { InputTypeList } from "../../../../helpers/Input";
import { ButtonType } from "../../../../helpers/buttonFieldValues";

import { DeleteIcon } from "../../../../assets/script/expenses/DeleteIcon";

import styles from "./privateProfilePrivateAppSettings.module.scss";

export const PrivateProfilePrivateAppSettings = () => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector(userSettingsSelector);

	const { control, handleSubmit } = useForm<IPrivateAppSettingsForm>({
		defaultValues: {
			currency: userData.currency,
			darkTheme: userData.theme === "dark",
			finAssistant: userData.assistant,
		},
	});

	const onSubmit = async (data: IPrivateAppSettingsForm) => {
		dispatch(
			setUserSettings({
				assistant: data.finAssistant,
				theme: userData.theme === "dark" ? "dark" : "light",
				currency: data.currency,
			} as IUserSettingsState),
		);
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
