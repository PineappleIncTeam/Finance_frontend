import { IAnalyticsTransactions } from "../../../types/components/ComponentsTypes";

import styles from "./analystExpensesTransactions.module.scss";

const AnalystExpensesTransactions = ({ firstDate, secondDate, purpose, sum }: IAnalyticsTransactions) => {

	return (
		<div className={styles.transactionContainer}>
			<p className={styles.transactionData}>{firstDate}</p>
			<p className={styles.transactionData}>{secondDate}</p>
			<p className={styles.transactionData}>{purpose}</p>
			<p className={styles.transactionData}>{sum}</p>
		</div>
	);
};

export default AnalystExpensesTransactions;