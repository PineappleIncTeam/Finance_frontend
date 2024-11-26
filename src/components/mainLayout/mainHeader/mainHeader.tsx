"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import cn from "classnames";

// eslint-disable-next-line import/named
import { AxiosResponse, HttpStatusCode } from "axios";

import { MainPath, UserProfilePath } from "../../../services/router/routes";
import Button from "../../../ui/button/button";

import logo from "../../../assets/layouts/main/logo.png";
import burger from "../../../assets/layouts/main/burger.svg";
import closeElement from "../../../assets/layouts/main/closeElement.svg";

import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import userStorageSettingsSelector from "../../../services/redux/features/userStorageSettings/userStorageSettingsSelector";

import { validateToken } from "../../../services/api/auth/validateToken";
import useAppSelector from "../../../hooks/useAppSelector";

import { IValidateTokenResponse } from "../../../types/api/Auth";

import styles from "./mainHeader.module.scss";

const MainHeader = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);
	const [baseUrl, setBaseUrl] = useState<string>();
	const modalRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	const { isAutoLogin } = useAppSelector(userStorageSettingsSelector);

	const handleClickOutside = (
		event: MouseEvent,
		modalRef: RefObject<HTMLDivElement>,
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
			if (baseUrl) {
				validateToken(baseUrl).then((response: AxiosResponse<IValidateTokenResponse>) => {
					if (isAutoLogin && response.status === HttpStatusCode.Ok) {
						return router.push(UserProfilePath.ProfitMoney);
					}
				});
			}
		} catch (error) {
			if (isAutoLogin) {
				return router.push(MainPath.Login);
			}
		}
	}, [baseUrl, isAutoLogin, router]);

	useEffect(() => {
		const handleDocumentClick = (event: MouseEvent) => {
			handleClickOutside(event, modalRef, setOpen);
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
								<Button content="Регистрация" styleName="buttonForRegistration" />
							</Link>
							<Link href={MainPath.Login}>
								<Button content="Вход" styleName="buttonForLogin" />
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
						<Button content="Вход" styleName="buttonForLogin" />
					</Link>
					<Link href={MainPath.SignUp}>
						<Button content="Регистрация" styleName="buttonForRegistration" />
					</Link>
				</div>
			</div>
		</header>
	);
};

export default MainHeader;
