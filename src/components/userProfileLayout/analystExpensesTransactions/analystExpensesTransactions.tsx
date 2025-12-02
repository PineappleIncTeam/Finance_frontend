/* eslint-disable camelcase */
import { ICategoryBudget, IFinancialTransaction } from "../../../types/api/Analytics";

import styles from "./analystExpensesTransactions.module.scss";

const AnalystExpensesTransactions = ({ month, category_name, amount }: IFinancialTransaction & ICategoryBudget) => {
	return (
		<div className={styles.transactionContainer}>
			<p className={styles.transactionData}>{month}</p>
			<p className={styles.transactionData}>{category_name}</p>
			<p className={styles.transactionData}>{amount}</p>
		</div>
	);
};

export default AnalystExpensesTransactions;
