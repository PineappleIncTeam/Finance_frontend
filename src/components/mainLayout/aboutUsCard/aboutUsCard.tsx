"use client";

import { useState } from "react";

import Image from "next/image";

import { IAboutUsCard } from "../../../types/common/ComponentsProps";

import fallback from "../../../assets/components/aboutUs/photoNotAvailable.png";

import style from "./aboutUsCards.module.scss";

const AboutUsCard = ({ photo, teamRole }: IAboutUsCard) => {
	const [hasError, setHasError] = useState<boolean>(false);

	return (
		<div className={style.aboutUsCard}>
			{hasError ? (
				<div className={style.aboutUsCardPictureWrap}>
					<Image
						src={fallback}
						alt="no photo"
						className={style.aboutUsCardPicture}
						fill
						sizes="(max-width: 1920px) 5vw, (max-width: 400px) 17.5vw"
					/>
				</div>
			) : (
				<div className={style.aboutUsCardPictureWrap}>
					<Image
						src={photo}
						alt={`${teamRole}`}
						className={style.aboutUsCardPicture}
						fill={true}
						onError={() => setHasError(true)}
					/>
				</div>
			)}
			<div className={style.aboutUsCardInfo}>
				<div className={style.aboutUsCardInfoLine} />
				<div className={style.aboutUsCardInfoVacancy}>{teamRole}</div>
			</div>
		</div>
	);
};

export default AboutUsCard;
