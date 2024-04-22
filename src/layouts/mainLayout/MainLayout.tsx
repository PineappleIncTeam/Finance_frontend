import MainHeader from "../../components/mainLayout/mainHeader/MainHeader";
import Footer from "../../components/mainLayout/footer/Footer";

import styles from "./MainLayout.module.css";

export const MainLayout = (pageComponent: any) => {
	return (
		<div className={styles.layoutWrap}>
			<MainHeader />
			<div className={styles.outletWrap}>{pageComponent}</div>
			<Footer />
		</div>
	);
};
