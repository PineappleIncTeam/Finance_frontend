import { IAboutUsCard, ITeamMember } from "../../../types/common/ComponentsProps";
import Footer from "../../../components/mainLayout/footer/footer";
import AboutUsCard from "../../../components/mainLayout/aboutUsCard/aboutUsCard";

import { AboutUsTeam } from "../../../mocks/AboutUsTeam";

import styles from "./aboutUs.module.scss";

function AboutUs() {
	function renderCardsList(aboutUsTeam: ITeamMember[]) {
		return aboutUsTeam.length ? (
			aboutUsTeam.map(({ teamRole, photo }: IAboutUsCard) => (
				<AboutUsCard photo={photo} teamRole={teamRole} key={teamRole} />
			))
		) : (
			<div className={styles.aboutUsTitle}>Команда скоро вернётся</div>
		);
	}

	return (
		<div className={styles.aboutUsWrap}>
			<div className={styles.aboutUsContainer}>
				<div className={styles.aboutUsMain}>
					<div className={styles.aboutUsTitle}>Классные ребята с горящими глазами.</div>
					<div className={styles.aboutUsCards}>{renderCardsList(AboutUsTeam)}</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default AboutUs;
