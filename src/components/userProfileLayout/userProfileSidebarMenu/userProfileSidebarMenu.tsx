import Image from "next/image";
import Link from "next/link";

import arrowRightIcon from "../../../assets/components/userProfile/arrowRight.svg";
import navigationArrowIcon from "../../../assets/components/userProfile/navigationArrow.svg";
import { MainPath } from "../../../services/router/routes";
import { IRenderNavItem, IRenderProfileItem, ISidebarMenu } from "../../../types/common/ComponentsProps";

import { sidebarNavMenu } from "../../../helpers/sidebarNavMenu";

import style from "./userProfileSidebarMenu.module.scss";

export const UserProfileSidebarMenu = ({ handleClick }: ISidebarMenu) => {
	const renderProfileItem = ({ title, handleClick }: IRenderProfileItem) => {
		return (
			<button className={style.sidebarProfileItem__wrapper} onClick={() => handleClick(title)} key={title}>
				<p className={style.sidebarProfileItem__title}>{title}</p>
				<Image src={arrowRightIcon} alt={""} className={style.sidebarProfileItem__icon} />
			</button>
		);
	};

	const renderNavItem = ({ title, link }: IRenderNavItem) => {
		return (
			<Link href={link || "#"}>
				<div className={style.sidebarNavItem__wrapper}>
					<p className={style.sidebarNavItem__title}>{title}</p>
					<Image src={navigationArrowIcon} alt={""} className={style.sidebarNavItem__icon} />
				</div>
			</Link>
		);
	};
	return (
		<div className={style.sidebar__nav}>
			<div className={style.sidebar__profileItems}>
				{sidebarNavMenu.map((menuItem) => renderProfileItem({ title: menuItem.title, handleClick }))}
			</div>
			<div className={style.sidebar__navItems}>
				{renderNavItem({ title: "О приложении", link: MainPath.AboutUs })}
				{renderNavItem({ title: "Блог", link: MainPath.Blog })}
			</div>
		</div>
	);
};
