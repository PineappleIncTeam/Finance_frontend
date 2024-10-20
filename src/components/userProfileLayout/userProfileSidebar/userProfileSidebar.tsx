"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LastTwoDigits } from "../../../helpers/lastTwoDigits";

import arrowRightIcon from "../../../assets/components/userProfile/arrowRight.svg";
import { IUserProfileSidebar, TCommonFunction } from "../../../types/common/ComponentsProps";
import navigationArrowIcon from "../../../assets/components/userProfile/navigationArrow.svg";
import userAvatar from "../../../assets/components/userProfile/userPhoto.svg";
import { MainPath } from "../../../services/router/routes";
import burgerIcon from "../../../assets/components/userProfile/burger.svg";
import NavBar from "../navBar/navBar";
import editProfileIcon from "../../../assets/components/userProfile/editProfile.svg";

import style from "./userProfileSidebar.module.scss";

const UserProfileSidebar = ({ avatar, name, balance }: IUserProfileSidebar) => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const today = new Date();
		const day = today.getDate().toString().padStart(2, "0");
		const month = (today.getMonth() + 1).toString().padStart(2, "0");
		const year = today.getFullYear().toString().slice(LastTwoDigits.LAST_TWO_DIGITS);

		const formattedDate = `${day}.${month}.${year}`;
		setCurrentDate(formattedDate); // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	return (
		<>
			<div className={style.userProfileWrap}>
				<div className={style.userProfileContainer}>
					<div className={style.userInformationWrap}>
						<div className={style.userInformationWrap_images}>
							<button className={style.userInformationWrap_images_action}>
								<Image src={avatar || userAvatar} alt={"userAvatar"} className={style.userInformationWrap__avatar} />
							</button>
							<Image src={editProfileIcon} alt={"editProfile"} className={style.userInformationWrap__edit} />
						</div>
						<p className={style.userInformationWrap__name}>{name || "Имя"}</p>
						<div className={style.userInformationWrap__adaptive}>
							<p className={style.userInformationWrap__date}>Ваш баланс на {currentDate}</p>
							<p className={style.userInformationWrap__balance}>{balance || 0} ₽</p>
						</div>
					</div>
					<div className={style.userProfileFunctions}>
						{renderProfileFunctions("Личные данные")}
						{renderProfileFunctions("Сменить пароль")}
						{renderProfileFunctions("Настройки")}
						{renderProfileFunctions("Архив")}
					</div>
					<div className={style.userProfileNavigation}>
						{renderNavigationElements("О приложении", MainPath.AboutUs)}
						{renderNavigationElements("Блог", MainPath.Blog)}
					</div>
					<button onClick={() => setIsOpen(!isOpen)} className={style.burgerActionWrap}>
						<Image src={burgerIcon} alt={"burger"} className={style.burgerActionWrap_icon} />
					</button>
				</div>
			</div>
			{isOpen && <NavBar onClick={() => setIsOpen(!isOpen)} />}
		</>
	);
};

export default UserProfileSidebar;
