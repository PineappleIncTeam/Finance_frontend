import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";
import { ISavingsTransaction } from "../../../types/components/ComponentsTypes";

import styles from "./savingsTransaction.module.scss";

const SavingsTransaction = ({ date, amount, name, onDeleteClick, editClick }: ISavingsTransaction) => {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

	return (
		<div className={styles.savingsTransactionContainer}>
			<p className={styles.transactionData}>{date}</p>
			<p className={styles.transactionData}>{name}</p>
			<p className={styles.transactionData}>{amount}</p>

			<div className={styles.savingsTransactionContainer__actionsWrapper}>
				<div role="button" onClick={() => onDeleteClick()}>
					<DeleteIcon classNames={styles.deleteIcon} />
				</div>
				<div
					role="button"
					onClick={() => editClick()}
					onMouseMove={() => setIsTooltipShown(true)}
					onMouseOut={() => setIsTooltipShown(false)}>
					<EditIcon classNames={styles.editIcon} />
				</div>
			</div>
			<ExpensesTooltip open={isTooltipShown} />
		</div>
	);
};

export default SavingsTransaction;
