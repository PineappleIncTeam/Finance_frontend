import UserProfileHeader from "../../components/userProfileLayout/userProfileHeader/UserProfileHeader1";

import styles from "./UserProfileLayout.module.css";

export const UserProfileLayout = (pageComponent: any) => {
	return (
		<div className={styles.layoutWrap}>
			<UserProfileHeader />
			<div className={styles.outletWrap}>{pageComponent}</div>
		</div>
	);
};
