"use client";

import Link from "next/link";

import { useWindowWidth } from "@react-hook/window-size";

import cn from "classnames";

import { usePathname } from "next/navigation";

import { MainPath } from "../../../services/router/routes";

import styles from "./footer.module.scss";

const Footer = () => {
	const pathname = usePathname();
	const windowWidth = useWindowWidth();
	const currentWindowWidth = 1024;
	const actualDate: Date = new Date();
	const copyrightYear: number = actualDate.getFullYear();

	return (
		<div className={styles.footerWrap}>
			<div
				className={cn(styles.footerContainer, {
					[styles.footerContainer__AboutAppPage]: pathname === MainPath.AboutApp && windowWidth > currentWindowWidth,
				})}>
				<p className={styles.footerContainer__copyright}>
					Copyright © {copyrightYear} freenance | All Rights Reserved
				</p>
				<Link href={MainPath.UserAgreement} className={styles.footerContainer__link}>
					Пользовательское соглашение
				</Link>
			</div>
		</div>
	);
};

export default Footer;
