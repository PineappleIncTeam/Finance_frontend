"use client";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

import { useState } from "react";

import { MainPath } from "../../../services/router/routes";
import { Button } from "../../../ui/button/Button";
import logo from "../../../assets/layouts/main/logo.png";
import burger from "../../../assets/layouts/main/burger.png";
import close from "../../../assets/layouts/main/close.png";

import styles from "./MainHeader.module.css";


const MainHeader = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	const renderNavigationElements = () => {
		return (
			<>
				<Link href={MainPath.Main}>
					<p className={`${styles.header__link} ${pathname === MainPath.Main ? styles.header__activeLink : ""}`}>
						Главная
					</p>
				</Link>
				<Link href={MainPath.AboutUs}>
					<p className={`${styles.header__link} ${pathname === MainPath.AboutUs ? styles.header__activeLink : ""}`}>
						О нас
					</p>
				</Link>
				<Link href={MainPath.AboutApp}>
					<p className={`${styles.header__link} ${pathname === MainPath.AboutApp ? styles.header__activeLink : ""}`}>
						О приложении
					</p>
				</Link>
				<Link href={MainPath.Blog}>
					<p className={`${styles.header__link} ${pathname === MainPath.Blog ? styles.header__activeLink : ""}`}>
						Блог
					</p>
				</Link>
			</>
		);
	};

	return (
		<header className={styles.header}>
			<div className={styles.header__wrapper}>
				<Link href={MainPath.Main}>
					<Image src={logo} alt="" width={284} height={56} className={styles.header__img} />
				</Link>
				<Image
					src={burger}
					alt=""
					width={74}
					height={30}
					className={styles.header__burger}
					onClick={() => setOpen(!open)}
				/>
				{open && (
					<div className={styles.header__modalWindow}>
						<div className={styles.header__modalWindow__wrapper}>
							<div className={styles.header__modalWindow__menu}>
								<p className={styles.header__modalWindow__menu__text}>Меню</p>
								<Image src={close} alt="" width={24} height={24} onClick={() => setOpen(false)} />
							</div>
							<nav className={styles.header__modalWindow__navigation}>{renderNavigationElements()}</nav>
							<div className={styles.header__modalWindow__buttonsWrapper}>
								<Link href={MainPath.SignUp}>
									<Button content="Регистрация" styleName="buttonForRegistration" />
								</Link>
								<Link href={MainPath.Login}>
									<Button content="Вход" styleName="buttonForLogin" />
								</Link>
							</div>
						</div>
					</div>
				)}
				<nav className={styles.header__navigationWrap}>{renderNavigationElements()}</nav>
				<div className={styles.header__buttonsWrapper}>
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
