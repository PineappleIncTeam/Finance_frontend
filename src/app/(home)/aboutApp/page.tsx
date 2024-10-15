"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import Footer from "../../../pageComponents/homeLayout/footer/footer";

import { transitionGoogleStore } from "../../../mocks/AboutApp";

import registration from "../../../assets/pages/aboutApp/registration.png";
import expensesIncome from "../../../assets/pages/aboutApp/expensesIncome.png";
import analyze from "../../../assets/pages/aboutApp/analyze.png";
import calculate from "../../../assets/pages/aboutApp/calculate.png";
import { GooglePlayIcon } from "../../../assets/script/aboutApp/GooglePlayIcon";

import style from "./aboutAppPage.module.scss";

export default function AboutApp() {
	const router = useRouter();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		router.push(transitionGoogleStore);
	};

	return (
		<div className={style.aboutAppWrap}>
			<div className={style.aboutAppContainer}>
				<div className={style.aboutAppHeaderWrapper}>
					<h1 className={style.aboutAppHeader}>Используйте Freenance с лёгкостью</h1>
					<button className={style.googlePlayButton} onClick={handleClick}>
						<GooglePlayIcon classNames={style.googlePlayIcon} />
						<p className={style.googlePlayButton__text}>доступно в Google Play</p>
					</button>
				</div>
				<div className={style.aboutAppPageInstructionWrapper}>
					<div className={style.aboutAppPageInstructionContainer}>
						<div className={style.aboutAppPageInstructionContainer__item}>
							<div className={style.aboutAppPageInstructionContainer__item__orderNum}>1</div>
							<div className={style.aboutAppPageInstructionContainer__item__imageHelpWrapper}>
								<Image className={style.aboutAppPageInstructionImage} src={registration} alt="registration" />
								<p className={style.aboutAppPageInstructionContainer__item__imageHelpText}>
									Пройдите простую регистрацию, указав email и пароль
								</p>
							</div>
						</div>
						<div className={style.aboutAppPageInstructionContainer__item}>
							<div className={style.aboutAppPageInstructionContainer__item__orderNum}>2</div>
							<div className={style.aboutAppPageInstructionContainer__item__imageHelpWrapper}>
								<Image className={style.aboutAppPageInstructionImage} src={expensesIncome} alt="expenses and income" />
								<p className={style.aboutAppPageInstructionContainer__item__imageHelpText}>
									Заполняйте расходы и доходы, выбирая даты
								</p>
							</div>
						</div>
						<div className={style.aboutAppPageInstructionContainer__item}>
							<div className={style.aboutAppPageInstructionContainer__item__orderNum}>3</div>
							<div className={style.aboutAppPageInstructionContainer__item__imageHelpWrapper}>
								<Image
									className={style.aboutAppPageInstructionImage}
									src={calculate}
									alt="calculate purchases or loans"
								/>
								<p className={style.aboutAppPageInstructionContainer__item__imageHelpText}>
									Рассчитывайте покупку недвижимости или кредит
								</p>
							</div>
						</div>
						<div className={style.aboutAppPageInstructionContainer__item}>
							<div className={style.aboutAppPageInstructionContainer__item__orderNum}>4</div>
							<div className={style.aboutAppPageInstructionContainer__item__imageHelpWrapper}>
								<Image className={style.aboutAppPageInstructionImage} src={analyze} alt="analyze expenses and income" />
								<p className={style.aboutAppPageInstructionContainer__item__imageHelpText}>
									Анализируйте расходы, доходы и копите на мечту
								</p>
							</div>
						</div>
					</div>
					<div className={style.aboutAppPageInstructionVideoContainer}>
						<p className={style.aboutAppPageInstructionVideoContainer__header}>
							Пошаговая инструкция об использовании приложения
						</p>
						<button className={style.aboutAppPageInstructionVideoContainer__button}>Смотреть видео</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
