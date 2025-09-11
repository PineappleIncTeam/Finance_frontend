import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../../../services/redux/hooks/useAppDispatch";
import { useAppSelector } from "../../../../services/redux/hooks/useAppSelector";

import { IPrivateAppSettings } from "../../../../types/pages/userProfileSettings";
import { Selector } from "../../../../ui/selector/Selector";
import Switcher from "../../../../ui/switcher/switcher";
import Button from "../../../../ui/Button/Button";
import { userSelector } from "../../../../services/redux/features/userData/UserDataSelector";
import { userDataActions } from "../../../../services/redux/features/userData/UserDataActions";
import { ButtonType } from "../../../../helpers/buttonFieldValues";
import { InputTypeList } from "../../../../helpers/Input";

import { DeleteIcon } from "../../../../assets/script/expenses/DeleteIcon";

import styles from "./privateProfilePrivateAppSettings.module.scss";

export const PrivateProfilePrivateAppSettings = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const currentSettings = user?.settings || { currency: "USD", theme: "light", assistant: false };

	const { control, handleSubmit } = useForm<IPrivateAppSettings>({
		defaultValues: {
			currency: currentSettings.currency,
			darkTheme: currentSettings.theme === "dark",
			finAssistant: currentSettings.assistant,
		},
		mode: "all",
		delayError: 200,
	});

	const onSubmit = (data: IPrivateAppSettings) => {
		const payload = {
			currency: data.currency,
			darkTheme: data.darkTheme,
			finAssistant: data.finAssistant,
		};
		dispatch(userDataActions.update({ settings: payload }));
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
