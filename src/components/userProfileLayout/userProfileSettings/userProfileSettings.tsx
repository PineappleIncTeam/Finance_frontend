import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import { IChangePasswordForm, IPrivateDataFrom, IUserAvatar } from "../../../types/pages/userProfileSettings";
import arrowRightIcon from "../../../assets/components/userProfile/arrowRight.svg";
import navigationArrowIcon from "../../../assets/components/userProfile/navigationArrow.svg";
import { MainPath } from "../../../services/router/routes";
import { TCommonFunction } from "../../../types/common/ComponentsProps";

import AppInput from "../../../ui/appInput/AppInput";
import Button from "../../../ui/button/button";
import { RadioButton } from "../../../ui/radio/radioButton";

import userAvatar from "../../../assets/components/userProfile/userPhoto.svg";
import editProfileIcon from "../../../assets/components/userProfile/editProfile.svg";
import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import ResetIcon from "../../../assets/script/privateProfileNavBar/ResetIcon";
import { archiveList } from "../../../mocks/PrivateProfileArchive";
import { Tooltip } from "../tooltip/tooltip";

import { AvatarTemplates } from "../../../mocks/AvatarTemplates";

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

const ArchiveItem = ({ value, key }: { value: string; key: number }) => {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);
	return (
		<div className={style.archiveItem} key={key}>
			<p className={style.archiveItem__title}>{value}</p>
			<div className={style.archiveItem__icons}>
				<DeleteIcon classNames={style.archiveItem__icon} />
				<div
					onMouseMove={() => setIsTooltipShown(true)}
					onMouseOut={() => setIsTooltipShown(false)}
					className={style.resetWrapper}>
					<ResetIcon classNames={style.archiveItem__icon} color={"var(--color-very-dark-grayish-blue)"} />
					<Tooltip open={isTooltipShown} text={"Восстановить"} />
				</div>
			</div>
		</div>
	);
};

export const Archive = () => {
	return (
		<div className={style.wrapper}>
			<div className={style.form}>
				<div className={style.title}>Архив</div>
				<div className={style.archive__items}>
					{archiveList.map((el, index) => {
						return <ArchiveItem value={el} key={index} />;
					})}
				</div>
			</div>
			<SidebarMenu />
		</div>
	);
};

export const AvatarSettings = () => {
	const { register } = useForm<IUserAvatar>({
		mode: "all",
		delayError: 200,
	});
	return (
		<div className={style.wrapper}>
			<form className={style.form}>
				<div className={style.title}>Аватар</div>
				<div className={style.avatar__wrapper}>
					<div className={style.avatar__picture}>
						<Image src={userAvatar} alt={"userAvatar"} className={style.avatar__image} />
						<div className={style.avatar__editButtonWrapper}>
							<label htmlFor="userAvatar" className={style.avatar__editButton}>
								<input type="file" id="userAvatar" className={style.avatar__input} {...register("personalAvatar")} />
								<Image src={editProfileIcon} alt={"editProfile"} className={style.avatar__editIcon} />
							</label>
						</div>
					</div>
				</div>
				<div className={style.avatarTemplates}>
					{AvatarTemplates.map((avatar, index) => (
						<div className={style.avatarTemplates__picture} key={index}>
							<input
								type="radio"
								id={`template-avatar-${index}`}
								value={avatar}
								{...register("templateAvatar")}
								className={style.templateAvatar__input}
							/>
							<label htmlFor={`template-avatar-${index}`} className={style.templateAvatar__label}>
								<Image src={avatar} className={style.avatarTemplates__img} alt={""} />
							</label>
						</div>
					))}
				</div>
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
