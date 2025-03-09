import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { ISavingsTransaction } from "../../../types/components/ComponentsTypes";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";

import styles from "./savingsTransaction.module.scss";

const SavingsTransaction = ({ date, categories, amount }: ISavingsTransaction) => {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

	return (
		<div className={styles.savingsTransactionContainer}>
			<p className={styles.transactionData}>{date}</p>
			<p className={styles.transactionData}>{categories}</p>
			<p className={styles.transactionData}>{amount}</p>
			<div className={styles.savingsTransactionContainer__actionsWrapper}>
				<DeleteIcon classNames={styles.deleteIcon} />
				<div onMouseMove={() => setIsTooltipShown(true)} onMouseOut={() => setIsTooltipShown(false)}>
					<EditIcon classNames={styles.editIcon} />
				</div>
			</div>
			<ExpensesTooltip open={isTooltipShown} />
		</div>
	);
};

export default SavingsTransaction;
