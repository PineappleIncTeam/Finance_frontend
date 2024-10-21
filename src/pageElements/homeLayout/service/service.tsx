import Image from "next/image";

import mainPagePicture from "../../../assets/pages/mainPage/mainPagePicture.webp";
import mainPagePictureTablet from "../../../assets/pages/mainPage/mainPagePictureTablet.webp";
import mainPagePictureMobile from "../../../assets/pages/mainPage/mainPagePictureMobile.webp";
import listPoint from "../../../assets/pages/mainPage/listPoint.svg";

import styles from "./service.module.scss";

function Service() {
	return (
		<>
			<div className={styles.mainPageContainer}>
				<div className={styles.infoContainer}>
					<h1 className={styles.infoContainer__title}>
						Наслаждайся расходами, <br />
						экономь без усилий
					</h1>
					<p className={styles.infoContainer__subtitle}>
						FREEnance — онлайн-приложение <br />
						для учёта личных и семейных финансов.
					</p>
					<div className={styles.featuresListWrap}>
						<p className={styles.featuresListWrap__title}>С нами вы сможете легко:</p>
						<ul className={styles.featuresListContainer}>
							<li className={styles.featuresListContainer__featureElement}>
								<Image className={styles.featuresListContainer__listPoint} src={listPoint} alt="пункт списка" />
								погасить ипотеку быстрее
							</li>
							<li className={styles.featuresListContainer__featureElement}>
								<Image className={styles.featuresListContainer__listPoint} src={listPoint} alt="пункт списка" />
								узнать, куда сбегают ваши финансы
							</li>
							<li className={styles.featuresListContainer__featureElement}>
								<Image className={styles.featuresListContainer__listPoint} src={listPoint} alt="пункт списка" />
								больше не брать кредиты
							</li>
							<li className={styles.featuresListContainer__featureElement}>
								<Image className={styles.featuresListContainer__listPoint} src={listPoint} alt="пункт списка" />
								позаботься о завтра сегодня
							</li>
						</ul>
					</div>
				</div>
				<Image
					className={styles.mainPageContainer__mainPicture}
					priority={true}
					src={mainPagePicture}
					alt="Главная картинка с денежным деревом, калькулятором и графиками"
				/>
			</div>
			<div className={styles.mobileMainPageContainer}>
				<Image
					src={mainPagePictureTablet}
					priority={true}
					alt="Главная картинка с денежным деревом, калькулятором и графиками"
					className={styles.mobileMainPageContainer__mainPictureTablet}
				/>
				<Image
					src={mainPagePictureMobile}
					priority={true}
					alt="Главная картинка с денежным деревом, калькулятором и графиками"
					className={styles.mobileMainPageContainer__mainPictureMobile}
				/>
				<h1 className={styles.mobileMainPageContainer__title}>
					Наслаждайся расходами, <br />
					экономь без усилий
				</h1>
				<p className={styles.mobileMainPageContainer__subtitle}>
					Ваши доходы и расходы, планирование бюджета, <br />
					курсы валют. <br />
					Все в одном приложении.
				</p>
			</div>
		</>
	);
}

export default Service;
