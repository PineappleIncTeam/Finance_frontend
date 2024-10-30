import Link from "next/link";

import { MainPath } from "../../../services/router/routes";

import styles from "./footer.module.scss";

const Footer = () => {
	const actualDate: Date = new Date();
	const copyrightYear: number = actualDate.getFullYear();

	return (
		<div className={styles.footerWrap}>
			<div className={styles.footerContainer}>
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
