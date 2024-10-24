import Image from "next/image";

import { IAboutUsCard } from "../../../types/common/ComponentsProps";

import style from "./aboutUsCards.module.scss";

const AboutUsCard = ({ photo, teamRole }: IAboutUsCard) => {
	return (
		<div className={style.aboutUsCard}>
			<div className={style.aboutUsCardPictureWrap}>
				<Image src={photo} alt={`${teamRole}`} className={style.aboutUsCardPicture} fill={true} />
			</div>
			<div className={style.aboutUsCardInfo}>
				<div className={style.aboutUsCardInfoLine} />
				<div className={style.aboutUsCardInfoVacancy}>{teamRole}</div>
			</div>
		</div>
	);
};

export default AboutUsCard;
