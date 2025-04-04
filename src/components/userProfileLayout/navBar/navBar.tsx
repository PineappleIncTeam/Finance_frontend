"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import cn from "classnames";

import { UserProfilePath } from "../../../services/router/routes";
import { INavBar } from "../../../types/common/ComponentsProps";
import { COLORS } from "../../../helpers/colorSet";

import logo from "../../../assets/components/logo.png";
import IncomeIcon from "../../../assets/script/privateProfileNavBar/IncomeIcon";
import ExpensesIcon from "../../../assets/script/privateProfileNavBar/ExpensesIcon";
import AccumulationIcon from "../../../assets/script/privateProfileNavBar/AccumulationIcon";
import AnalyticsIcon from "../../../assets/script/privateProfileNavBar/AnalyticsIcon";
import CalculatorIcon from "../../../assets/script/privateProfileNavBar/CalculatorIcon";
import infoIcon from "../../../assets/components/navBar/infoIcon.svg";
import crossIcon from "../../../assets/components/navBar/crossIcon.svg";
import useLogoutTimer from "../../../hooks/useLogoutTimer";
import handleLogout from "../../../helpers/logout";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import styles from "./navBar.module.scss";

const NavBar = ({ onClick }: INavBar) => {
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);
	const [baseUrl, setBaseUrl] = useState<string>();
	const modalRef = useRef<HTMLDivElement | null>(null);
	const { request } = handleLogout(baseUrl);
	const { resetTimer } = useLogoutTimer(request);

	const handleClickOutside = (
		event: MouseEvent,
		modalRef: RefObject<HTMLDivElement | null>,
		setOpen: Dispatch<SetStateAction<boolean>>,
	) => {
		if (modalRef && modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setOpen(false);
		}
	};

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

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	const renderNavigationElements = () => {
		return (
			<>
				<Link href={UserProfilePath.ProfitMoney} className={styles.navigationLink}>
					<div
						className={cn(styles.navigationLinkWrap, {
							[styles.navigationLinkWrapBoder__hide]: pathname === UserProfilePath.ProfitMoney,
						})}>
						<IncomeIcon color={pathname === UserProfilePath.ProfitMoney ? COLORS.primary : COLORS.white} />
						<p
							className={cn(styles.navigationLinkTitle, {
								[styles.activeLinkTitle]: pathname === UserProfilePath.ProfitMoney,
							})}>
							Доходы
						</p>
					</div>
					<div
						className={cn(styles.linkBackground, {
							[styles.linkBackground__active]: pathname === UserProfilePath.ProfitMoney,
						})}
					/>
				</Link>
				<Link href={UserProfilePath.Expenses} className={styles.navigationLink}>
					<div
						className={cn(styles.navigationLinkWrap, {
							[styles.navigationLinkWrapBoder__hide]: pathname === UserProfilePath.Expenses,
						})}>
						<ExpensesIcon color={pathname === UserProfilePath.Expenses ? COLORS.primary : COLORS.white} />
						<p
							className={cn(styles.navigationLinkTitle, {
								[styles.activeLinkTitle]: pathname === UserProfilePath.Expenses,
							})}>
							Расходы
						</p>
					</div>
					<div
						className={cn(styles.linkBackground, {
							[styles.linkBackground__active]: pathname === UserProfilePath.Expenses,
						})}
					/>
				</Link>
				<Link href={UserProfilePath.Savings} className={styles.navigationLink}>
					<div
						className={cn(styles.navigationLinkWrap, {
							[styles.navigationLinkWrapBoder__hide]: pathname === UserProfilePath.Savings,
						})}>
						<AccumulationIcon color={pathname === UserProfilePath.Savings ? COLORS.primary : COLORS.white} />
						<p
							className={cn(styles.navigationLinkTitle, {
								[styles.activeLinkTitle]: pathname === UserProfilePath.Savings,
							})}>
							Накопления
						</p>
					</div>
					<div
						className={cn(styles.linkBackground, {
							[styles.linkBackground__active]: pathname === UserProfilePath.Savings,
						})}
					/>
				</Link>
				<Link href={UserProfilePath.Analytics} className={styles.navigationLink}>
					<div
						role="button"
						onClick={() => resetTimer()}
						className={cn(styles.navigationLinkWrap, {
							[styles.navigationLinkWrapBoder__hide]: pathname === UserProfilePath.Analytics,
						})}>
						<AnalyticsIcon color={pathname === UserProfilePath.Analytics ? COLORS.primary : COLORS.white} />
						<p
							className={cn(styles.navigationLinkTitle, {
								[styles.activeLinkTitle]: pathname === UserProfilePath.Analytics,
							})}>
							Аналитика
						</p>
					</div>
					<div
						className={cn(styles.linkBackground, {
							[styles.linkBackground__active]: pathname === UserProfilePath.Analytics,
						})}
					/>
				</Link>
				<Link href={UserProfilePath.Calculator} className={styles.navigationLink}>
					<div
						className={cn(styles.navigationLinkWrap, {
							[styles.navigationLinkWrapBoder__hide]: pathname === UserProfilePath.Calculator,
						})}>
						<CalculatorIcon color={pathname === UserProfilePath.Calculator ? COLORS.primary : COLORS.white} />
						<p
							className={cn(styles.navigationLinkTitle, {
								[styles.activeLinkTitle]: pathname === UserProfilePath.Calculator,
							})}>
							Калькулятор
						</p>
					</div>
					<div
						className={cn(styles.linkBackground, {
							[styles.linkBackground__active]: pathname === UserProfilePath.Calculator,
						})}
					/>
				</Link>
			</>
		);
	};

	return (
		<header className={styles.nawBarWrap}>
			<div className={styles.navBarContainer}>
				<div className={styles.navBarHeader}>
					<Link href={UserProfilePath.ProfitMoney}>
						<Image src={logo} alt="Логотип" className={styles.navBarHeader__img} />
					</Link>
					<button className={styles.closeAction} onClick={onClick}>
						<Image src={crossIcon} alt="Cross" />
					</button>
				</div>
			</div>
			<nav className={styles.navigationWrap}>{renderNavigationElements()}</nav>
			<div className={styles.navBarContainer}>
				<div className={styles.supportWrap}>
					<Link href={""}>
						<p className={styles.supportWrap__link}>FAQ</p>
					</Link>
					<Link href={""}>
						<p className={styles.supportWrap__link}>Поддержка</p>
					</Link>
					<Image src={infoIcon} alt={"Info"} />
				</div>
			</div>
		</header>
	);
};

export default NavBar;
