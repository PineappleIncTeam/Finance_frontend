import privacyData from "../../../mocks/PrivacyPolicy.json";

import styles from "./privacyPolicy.module.scss";

function PrivacyPolicyPage() {
	const { privacyPolicy } = privacyData;

	const renderContent = () => {
		return (
			<>
				<h1 className={styles.agreementArticleTitle}>{privacyPolicy.title}</h1>
				<p>Дата вступления в силу: {privacyPolicy.dateEffective}</p>

				{privacyPolicy.sections.map((section) => (
					<div key={section.id}>
						<h2 className={styles.agreementArticleTitle}>
							{section.id}. {section.title}
						</h2>
						{section.content && <p>{section.content}</p>}
						{section.items && (
							<div className={styles.privacyPolicySectionItems}>
								{section.items.map((item, index) => (
									<p key={index}>
										{section.id}.{index + 1}. {item}
									</p>
								))}
							</div>
						)}
					</div>
				))}

				<h2 className={styles.agreementArticleTitle}>{privacyPolicy.sections.length + 1}. Контактная информация</h2>
				<p>{privacyPolicy.contactInformation.note}</p>
				<p>
					<span className={styles.agreementArticleStrong}>Email:</span>{" "}
					<span className={styles.agreementArticleStrong}>{privacyPolicy.contactInformation.email}</span>
				</p>
			</>
		);
	};

	return (
		<div className={styles.agreementPageWrap}>
			<div className={styles.agreementPageContainer}>
				<div className={styles.agreementPageContent}>{renderContent()}</div>
			</div>
		</div>
	);
}

export default PrivacyPolicyPage;
