"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import cn from "classnames";

import { MainPath, UserProfilePath } from "../../../services/router/routes";
import { INavBar } from "../../../types/common/ComponentsProps";
import { COLORS } from "../../../helpers/colorSet";

import logo from "../../../assets/components/logo.png";
import IncomeIcon from "../../../assets/script/privateProfileNavBar/IncomeIcon";
import ExpensesIcon from "../../../assets/script/privateProfileNavBar/ExpensesIcon";
import AccumulationIcon from "../../../assets/script/privateProfileNavBar/AccumulationIcon";
import AnalyticsIcon from "../../../assets/script/privateProfileNavBar/AnalyticsIcon";
import CalculatorIcon from "../../../assets/script/privateProfileNavBar/CalculatorIcon";
import borderIcon from "../../../assets/components/navBar/border.svg";
import infoIcon from "../../../assets/components/navBar/infoIcon.svg";
import crossIcon from "../../../assets/components/navBar/crossIcon.svg";

import styles from "./navBar.module.scss";

const NavBar = ({ onClick }: INavBar) => {
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement | null>(null);

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
			<div className={styles.navigationLinksWrap}>
				<Link href={UserProfilePath.Profit}>
					<div
						className={cn(
							styles.navigationLinkWrap,
							{ [styles.active]: pathname === UserProfilePath.Profit },
							styles.border,
						)}>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIcon"} className={styles.borderTop} />
						)}
						<IncomeIcon color={pathname === UserProfilePath.Profit ? COLORS.primary : COLORS.white} />
						<p className={cn(styles.navigationLink, { [styles.activeLinkWrap]: pathname === UserProfilePath.Profit })}>
							Доходы
						</p>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIconBottom"} className={styles.borderBottom} />
						)}
					</div>
				</Link>
				<Link href={UserProfilePath.Profit}>
					<div className={cn(styles.navigationLinkWrap, { [styles.active]: pathname === UserProfilePath.Profit })}>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIcon"} className={styles.borderTop} />
						)}
						<ExpensesIcon color={pathname === UserProfilePath.Profit ? COLORS.primary : COLORS.white} />
						<p className={cn(styles.navigationLink, { [styles.activeLinkWrap]: pathname === UserProfilePath.Profit })}>
							Расходы
						</p>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIconBottom"} className={styles.borderBottom} />
						)}
					</div>
				</Link>
				<Link href={UserProfilePath.Profit}>
					<div className={cn(styles.navigationLinkWrap, { [styles.active]: pathname === UserProfilePath.Profit })}>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIcon"} className={styles.borderTop} />
						)}
						<AccumulationIcon color={pathname === UserProfilePath.Profit ? COLORS.primary : COLORS.white} />
						<p className={cn(styles.navigationLink, { [styles.activeLinkWrap]: pathname === UserProfilePath.Profit })}>
							Накопления
						</p>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIconBottom"} className={styles.borderBottom} />
						)}
					</div>
				</Link>
				<Link href={UserProfilePath.Profit}>
					<div className={cn(styles.navigationLinkWrap, { [styles.active]: pathname === UserProfilePath.Profit })}>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIcon"} className={styles.borderTop} />
						)}
						<AnalyticsIcon color={pathname === UserProfilePath.Profit ? COLORS.primary : COLORS.white} />
						<p className={cn(styles.navigationLink, { [styles.activeLinkWrap]: pathname === UserProfilePath.Profit })}>
							Аналитика
						</p>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIconBottom"} className={styles.borderBottom} />
						)}
					</div>
				</Link>
				<Link href={UserProfilePath.Profit}>
					<div className={cn(styles.navigationLinkWrap, { [styles.active]: pathname === UserProfilePath.Profit })}>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIcon"} className={styles.borderTop} />
						)}
						<CalculatorIcon color={pathname === UserProfilePath.Profit ? COLORS.primary : COLORS.white} />
						<p className={cn(styles.navigationLink, { [styles.activeLinkWrap]: pathname === UserProfilePath.Profit })}>
							Калькулятор
						</p>
						{pathname === UserProfilePath.Profit && (
							<Image src={borderIcon} alt={"borderIconBottom"} className={styles.borderBottom} />
						)}
					</div>
				</Link>
			</div>
		);
	};

	return (
		<header className={styles.nawBarWrap}>
			<div className={styles.navBarContainer}>
				<div className={styles.navBarHeader}>
					<Link href={MainPath.Main}>
						<Image src={logo} alt="Логотип" className={styles.navBarHeader__img} />
					</Link>
					<button className={styles.closeAction} onClick={onClick}>
						<Image src={crossIcon} alt="Cross" />
					</button>
				</div>
				<nav className={styles.navigationWrap}>{renderNavigationElements()}</nav>
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
