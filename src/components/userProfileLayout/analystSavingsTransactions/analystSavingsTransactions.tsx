/* eslint-disable camelcase */
import { ICategoryBudget, IFinancialTransaction } from "../../../types/api/Analytics";

import styles from "./analystSavingsTransactions.module.scss";

const AnalystSavingsTransactions = ({ month, category_name, amount }: IFinancialTransaction & ICategoryBudget) => {
	return (
		<div className={styles.transactionContainer}>
			<p className={styles.transactionData}>{month ?? "Дата не установлена"}</p>
			<p className={styles.transactionData}>{category_name}</p>
			<p className={styles.transactionData}>{amount}</p>
		</div>
	);
};

export default AnalystSavingsTransactions;
