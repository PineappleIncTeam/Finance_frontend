import Link from "next/link";

import styles from "./footer.module.scss";

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<p className={styles.footerContainer__copyright}>Copyright © 2023 freenance | All Rights Reserved</p>
			<Link href="/userAgreement" className={styles.footerContainer__link}>
				Пользовательское соглашение
			</Link>
		</div>
	);
};

export default Footer;
