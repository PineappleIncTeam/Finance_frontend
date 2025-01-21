"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import axios from "axios";

import { format } from "date-fns";

import userAvatar from "../../../assets/components/userProfile/userPhoto.svg";
import burgerIcon from "../../../assets/components/userProfile/burger.svg";
import NavBar from "../navBar/navBar";
import infoIcon from "../../../assets/components/userProfile/infoIcon.svg";

import { IUserProfileSidebar } from "../../../types/common/ComponentsProps";
import { MainPath } from "../../../services/router/routes";

import { logoutUser } from "../../../services/api/auth/Logout";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";
import { BurgerMenu } from "../burgerMenu/burgerMenu";
import { SidebarMenu, sidebarNavMenu } from "../userProfileSidebarMenu/userProfileSidebarMenu";

import style from "./userProfileSidebar.module.scss";

const UserProfileSidebar = ({ avatar, name, balance }: IUserProfileSidebar) => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [baseUrl, setBaseUrl] = useState<string>();
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [selectedMenuItem, setSelectedMenuItem] = useState<string>("Личные данные");
	const laptopWindowSize = 1100;

	const router = useRouter();

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const handleLogout = async () => {
		try {
			if (baseUrl) {
				await logoutUser(baseUrl);
				router.push(MainPath.Main);
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
		}
	};

	const handleOpenItemClick = (title: string) => {
		setShowMenu(true);
		setSelectedMenuItem(title);
	};

	const handleItemClick = (title: string) => {
		setSelectedMenuItem(title);
	};

	const handleOpenMenu = () => {
		if (window.innerWidth <= laptopWindowSize) {
			setShowMenu(true);
		}
	};

	const renderSelectedMenuItem = () => {
		const selectedMenu = sidebarNavMenu.find((sidebarNavMenuItem) => sidebarNavMenuItem.title === selectedMenuItem);
		if (selectedMenu) {
			const SelectedComponent = selectedMenu.content;
			return <SelectedComponent />;
		} else {
			return <></>;
		}
	};

	return (
		<>
			<BurgerMenu showMenu={showMenu} setShowMenu={setShowMenu}>
				<div className={style.burgerMenu__wrapper}>
					{renderSelectedMenuItem()}
					<SidebarMenu handleClick={handleItemClick} />
				</div>
			</BurgerMenu>
			<div className={style.userProfileWrap}>
				<div className={style.userProfileHeader}>
					<Link href={""}>
						<p className={style.userProfileHeader__link}>FAQ</p>
					</Link>
					<Link href={""}>
						<p className={style.userProfileHeader__link}>Поддержка</p>
					</Link>
					<div role="button" onClick={handleLogout} className={style.exit}>
						<Image src={infoIcon} alt={"info"} />
					</div>
				</div>
				<div className={style.userProfileMain}>
					<div className={style.userProfileContainer}>
						<div className={style.userInformationWrap} onClick={handleOpenMenu} role="button">
							<div className={style.userInformationWrap_images}>
								<button className={style.userInformationWrap_images_action}>
									<Image src={avatar || userAvatar} alt={"userAvatar"} className={style.userInformationWrap__avatar} />
								</button>
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
						<div className={style.sidebarMenuWrapper}>
							<SidebarMenu handleClick={handleOpenItemClick} />
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
