"use client";

import { useState } from "react";

import Image from "next/image";

import { IAboutUsCard } from "../../../types/common/ComponentsProps";

import fallback from "../../../assets/components/aboutUs/photoNotAvailable.webp";

import styles from "./aboutUsCards.module.scss";

const AboutUsCard = ({ photo, teamRole }: IAboutUsCard) => {
	const [hasError, setHasError] = useState<boolean>(false);

	return (
		<div className={styles.aboutUsCard}>
			{hasError ? (
				<div className={styles.aboutUsCardPictureWrap}>
					<Image
						src={fallback}
						alt="no photo"
						className={styles.aboutUsCardPicture}
						fill
						sizes="(max-width: 1920px) 5vw, (max-width: 400px) 17.5vw"
					/>
				</div>
			) : (
				<div className={styles.aboutUsCardPictureWrap}>
					<Image
						src={photo}
						alt={`${teamRole}`}
						className={styles.aboutUsCardPicture}
						fill={true}
						onError={() => setHasError(true)}
					/>
				</div>
			)}
			<div className={styles.aboutUsCardInfo}>
				<div className={styles.aboutUsCardInfoLine} />
				<div className={styles.aboutUsCardInfoVacancy}>{teamRole}</div>
			</div>
		</div>
	);
};

export default AboutUsCard;
