"use client";

import agreement from "../../../mocks/Agreement.json";

import style from "./userAgreement.module.scss";

function UserAgreementPage() {
	const itemNumberList = {
		fourth: 4,
		fifth: 5,
		sixth: 6,
		tenth: 10,
	};

	const AgreementItems = (array: string[], itemNumber: number) => {
		return array.map((text: string, index: number) => {
			return (
				<p key={text}>
					{itemNumber}.{index + 1}. {text}
				</p>
			);
		});
	};

	const UserAgreementArticle = () => {
		return (
			<>
				<h1 className={style.agreementArticleTitle}>Пользовательское соглашение</h1>
				<p>Дата вступления в силу: {agreement.userAgreement.dateEffective}</p>
				<h2 className={style.agreementArticleTitle}>1. Введение</h2>
				<p>{agreement.userAgreement.introduction}</p>
				<h2 className={style.agreementArticleTitle}>2. Регистрация и учетная запись</h2>
				{AgreementItems(agreement.userAgreement.registration, 2)}
				<h2 className={style.agreementArticleTitle}>3. Описание Сервисов</h2>
				<p>{agreement.userAgreement.servicesDescription}</p>
				<h2 className={style.agreementArticleTitle}>4. Права и обязанности Пользователя</h2>
				<p>Пользователь обязуется:</p>
				{AgreementItems(agreement.userAgreement.userObligations, itemNumberList.fourth)}
				<h2 className={style.agreementArticleTitle}>5. Права и обязанности Администрации</h2>
				<p>Администрация вправе:</p>
				{AgreementItems(agreement.userAgreement.administrationRights, itemNumberList.fifth)}
				<h2 className={style.agreementArticleTitle}>6. Конфиденциальность и защита персональных данных</h2>
				{AgreementItems(agreement.userAgreement.confidentiality, itemNumberList.sixth)}
				<h2 className={style.agreementArticleTitle}>7. Использование файлов cookie</h2>
				<p>{agreement.userAgreement.cookiesUsage}</p>
				<h2 className={style.agreementArticleTitle}>8. Ограничение ответственности</h2>
				<p>{agreement.userAgreement.limitationOfLiability}</p>

				<h2 className={style.agreementArticleTitle}>9. Изменения в Соглашении</h2>
				<p>{agreement.userAgreement.changesToAgreement}</p>
				<h2 className={style.agreementArticleTitle}>10. Заключительные положения</h2>
				{AgreementItems(agreement.userAgreement.finalProvisions, itemNumberList.tenth)}
				<p>
					<span className={style.agreementArticleStrong}>Контактная информация:</span>{" "}
					{agreement.userAgreement.contactInformation.note}{" "}
					<span className={style.agreementArticleStrong}>{agreement.userAgreement.contactInformation.email}</span>
				</p>
			</>
		);
	};
	return (
		<div className={style.agreementPageWrap}>
			<div className={style.agreementPageContainer}>
				<div className={style.agreementPageContent}>{UserAgreementArticle()}</div>
			</div>
		</div>
	);
}

export default UserAgreementPage;
