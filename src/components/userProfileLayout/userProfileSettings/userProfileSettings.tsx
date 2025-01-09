import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import Button from "../../../ui/button/button";
import { IChangePasswordForm, IPrivateDataFrom } from "../../../types/pages/userProfileSettings";
import AppInput from "../../../ui/appInput/AppInput";
import arrowRightIcon from "../../../assets/components/userProfile/arrowRight.svg";
import navigationArrowIcon from "../../../assets/components/userProfile/navigationArrow.svg";
import { MainPath } from "../../../services/router/routes";
import { TCommonFunction } from "../../../types/common/ComponentsProps";

import { RadioButton } from "../../../ui/radio/radioButton";

import style from "./userProfileSettings.module.scss";

export const PrivateData = () => {
	const { control } = useForm<IPrivateDataFrom>({
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
		<div className={style.wrapper}>
			<form className={style.form}>
				<div className={style.title}>Личные данные</div>
				<AppInput
					label={"Nickname"}
					type={"text"}
					control={control}
					name="nickname"
					rules={{ maxLength: 32 }}
					error={"Не более 32 символов"}
				/>
				<div className={style.radioButtons}>
					<RadioButton control={control} name="gender" value="male" label="Муж." />
					<RadioButton control={control} name="gender" value="female" label="Жен." />
				</div>
				<AppInput label={"Введите страну"} type={"text"} name={"country"} control={control} />
				<AppInput label={"Email"} type={"text"} name={"email"} control={control} disabled />
				<Button content={"Сохранить"} styleName={"buttonPrivateProfileSidebar"} type={"submit"} />
			</form>
			<SidebarMenu />
		</div>
	);
};

export const ChangePassword = () => {
	const { control } = useForm<IChangePasswordForm>({
		mode: "all",
		delayError: 200,
	});
	return (
		<div className={style.wrapper}>
			<form className={style.form}>
				<div className={style.title}>Смена пароля</div>
				<AppInput label={"Текущий пароль"} type={"password"} control={control} name="oldPassword" />
				<AppInput label={"Новый пароль"} type={"password"} name={"newPassword"} control={control} />
				<AppInput label={"Подтвердить пароль"} type={"password"} name={"repeatPassword"} control={control} />
				<Button content={"Сохранить"} styleName={"buttonPrivateProfileSidebar"} type={"submit"} />
			</form>
			<SidebarMenu />
		</div>
	);
};

const renderProfileFunctions = (title: string, onClick?: TCommonFunction) => {
	return (
		<button className={style.profileFunctionsWrap} onClick={onClick}>
			<p className={style.profileFunctionsWrap__title}>{title}</p>
			<Image src={arrowRightIcon} alt={""} />
		</button>
	);
};

const renderNavigationElements = (title: string, link?: string) => {
	return (
		<Link href={link || "#"}>
			<div className={style.navigationElementsWrap}>
				<p className={style.navigationElements__title}>{title}</p>
				<Image src={navigationArrowIcon} alt={""} />
			</div>
		</Link>
	);
};

export const SidebarMenu = () => {
	return (
		<div className={style.sidebarNav}>
			<div className={style.userProfileFunctions}>
				{renderProfileFunctions("Личные данные")}
				{renderProfileFunctions("Аватар")}
				{renderProfileFunctions("Сменить пароль")}
				{renderProfileFunctions("Настройки")}
				{renderProfileFunctions("Архив")}
			</div>
			<div className={style.userProfileNavigation}>
				{renderNavigationElements("О приложении", MainPath.AboutUs)}
				{renderNavigationElements("Блог", MainPath.Blog)}
			</div>
		</div>
	);
};
