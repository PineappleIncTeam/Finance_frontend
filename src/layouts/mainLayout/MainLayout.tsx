import { Outlet } from "react-router-dom";

import MainHeader from "../../components/mainLayout/mainHeader/MainHeader";
import Footer from "../../components/mainLayout/footer/Footer";

import styles from "./MainLayout.module.css";

export const MainLayout = () => {
	return (
		<div className={styles.layoutWrap}>
			<MainHeader />
			<div className={styles.outletWrap}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
