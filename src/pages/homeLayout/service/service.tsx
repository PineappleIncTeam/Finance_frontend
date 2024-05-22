import Image from "next/image";

import mainPagePicture from "../../../assets/pages/mainPage/mainPagePicture.png";
import listPoint from "../../../assets/pages/mainPage/listPoint.svg";

import styles from "./service.module.scss";

function Service() {
	return (
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
				<div className={styles.listOfFeatures}>
					<p className={styles.listOfFeatures__subtitle}>С нами вы сможете легко:</p>
					<ul className={styles.listOfFeatures__ul}>
						<li className={styles.listOfFeatures__item}>
							<Image className={styles.listOfFeatures__listPoint} src={listPoint} alt=" " />
							погасить ипотеку быстрее
						</li>
						<li className={styles.listOfFeatures__item}>
							<Image className={styles.listOfFeatures__listPoint} src={listPoint} alt=" " />
							узнать, куда сбегают ваши финансы
						</li>
						<li className={styles.listOfFeatures__item}>
							<Image className={styles.listOfFeatures__listPoint} src={listPoint} alt=" " />
							больше не брать кредиты
						</li>
						<li className={styles.listOfFeatures__item}>
							<Image className={styles.listOfFeatures__listPoint} src={listPoint} alt=" " />
							позаботься о завтра сегодня
						</li>
					</ul>
				</div>
			</div>
			<Image
				className={styles.mainPageContainer__mainPicture}
				src={mainPagePicture}
				alt="Главная картинка с денежным деревом, кальулятором и графиками"
			/>
		</div>
	);
}

export default Service;
