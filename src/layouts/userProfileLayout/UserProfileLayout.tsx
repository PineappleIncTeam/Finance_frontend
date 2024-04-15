import { Outlet } from "react-router-dom";

import UserProfileHeader from "../../components/userProfileLayout/userProfileHeader/UserProfileHeader1";

import styles from "./UserProfileLayout.module.css";

export const UserProfileLayout = () => {
	return (
		<div className={styles.layoutWrap}>
			<UserProfileHeader />
			<div className={styles.outletWrap}>
				<Outlet />
			</div>
		</div>
	);
};
