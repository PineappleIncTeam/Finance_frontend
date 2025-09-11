"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

import { IPrivateProfileSidebar } from "../../../../types/common/ComponentsProps";
import NavBar from "../../navBar/navBar";
import { BurgerMenu } from "../../burgerMenu/burgerMenu";
import { PrivateProfileSidebarMenu } from "../sidebarMenu/privateProfileSidebarMenu";
import { MainPath } from "../../../../services/router/routes";
import { logoutUser } from "../../../../services/api/auth/Logout";
import { getCorrectBaseUrl } from "../../../../utils/baseUrlConverter";
import { ApiResponseCode } from "../../../../helpers/apiResponseCode";
import { sidebarNavMenu } from "../../../../helpers/sidebarNavMenu";
import useAppSelector from "../../../../hooks/useAppSelector";
import { userSelector } from "../../../../services/redux/features/userData/UserDataSelector";
import { userDataActions } from "../../../../services/redux/features/userData/UserDataActions";

import defaultAvatar from "../../../../assets/components/userProfile/userPhoto.svg";
import burgerIcon from "../../../../assets/components/userProfile/burger.svg";
import infoIcon from "../../../../assets/components/userProfile/infoIcon.svg";

import styles from "./privateProfileSidebar.module.scss";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateProfileSidebarBlock = ({ avatar, name, balance }: IPrivateProfileSidebar) => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [baseUrl, setBaseUrl] = useState<string>();
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [selectedMenuItem, setSelectedMenuItem] = useState<string>("Личные данные");

	const userSlice = useAppSelector(userSelector);
	const userName = userSlice?.userData?.name || "Имя";
	const userAvatar = userSlice?.userData?.avatar || defaultAvatar;
	const dispatch = useDispatch();

	const laptopWindowSize = 1100;

	const router = useRouter();

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));
		setBaseUrl(getCorrectBaseUrl());
		dispatch(userDataActions.fetch());
	}, [dispatch]);

	const handleLogout = async () => {
		try {
			if (baseUrl) {
				const response = await logoutUser(baseUrl);
				if (response.status >= axios.HttpStatusCode.Ok && response.status < axios.HttpStatusCode.MultipleChoices) {
					router.push(MainPath.Main);
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.BadRequest &&
				error.response.status < axios.HttpStatusCode.InternalServerError
			) {
				router.push(MainPath.Main);
			}
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
			<div className={styles.userProfileWrap}>
				<div className={styles.userProfileHeader}>
					<Link href={""}>
						<p className={styles.userProfileHeader__link}>FAQ</p>
					</Link>
					<Link href={""}>
						<p className={styles.userProfileHeader__link}>Поддержка</p>
					</Link>
					<div role="button" onClick={handleLogout} className={styles.exit}>
						<Image src={infoIcon} alt={"info"} />
					</div>
				</div>
				<div className={styles.userProfileMain}>
					<div className={styles.userProfileContainer}>
						<div className={styles.userInformationWrap} onClick={handleOpenMenu} role="button">
							<div className={styles.userInformationWrap_images}>
								<button className={styles.userInformationWrap_images_action}>
									<Image src={userAvatar} alt={"userAvatar"} className={styles.userInformationWrap__avatar} />
								</button>
							</div>
							<p className={styles.userInformationWrap__name}>{userName}</p>
							<div className={styles.userInformationAdaptiveContainer}>
								<div className={styles.userInformationDateWrap}>
									<p>Ваш баланс на</p>
									<p>{currentDate}</p>
								</div>
								<p className={styles.userInformationAdaptiveContainer__balance}>{balance || 0} ₽</p>
							</div>
						</div>
						<div className={styles.sidebarMenuWrapper}>
							<PrivateProfileSidebarMenu handleClick={handleOpenItemClick} />
						</div>

						<button onClick={() => setIsOpen(!isOpen)} className={styles.burgerActionWrap}>
							<Image src={burgerIcon} alt={"burger"} className={styles.burgerActionWrap_icon} />
						</button>
					</div>
				</div>
			</div>
			{isOpen && <NavBar onClick={() => setIsOpen(!isOpen)} />}
			<BurgerMenu showMenu={showMenu} setShowMenu={setShowMenu}>
				<div className={styles.burgerMenu__wrapper}>
					{renderSelectedMenuItem()}
					<PrivateProfileSidebarMenu handleClick={handleItemClick} />
				</div>
			</BurgerMenu>
		</>
	);
};

export default PrivateProfileSidebarBlock;
