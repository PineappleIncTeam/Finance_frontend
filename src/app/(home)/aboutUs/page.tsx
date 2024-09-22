import NavBar from "../../../components/userProfileLayout/navBar/navBar";
import UserProfile from "../../../components/userProfileLayout/userProfile/userProfile";
import UserProfileHeader from "../../../components/userProfileLayout/userProfileHeader/userProfileHeader";

import styles from "./aboutUs.module.scss";
function AboutUs() {
	return (
		<div className={styles.aboutUsWrap}>
			<div className={styles.aboutUsWrap__navBar}>
				<NavBar />
			</div>
			<div className={styles.aboutUsProfile}>
				<UserProfileHeader />
				<UserProfile />
			</div>
		</div>
	);
}

export default AboutUs;
