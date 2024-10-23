import Image from "next/image";

import Footer from "../../../components/mainLayout/footer/footer";

import defoltUser from "../../../assets/pages/aboutUs/defolt-profile.svg";

import style from "./aboutUs.module.scss";

function AboutUs() {
	return (
		<div className={style.aboutUsWrap}>
			<div className={style.aboutUsContainer}>
				<div className={style.aboutUsMain}>
					<div className={style.aboutUsTitle}>Классные ребята с горящими глазами.</div>
					<div className={style.aboutUsCards}>
						<div className={style.aboutUsCard}>
							<div className={style.aboutUsCardPictureWrap}>
								<Image src={defoltUser} alt={`${defoltUser}`} className={style.aboutUsCardPicture} />
							</div>
							<div className={style.aboutUsCardInfo}>
								<div className={style.aboutUsCardInfoLine} />
								<div className={style.aboutUsCardInfoVacancy}>Product owner</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default AboutUs;
