"use client";

import Link from "next/link";

import { MainPath } from "../../../services/router/routes";

import styles from "./footer.module.scss";

interface IFooterProps {
	isMainPage?: boolean;
}

const Footer = ({ isMainPage }: IFooterProps) => {
	const actualDate: Date = new Date();
	const copyrightYear: number = actualDate.getFullYear();
	console.log(isMainPage);

	return (
		<div className={styles.footerWrap}>
			<div className={`${styles.footerContainer} ${isMainPage ? styles.footerContainer__mainPage : ""}`}>
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
