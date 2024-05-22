import styles from "./footer.module.scss";

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<p className={styles.footerContainer__copyright}>Copyright © 2023 freenance | All Rights Reserved</p>
			<a href="#" className={styles.footerContainer__link}>
				Пользовательское соглашение
			</a>
		</div>
	);
};

export default Footer;
