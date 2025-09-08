import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { IExpenseTransaction } from "../../../types/components/ComponentsTypes";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";

import styles from "./expensesTransaction.module.scss";

export default function ExpensesTransaction({ date, target, amount, onDeleteClick, editClick }: IExpenseTransaction) {
	const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

	return (
		<div className={styles.expensesTransactionContainer}>
			<p className={styles.transactionData}>{date}</p>
			<p className={styles.transactionData}>{target}</p>
			<p className={styles.transactionData}>- {amount} ₽</p>
			<div className={styles.expensesTransactionContainer__actionsWrapper}>
				<div role="button" onClick={() => onDeleteClick()}>
					<DeleteIcon classNames={styles.deleteIcon} />
				</div>
				<div
					className={styles.editIconWrapper}
					role="button"
					onClick={() => editClick()}
					onMouseMove={() => setIsTooltipOpen(true)}
					onMouseOut={() => setIsTooltipOpen(false)}>
					<EditIcon classNames={styles.editIcon} />
				</div>
				<ExpensesTooltip open={isTooltipOpen} />
			</div>
		</div>
	);
}
