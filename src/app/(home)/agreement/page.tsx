"use client";

import agreement from "../../../mocks/Agreement.json";

import style from "./agreement.module.scss";

function AgreementPage() {
	return (
		<div className={style.agreementPageWrap}>
			<div className={style.agreementPageContainer}>
				<div className={style.agreementPageContent}>
					<h1 className={style.agreementArticleTitle}>Пользовательское соглашение</h1>
					<p>Дата вступления в силу: {agreement.userAgreement.dateEffective}</p>
					<h2 className={style.agreementArticleTitle}>1. Введение</h2>
					<p>{agreement.userAgreement.introduction}</p>
					<h2 className={style.agreementArticleTitle}>2. Регистрация и учетная запись</h2>
					<p>2.1. {agreement.userAgreement.registration.description}</p>
					<p>2.2. {agreement.userAgreement.registration.responsibility}</p>
					<p>2.3. {agreement.userAgreement.registration.security}</p>
					<h2 className={style.agreementArticleTitle}>3. Описание Сервисов</h2>
					<p>{agreement.userAgreement.servicesDescription}</p>
					<h2 className={style.agreementArticleTitle}>4. Права и обязанности Пользователя</h2>
					<p>Пользователь обязуется:</p>
					{agreement.userAgreement.userObligations.map((text: string, index: number) => {
						return (
							<p key={text}>
								4.{index + 1}. {text}
							</p>
						);
					})}
					<h2 className={style.agreementArticleTitle}>5. Права и обязанности Администрации</h2>
					<p>Администрация вправе:</p>
					{agreement.userAgreement.administrationRights.map((text: string, index: number) => {
						return (
							<p key={text}>
								5.{index + 1}. {text}
							</p>
						);
					})}
					<h2 className={style.agreementArticleTitle}>6. Конфиденциальность и защита персональных данных</h2>
					<p>{agreement.userAgreement.confidentiality.userRights}</p>
					<p>{agreement.userAgreement.confidentiality.personalDataPolicy}</p>
					<h2 className={style.agreementArticleTitle}>7. Использование файлов cookie</h2>
					<p>{agreement.userAgreement.cookiesUsage}</p>
					<h2 className={style.agreementArticleTitle}>8. Ограничение ответственности</h2>
					<p>{agreement.userAgreement.limitationOfLiability}</p>

					<h2 className={style.agreementArticleTitle}>9. Изменения в Соглашении</h2>
					<p>{agreement.userAgreement.changesToAgreement}</p>
					<h2 className={style.agreementArticleTitle}>10. Заключительные положения</h2>
					<p>{agreement.userAgreement.finalProvisions.governingLaw}</p>
					<p>{agreement.userAgreement.finalProvisions.disputeResolution}</p>
					<p>
						<span className={style.agreementArticleStrong}>Контактная информация:</span>{" "}
						{agreement.userAgreement.contactInformation.note}{" "}
						<span className={style.agreementArticleStrong}>{agreement.userAgreement.contactInformation.email}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default AgreementPage;
