import { IAboutUsCard, ITeamMember } from "../../../types/common/ComponentsProps";
import Footer from "../../../components/mainLayout/footer/footer";
import AboutUsCard from "../../../components/mainLayout/aboutUsCard/aboutUsCard";

import { AboutUsTeam } from "../../../mocks/AboutUsTeam";

import style from "./aboutUs.module.scss";

function AboutUs() {
	function cardsList(AboutUsTeam: ITeamMember[]) {
		return AboutUsTeam.length ? (
			AboutUsTeam.map(({ teamRole, photo }: IAboutUsCard) => (
				<AboutUsCard photo={photo} teamRole={teamRole} key={teamRole} />
			))
		) : (
			<div className={style.aboutUsTitle}>Команда скоро вернётся</div>
		);
	}
	return (
		<div className={style.aboutUsWrap}>
			<div className={style.aboutUsContainer}>
				<div className={style.aboutUsMain}>
					<div className={style.aboutUsTitle}>Классные ребята с горящими глазами.</div>
					<div className={style.aboutUsCards}>{cardsList(AboutUsTeam)}</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default AboutUs;
