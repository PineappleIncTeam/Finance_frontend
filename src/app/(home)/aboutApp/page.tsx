"use client";

import { useState } from "react";

import Image from "next/image";

import Footer from "../../../components/mainLayout/footer/footer";

import { transitionGoogleStore } from "../../../mocks/linkSetup";

import registration from "../../../assets/pages/aboutApp/registration.webp";
import expensesIncome from "../../../assets/pages/aboutApp/expensesIncome.webp";
import analyze from "../../../assets/pages/aboutApp/analyze.webp";
import calculate from "../../../assets/pages/aboutApp/calculate.webp";
import { GooglePlayIcon } from "../../../assets/script/aboutApp/GooglePlayIcon";
import OneNumIcon from "../../../assets/script/aboutApp/OneNumIcon.svg";
import TwoNumIcon from "../../../assets/script/aboutApp/TwoNumIcon.svg";
import ThreeNumIcon from "../../../assets/script/aboutApp/ThreeNumIcon.svg";
import FourNumIcon from "../../../assets/script/aboutApp/FourNumIcon.svg";

import VideoElement from "../../../components/mainLayout/videoElement/videoElement";

import { videoId } from "../../../mocks/VideoId";

import Button from "../../../ui/appButton/button";

import styles from "./aboutAppPage.module.scss";

function AboutApp() {
	const [isVideoElementStart, setIsVideoElementStart] = useState<boolean>(false);

	const buttonAction = (prop: boolean) => {
		setIsVideoElementStart(prop);
	};

	return (
		<div className={styles.aboutAppWrap}>
			<div className={styles.aboutAppContainer}>
				<div className={styles.aboutAppHeaderWrapper}>
					<h1 className={styles.aboutAppHeader}>Используйте Freenance с лёгкостью</h1>
					<a className={styles.googlePlayButton} href={transitionGoogleStore} target="_blank" rel="noopener noreferrer">
						<GooglePlayIcon classNames={styles.googlePlayIcon} />
						<p className={styles.googlePlayButton__text}>доступно в Google Play</p>
					</a>
				</div>
				<div className={styles.aboutAppPageInstructionWrapper}>
					<div className={styles.aboutAppPageInstructionContainer}>
						<div className={styles.aboutAppPageInstructionContainer__item}>
							<div className={styles.aboutAppPageInstructionContainer__item__orderNum}>1</div>
							<Image className={styles.instructionNumber} width={56} height={154} src={OneNumIcon} alt="number one" />
							<div className={styles.aboutAppPageInstructionContainer__item__imageHelpWrapper}>
								<Image className={styles.aboutAppPageInstructionImage} src={registration} alt="registration" />
								<p className={styles.aboutAppPageInstructionContainer__item__imageHelpText}>
									Пройдите простую регистрацию, указав email и пароль
								</p>
							</div>
						</div>
						<div className={styles.aboutAppPageInstructionContainer__item}>
							<div className={styles.aboutAppPageInstructionContainer__item__orderNum}>2</div>
							<Image className={styles.instructionNumber} width={56} height={156} src={TwoNumIcon} alt="number two" />
							<div className={styles.aboutAppPageInstructionContainer__item__imageHelpWrapper}>
								<Image className={styles.aboutAppPageInstructionImage} src={expensesIncome} alt="expenses and income" />
								<p className={styles.aboutAppPageInstructionContainer__item__imageHelpText}>
									Заполняйте расходы и доходы, выбирая даты
								</p>
							</div>
						</div>
						<div className={styles.aboutAppPageInstructionContainer__item}>
							<div className={styles.aboutAppPageInstructionContainer__item__orderNum}>3</div>
							<Image
								className={styles.instructionNumber}
								width={58}
								height={156}
								src={ThreeNumIcon}
								alt="number three"
							/>
							<div className={styles.aboutAppPageInstructionContainer__item__imageHelpWrapper}>
								<Image
									className={styles.aboutAppPageInstructionImage}
									src={calculate}
									alt="calculate purchases or loans"
								/>
								<p className={styles.aboutAppPageInstructionContainer__item__imageHelpText}>
									Рассчитывайте покупку недвижимости или кредит
								</p>
							</div>
						</div>
						<div className={styles.aboutAppPageInstructionContainer__item}>
							<div className={styles.aboutAppPageInstructionContainer__item__orderNum}>4</div>
							<Image className={styles.instructionNumber} width={46} height={156} src={FourNumIcon} alt="number four" />
							<div className={styles.aboutAppPageInstructionContainer__item__imageHelpWrapper}>
								<Image
									className={styles.aboutAppPageInstructionImage}
									src={analyze}
									alt="analyze expenses and income"
								/>
								<p className={styles.aboutAppPageInstructionContainer__item__imageHelpText}>
									Анализируйте расходы, доходы и копите на мечту
								</p>
							</div>
						</div>
					</div>
					<div className={styles.aboutAppPageInstructionVideoContainer}>
						<p className={styles.aboutAppPageInstructionVideoContainer__header}>
							Пошаговая инструкция об использовании приложения
						</p>
						<Button variant="outlined" isLarge>
							Смотреть видео
						</Button>
					</div>
					{isVideoElementStart && (
						<div className={styles.videoElementWrapper}>
							<VideoElement close={() => buttonAction(false)} videoId={videoId} />
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default AboutApp;
