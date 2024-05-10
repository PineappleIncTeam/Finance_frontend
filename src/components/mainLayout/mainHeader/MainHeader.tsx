"use client";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

import { useState } from "react";

import cn from "classnames";

import { MainPath } from "../../../services/router/routes";
import { Button } from "../../../ui/button/Button";
import logo from "../../../assets/layouts/main/logo.png";
import burger from "../../../assets/layouts/main/burger.svg";
import closeElement from "../../../assets/layouts/main/closeElement.svg";

import styles from "./MainHeader.module.css";

const MainHeader = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

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
				<div className={styles.modalWindowWrap}>
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
				<Link href={MainPath.Main}>
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
