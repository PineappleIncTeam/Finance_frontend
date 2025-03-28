import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { IExpenseTransaction } from "../../../types/components/ComponentsTypes";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";

import styles from "./expensesTransaction.module.scss";

export default function ExpensesTransaction({ firstDate, secondDate, purpose, sum }: IExpenseTransaction) {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

	return (
		<div className={styles.expensesTransactionContainer}>
			<p className={styles.transactionData}>{firstDate}</p>
			<p className={styles.transactionData}>{secondDate}</p>
			<p className={styles.transactionData}>{purpose}</p>
			<p className={styles.transactionData}>{sum}</p>
			<div className={styles.expensesTransactionContainer__actionsWrapper}>
				<DeleteIcon classNames={styles.deleteIcon} />
				<div
					className={styles.editIconWrapper}
					onMouseMove={() => setIsTooltipShown(true)}
					onMouseOut={() => setIsTooltipShown(false)}>
					<EditIcon classNames={styles.editIcon} />
				</div>
				<ExpensesTooltip open={isTooltipShown} />
			</div>
		</div>
	);
}
