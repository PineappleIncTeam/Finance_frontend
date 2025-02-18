import { useForm } from "react-hook-form";

import { IPrivateAppSettings } from "../../../types/pages/userProfileSettings";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { Selector } from "../../../ui/selector/Selector";
import Switcher from "../../../ui/switcher/switcher";

import Button from "../../../ui/Button/button";
import { ButtonType } from "../../../helpers/buttonFieldValues";
import { InputTypeList } from "../../../helpers/Input";

import styles from "./userProfilePrivateAppSettings.module.scss";

export const UserProfilePrivateAppSettings = () => {
	const { control } = useForm<IPrivateAppSettings>({
		mode: "all",
		delayError: 200,
	});
	return (
		<form className={styles.privateAppSettingsFormWrap}>
			<p className={styles.privateAppSettingsFormWrap__title}>Настройки</p>
			<div className={styles.privateAppSettingsFormContainer}>
				<Selector
					name={"currency"}
					label="Валюта"
					options={["Российский рубль", "Американский доллар"]}
					control={control}
				/>
				<Switcher control={control} name={"darkTheme"} label={"Темная тема"} />
				<Switcher control={control} name={"finAssistant"} label={"Финансовый помощник"} />
				<div className={styles.privateAppSettingsRemoveButton}>
					<DeleteIcon classNames={styles.privateAppSettingsRemoveButton__icon} />
					<div className={styles.privateAppSettingsRemoveButton__title}>Удалить аккаунт</div>
				</div>
			</div>
			<Button variant={ButtonType.Outlined} type={InputTypeList.Submit}>
				Сохранить
			</Button>
		</form>
	);
};
