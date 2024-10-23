import Footer from "../../../components/mainLayout/footer/footer";

import AboutUsCard from "../../../components/mainLayout/aboutUsCard/aboutUsCard";

import teamList from "../../../mocks/team.json";

import { IAboutUsCard } from "../../../types/common/ComponentsProps";

import style from "./aboutUs.module.scss";

function AboutUs() {
	return (
		<div className={style.aboutUsWrap}>
			<div className={style.aboutUsContainer}>
				<div className={style.aboutUsMain}>
					<div className={style.aboutUsTitle}>Классные ребята с горящими глазами.</div>
					<div className={style.aboutUsCards}>
						{teamList && teamList?.team.length ? (
							teamList.team.map(({ teamRole, photo }: IAboutUsCard) => (
								<AboutUsCard photo={photo} teamRole={teamRole} key={teamRole} />
							))
						) : (
							<div>Команда скоро вернётся</div>
						)}
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default AboutUs;
