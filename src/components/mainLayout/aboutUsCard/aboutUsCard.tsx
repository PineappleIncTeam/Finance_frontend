import Image from "next/image";

import { IAboutUsCard } from "../../../types/common/ComponentsProps";

import style from "./aboutUsCards.module.scss";

const AboutUsCard = ({ image, descriptionImage, vacancy }: IAboutUsCard) => {
	return (
		<div className={style.aboutUsCard}>
			<div className={style.aboutUsCardPictureWrap}>
				<Image src={image} alt={`${descriptionImage}`} className={style.aboutUsCardPicture} />
			</div>
			<div className={style.aboutUsCardInfo}>
				<div className={style.aboutUsCardInfoLine} />
				<div className={style.aboutUsCardInfoVacancy}>{vacancy}</div>
			</div>
		</div>
	);
};

export default AboutUsCard;
