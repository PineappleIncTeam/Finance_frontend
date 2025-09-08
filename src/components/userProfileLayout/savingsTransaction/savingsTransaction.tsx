import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { ISavingsTransaction } from "../../../types/components/ComponentsTypes";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";

import styles from "./savingsTransaction.module.scss";

const SavingsTransaction = ({ firstDate, secondDate, purpose, sum }: ISavingsTransaction) => {
	const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

	return (
		<div className={styles.savingsTransactionContainer}>
			<p className={styles.transactionData}>{firstDate}</p>
			<p className={styles.transactionData}>{secondDate}</p>
			<p className={styles.transactionData}>{purpose}</p>
			<p className={styles.transactionData}>{sum}</p>
			<div className={styles.savingsTransactionContainer__actionsWrapper}>
				<DeleteIcon classNames={styles.deleteIcon} />
				<div onMouseMove={() => setIsTooltipOpen(true)} onMouseOut={() => setIsTooltipOpen(false)}>
					<EditIcon classNames={styles.editIcon} />
				</div>
			</div>
			<ExpensesTooltip open={isTooltipOpen} />
		</div>
	);
};

export default SavingsTransaction;
