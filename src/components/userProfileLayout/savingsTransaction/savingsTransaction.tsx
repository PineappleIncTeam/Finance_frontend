import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";
import { IOperation } from "../../../types/api/Expenses";

import styles from "./savingsTransaction.module.scss";

const SavingsTransaction = ({ date, amount, target, name }: IOperation) => {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

	return (
		<div className={styles.savingsTransactionContainer}>
			<p className={styles.transactionData}>{date}</p>
			<p className={styles.transactionData}>{target}</p>
			<p className={styles.transactionData}>{name}</p>
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
