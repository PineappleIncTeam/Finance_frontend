"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import cn from "classnames";
import axios, { AxiosResponse } from "axios";

import useAppSelector from "../../../hooks/useAppSelector";

import { IValidateTokenResponse } from "../../../types/api/Auth";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";
import autoLoginSelector from "../../../services/redux/features/autoLogin/autoLoginSelector";
import { validateToken } from "../../../services/api/auth/validateToken";
import { MainPath, UserProfilePath } from "../../../services/router/routes";
import { mockLocalhostStr, mockLocalhostUrl } from "../../../services/api/auth/apiConstants";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import logo from "../../../assets/layouts/main/logo.webp";
import burger from "../../../assets/layouts/main/burger.svg";
import closeElement from "../../../assets/layouts/main/closeElement.svg";

import HeaderButton from "../headerButton/headerButton";

import styles from "./mainHeader.module.scss";

const MainHeader = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);
	const [baseUrl, setBaseUrl] = useState<string>();
	const modalRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	const { isAutoLogin } = useAppSelector(autoLoginSelector);

	const handleClickOutside = (
		event: MouseEvent,
		modalRef: RefObject<HTMLDivElement | null>,
		setOpen: Dispatch<SetStateAction<boolean>>,
	) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		try {
			const isLocalhost =
				window.location.hostname.includes(mockLocalhostStr) || window.location.hostname.includes(mockLocalhostUrl);

			const isActivationPage = MainPath.ActivationPage === pathname;

			if (baseUrl && !isLocalhost && !isActivationPage) {
				validateToken(baseUrl).then((response: AxiosResponse<IValidateTokenResponse>) => {
					if (isAutoLogin && response.status === axios.HttpStatusCode.Ok) {
						return router.push(UserProfilePath.ProfitMoney);
					}
				});
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
			if (isAutoLogin) {
				return router.push(MainPath.Login);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [baseUrl, isAutoLogin, router]);

	useEffect(() => {
		const handleDocumentClick = (event: MouseEvent) => {
			if (modalRef.current) {
				handleClickOutside(event, modalRef, setOpen);
			}
		};
		if (open) {
			document.addEventListener("mousedown", handleDocumentClick);
		} else {
			document.removeEventListener("mousedown", handleDocumentClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleDocumentClick);
		};
	}, [open]);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	const renderNavigationElements = () => {
		return (
			<>
				<Link href={MainPath.Main}>
					<p className={cn(styles.navigationLink, { [styles.navigationActiveLink]: pathname === MainPath.Main })}>
						Главная
					</p>
				</Link>
				<Link href={MainPath.AboutUs}>
					<p className={cn(styles.navigationLink, { [styles.navigationActiveLink]: pathname === MainPath.AboutUs })}>
						О нас
					</p>
				</Link>
				<Link href={MainPath.AboutApp}>
					<p className={cn(styles.navigationLink, { [styles.navigationActiveLink]: pathname === MainPath.AboutApp })}>
						О приложении
					</p>
				</Link>
				<Link href={MainPath.Blog}>
					<p className={cn(styles.navigationLink, { [styles.navigationActiveLink]: pathname === MainPath.Blog })}>
						Блог
					</p>
				</Link>
			</>
		);
	};

	const renderModalWindow = () => {
		return (
			open && (
				<div className={styles.modalWindowWrap} ref={modalRef}>
					<div className={styles.modalWindowContainer}>
						<div className={styles.menuWrap}>
							<p className={styles.menuWrap__title}>Меню</p>
							<button onClick={() => setOpen(false)}>
								<Image src={closeElement} alt="Крестик" width={24} height={24} />
							</button>
						</div>
						<nav className={styles.navigatingWrap}>{renderNavigationElements()}</nav>
						<div className={styles.authLinkWrap}>
							<Link href={MainPath.SignUp}>
								<HeaderButton variant={"outlined"}>Регистрация</HeaderButton>
							</Link>
							<Link href={MainPath.Login}>
								<HeaderButton variant={"contained"}>Вход</HeaderButton>
							</Link>
						</div>
					</div>
				</div>
			)
		);
	};

	return (
		<header className={styles.headerWrap}>
			<div className={styles.headerContainer}>
				<Link href={MainPath.Main} className={styles.logoLink}>
					<Image src={logo} alt="Логотип" width={284} height={56} className={styles.headerContainer__img} />
				</Link>
				<button onClick={() => setOpen(!open)}>
					<Image src={burger} alt="Бургер" width={74} height={30} className={styles.headerContainer__burger} />
				</button>
				{renderModalWindow()}
				<nav className={styles.navigationWrap}>{renderNavigationElements()}</nav>
				<div className={styles.authWrap}>
					<Link href={MainPath.Login}>
						<HeaderButton variant={"contained"}>Вход</HeaderButton>
					</Link>
					<Link href={MainPath.SignUp}>
						<HeaderButton variant={"outlined"}>Регистрация</HeaderButton>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default MainHeader;
