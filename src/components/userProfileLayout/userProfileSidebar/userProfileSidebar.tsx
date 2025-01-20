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

import styles from "./userProfileSidebar.module.scss";

const UserProfileSidebar = ({ avatar, name, balance }: IUserProfileSidebar) => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const today = new Date();
		const day = today.getDate().toString().padStart(2, "0");
		const month = (today.getMonth() + 1).toString().padStart(2, "0");
		const year = today.getFullYear().toString().slice(LastTwoDigits.LAST_TWO_DIGITS);

		const formattedDate = `${day}.${month}.${year}`;
		setCurrentDate(formattedDate);
	}, []);

	const renderProfileFunctions = (title: string, onClick?: TCommonFunction) => {
		return (
			<button className={styles.profileFunctionsWrap} onClick={onClick}>
				<p className={styles.profileFunctionsWrap__title}>{title}</p>
				<Image src={arrowRightIcon} alt={""} />
			</button>
		);
	};

	const renderNavigationElements = (title: string, link?: string) => {
		return (
			<Link href={link || "#"}>
				<div className={styles.navigationElementsWrap}>
					<p className={styles.navigationElements__title}>{title}</p>
					<Image src={navigationArrowIcon} alt={""} />
				</div>
			</Link>
		);
	};

	return (
		<>
			<div className={styles.userProfileWrap}>
				<div className={styles.userProfileContainer}>
					<div className={styles.userInformationWrap}>
						<div className={styles.userInformationWrap_images}>
							<button className={styles.userInformationWrap_images_action}>
								<Image src={avatar || userAvatar} alt={"userAvatar"} className={styles.userInformationWrap__avatar} />
							</button>
							<Image src={editProfileIcon} alt={"editProfile"} className={styles.userInformationWrap__edit} />
						</div>
						<p className={styles.userInformationWrap__name}>{name || "Имя"}</p>
						<div className={styles.userInformationWrap__adaptive}>
							<p className={styles.userInformationWrap__date}>Ваш баланс на {currentDate}</p>
							<p className={styles.userInformationWrap__balance}>{balance || 0} ₽</p>
						</div>
					</div>
					<div className={styles.userProfileFunctions}>
						{renderProfileFunctions("Личные данные")}
						{renderProfileFunctions("Сменить пароль")}
						{renderProfileFunctions("Настройки")}
						{renderProfileFunctions("Архив")}
					</div>
					<div className={styles.userProfileNavigation}>
						{renderNavigationElements("О приложении", MainPath.AboutUs)}
						{renderNavigationElements("Блог", MainPath.Blog)}
					</div>
					<button onClick={() => setIsOpen(!isOpen)} className={styles.burgerActionWrap}>
						<Image src={burgerIcon} alt={"burger"} className={styles.burgerActionWrap_icon} />
					</button>
				</div>
			</div>
			{isOpen && <NavBar onClick={() => setIsOpen(!isOpen)} />}
		</>
	);
};

export default UserProfileSidebar;
