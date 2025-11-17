"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";

import { useAppDispatch, useAppSelector } from "../../../../services/redux/hooks";
import { useRuntimeEnv } from "../../../../hooks/useRuntimeEnv";

import { AuthTypes } from "../../../../types/pages/Authorization";
import {
	countriesDataActions,
	userDataActions,
	balanceActions,
} from "../../../../types/redux/sagaActions/storeSaga.actions";
import NavBar from "../../navBar/navBar";
import { BurgerMenu } from "../../burgerMenu/burgerMenu";
import { PrivateProfileSidebarMenu } from "../sidebarMenu/privateProfileSidebarMenu";
import { MainPath } from "../../../../services/router/routes";
import { baseLogoutUser } from "../../../../services/api/auth/baseLogoutUser";
import { sidebarNavMenu } from "../../../../helpers/sidebarNavMenu";
import { userDataSelector } from "../../../../services/redux/features/userData/UserDataSelector";
import { balanceSelector } from "../../../../services/redux/features/userBalance/balanceSelector";
import { avatarTemplates } from "../../../../mocks/AvatarTemplates";
import { mockBaseUrl } from "../../../../mocks/envConsts";

import mockAvatar from "../../../../assets/components/userProfile/userPhoto.svg";
import burgerIcon from "../../../../assets/components/userProfile/burger.svg";
import infoIcon from "../../../../assets/components/userProfile/infoIcon.svg";

import styles from "./privateProfileSidebar.module.scss";

const PrivateProfileSidebarBlock = () => {
	const [currentDate, setCurrentDate] = useState<string>("");
	const [isNavBarOpen, setIsNavBarOpen] = useState<boolean>(false);
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [selectedMenuItem, setSelectedMenuItem] = useState<string>("Личные данные");

	const router = useRouter();
	const dispatch = useAppDispatch();
	const { currentBalance, loading } = useAppSelector(balanceSelector);

	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);

	const userData = useAppSelector(userDataSelector);

	const userProfileData = userData.userData;

	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);
	const laptopWindowSize = 1100;
	const defaultAvatarMaxIndex = 8;

	useEffect(() => {
		setCurrentDate(format(new Date(), "dd.MM.yyyy"));
	}, []);

	useEffect(() => {
		dispatch(userDataActions.pending({ baseURL: baseUrl }));
		dispatch(countriesDataActions.pending({ baseURL: baseUrl }));
		dispatch(balanceActions.pending({ baseURL: baseUrl }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const handleLogout = async () => {
		try {
			if (baseUrl) {
				const authType: AuthTypes = await ((localStorage.getItem("authType") as AuthTypes) || AuthTypes.baseAuth);

				if (authType === AuthTypes.baseAuth) {
					const response = await baseLogoutUser(baseUrl);
					if (response.status >= axios.HttpStatusCode.Ok && response.status < axios.HttpStatusCode.MultipleChoices) {
						await localStorage.removeItem("authType");

						router.push(MainPath.Main);
					}
				} else {
					// vk auth logout
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
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
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

	function renderUserAvatarImage() {
		let userAvatarSource = mockAvatar;

		if (userProfileData.avatar && userProfileData.avatar?.length) {
			userAvatarSource = userProfileData.avatar;
		} else {
			if (userProfileData.defaultAvatar !== 0 && userProfileData.defaultAvatar <= defaultAvatarMaxIndex) {
				userAvatarSource = avatarTemplates[userProfileData.defaultAvatar - 1];
			}
		}

		return <Image src={userAvatarSource} alt="userAvatar" className={styles.userInformationWrap__avatar} />;
	}

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
								<button className={styles.userInformationWrap_images_action}>{renderUserAvatarImage()}</button>
							</div>
							<p className={styles.userInformationWrap__name}>{userProfileData.nickname}</p>
							<div className={styles.userInformationAdaptiveContainer}>
								<div className={styles.userInformationDateWrap}>
									<p>Ваш баланс на</p>
									<p>{currentDate}</p>
								</div>
								<p className={styles.userInformationAdaptiveContainer__balance}>
									{loading ? "..." : `${currentBalance} ₽`}
								</p>
							</div>
						</div>
						<div className={styles.sidebarMenuWrapper}>
							<PrivateProfileSidebarMenu handleClick={handleOpenItemClick} />
						</div>

						<button onClick={() => setIsNavBarOpen(!isNavBarOpen)} className={styles.burgerActionWrap}>
							<Image src={burgerIcon} alt={"burger"} className={styles.burgerActionWrap_icon} />
						</button>
					</div>
				</div>
			</div>
			{isNavBarOpen && <NavBar onClick={() => setIsNavBarOpen(!isNavBarOpen)} />}
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
