"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { LastTwoDigits } from "../../../helpers/lastTwoDigits";

import arrowRightIcon from "../../../assets/components/userProfile/arrowRight.svg";
import { IUserProfileSidebar, TCommonFunction } from "../../../types/common/ComponentsProps";
import navigationArrowIcon from "../../../assets/components/userProfile/navigationArrow.svg";
import userAvatar from "../../../assets/components/userProfile/userPhoto.svg";
import { MainPath } from "../../../services/router/routes";
import burgerIcon from "../../../assets/components/userProfile/burger.svg";
import NavBar from "../navBar/navBar";
import editProfileIcon from "../../../assets/components/userProfile/editProfile.svg";
import infoIcon from "../../../assets/components/userProfile/infoIcon.svg";

import { logoutUser } from "../../../services/api/auth/Logout";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import style from "./userProfileSidebar.module.scss";

const UserProfileSidebar = ({ avatar, name, balance }: IUserProfileSidebar) => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [baseUrl, setBaseUrl] = useState<string>();

	const router = useRouter();

	useEffect(() => {
		const today = new Date();
		const day = today.getDate().toString().padStart(2, "0");
		const month = (today.getMonth() + 1).toString().padStart(2, "0");
		const year = today.getFullYear().toString().slice(LastTwoDigits.LAST_TWO_DIGITS);

		const formattedDate = `${day}.${month}.${year}`;
		setCurrentDate(formattedDate);
	}, []);

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
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

	const handleLogout = async () => {
		try {
			if (baseUrl) {
				await logoutUser(baseUrl);
				router.push(MainPath.Main);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<div className={style.userProfileWrap}>
				<div className={style.header}>
					<Link href={""}>
						<p className={style.header__link}>FAQ</p>
					</Link>
					<Link href={""}>
						<p className={style.header__link}>Поддержка</p>
					</Link>
					<div onClick={handleLogout} className={style.exit}>
						<Image src={infoIcon} alt={"info"} />
					</div>
				</div>
				<div className={style.userProfileMain}>
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
								<div className={style.userInformationWrap__date}>
									<p>Ваш баланс на</p>
									<p>{currentDate}</p>
								</div>
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
			</div>
			{isOpen && <NavBar onClick={() => setIsOpen(!isOpen)} />}
		</>
	);
};

export default UserProfileSidebar;
