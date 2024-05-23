import Link from "next/link";

import { MainPath } from "../../../services/router/routes";

import styles from "./footer.module.scss";

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<p className={styles.footerContainer__copyright}>Copyright © 2023 freenance | All Rights Reserved</p>
			<Link href={MainPath.UserAgreement} className={styles.footerContainer__link}>
				Пользовательское соглашение
			</Link>
		</div>
	);
};

export default Footer;
