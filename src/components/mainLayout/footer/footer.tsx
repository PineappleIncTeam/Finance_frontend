"use client";

import Link from "next/link";

import cn from "classnames";

import { MainPath } from "../../../services/router/routes";

import { IFooter } from "../../../types/common/ComponentsProps";

import styles from "./footer.module.scss";

const Footer = ({ isMainPage }: IFooter) => {
	const actualDate: Date = new Date();
	const copyrightYear: number = actualDate.getFullYear();

	return (
		<div className={styles.footerWrap}>
			<div className={cn(styles.footerContainer, { [styles.footerContainer__mainPage]: isMainPage })}>
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
