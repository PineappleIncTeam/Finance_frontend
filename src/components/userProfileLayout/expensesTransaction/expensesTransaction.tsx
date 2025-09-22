import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { IExpenseTransaction } from "../../../types/components/ComponentsTypes";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";

import styles from "./expensesTransaction.module.scss";

export default function ExpensesTransaction({ date, amount, name, onDeleteClick, editClick }: IExpenseTransaction) {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

	return (
		<div className={styles.expensesTransactionContainer}>
			<p className={styles.transactionData}>{date}</p>
			<p className={styles.transactionData}>{name}</p>
			<p className={styles.transactionData}>- {amount} ₽</p>
			<div className={styles.expensesTransactionContainer__actionsWrapper}>
				<div role="button" onClick={() => onDeleteClick()}>
					<DeleteIcon classNames={styles.deleteIcon} />
				</div>
				<div
					className={styles.editIconWrapper}
					role="button"
					onClick={() => editClick()}
					onMouseMove={() => setIsTooltipShown(true)}
					onMouseOut={() => setIsTooltipShown(false)}>
					<EditIcon classNames={styles.editIcon} />
				</div>
				<ExpensesTooltip open={isTooltipShown} />
			</div>
		</div>
	);
}
