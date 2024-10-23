import Footer from "../../../components/mainLayout/footer/footer";

import defoltUser from "../../../assets/pages/aboutUs/defolt-profile.svg";

import AboutUsCard from "../../../components/mainLayout/aboutUsCard/aboutUsCard";

import style from "./aboutUs.module.scss";

function AboutUs() {
	return (
		<div className={style.aboutUsWrap}>
			<div className={style.aboutUsContainer}>
				<div className={style.aboutUsMain}>
					<div className={style.aboutUsTitle}>Классные ребята с горящими глазами.</div>
					<div className={style.aboutUsCards}>
						<AboutUsCard image={defoltUser} descriptionImage={"defoltUser"} vacancy={"Product owner"} />
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default AboutUs;
