import { useForm } from "react-hook-form";

import { IPrivateAppSettings } from "../../../types/pages/userProfileSettings";
import Button from "../../../ui/button/button";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { NewSelect } from "../../../ui/newSelect/newSelect";
import Switcher from "../../../ui/switcher/switcher";

import style from "./userProfilePrivateAppSettings.module.scss";

export const PrivateAppSettings = () => {
	const { control } = useForm<IPrivateAppSettings>({
		mode: "all",
		delayError: 200,
	});
	return (
		<form className={style.form}>
			<div className={style.title}>Настройки</div>
			<div className={style.form__settings}>
				<NewSelect
					name={"currency"}
					label="Валюта"
					options={["Российский рубль", "Американский доллар"]}
					control={control}
				/>
				<Switcher control={control} name={"darkTheme"} label={"Темная тема"} />
				<Switcher control={control} name={"finAssistant"} label={"Финансовый помощник"} />
				<div className={style.removeButton}>
					<DeleteIcon classNames={style.removeButton__icon} />
					<div className={style.removeButton__title}>Удалить аккаунт</div>
				</div>
			</div>
			<Button content={"Сохранить"} styleName={"outlineButton"} type={"submit"} />
		</form>
	);
};
