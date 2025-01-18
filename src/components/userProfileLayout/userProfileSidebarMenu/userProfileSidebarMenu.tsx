import Image from "next/image";
import Link from "next/link";

import arrowRightIcon from "../../../assets/components/userProfile/arrowRight.svg";
import navigationArrowIcon from "../../../assets/components/userProfile/navigationArrow.svg";
import { MainPath } from "../../../services/router/routes";
import { PrivateData } from "../userProfilePrivateData/userProfilePrivateData";
import { AvatarSettings } from "../userProfileAvatarSettings/userProfileAvatarSettings";
import { ChangePassword } from "../userProfileChangePassword/userProfileChangePassword";
import { PrivateAppSettings } from "../userProfilePrivateAppSettings/userProfilePrivateAppSettings";
import { Archive } from "../userProfileArchive/userProfileArchive";

import style from "./userProfileSidebarMenu.module.scss";

const renderProfileItem = (title: string, handleClick: (title: string) => void) => {
	return (
		<button className={style.profileItem__wrapper} onClick={() => handleClick(title)} key={title}>
			<p className={style.profileItem__title}>{title}</p>
			<Image src={arrowRightIcon} alt={""} className={style.profileItem__icon} />
		</button>
	);
};

const renderNavItem = (title: string, link?: string) => {
	return (
		<Link href={link || "#"}>
			<div className={style.navItem__wrapper}>
				<p className={style.navItem__title}>{title}</p>
				<Image src={navigationArrowIcon} alt={""} className={style.navItem__icon} />
			</div>
		</Link>
	);
};

export const sidebarNavMenu = [
	{ title: "Личные данные", content: PrivateData },
	{ title: "Аватар", content: AvatarSettings },
	{ title: "Сменить пароль", content: ChangePassword },
	{ title: "Настройки", content: PrivateAppSettings },
	{ title: "Архив", content: Archive },
];

export const SidebarMenu = ({ handleClick }: { handleClick: (title: string) => void }) => {
	return (
		<div className={style.sidebar__nav}>
			<div className={style.sidebar__profileItems}>
				{sidebarNavMenu.map((menuItem) => renderProfileItem(menuItem.title, handleClick))}
			</div>
			<div className={style.sidebar__navItems}>
				{renderNavItem("О приложении", MainPath.AboutUs)}
				{renderNavItem("Блог", MainPath.Blog)}
			</div>
		</div>
	);
};
