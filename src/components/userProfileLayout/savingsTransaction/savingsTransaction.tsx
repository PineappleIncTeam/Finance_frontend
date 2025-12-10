import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { MoneyValueTooltip } from "../moneyValueTooltip/moneyValueTooltip";
import { ISavingsTransaction } from "../../../types/components/ComponentsTypes";

import styles from "./savingsTransaction.module.scss";

const SavingsTransaction = ({ date, amount, name, onDeleteClick, editClick }: ISavingsTransaction) => {
	const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

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
					onMouseMove={() => setIsTooltipOpen(true)}
					onMouseOut={() => setIsTooltipOpen(false)}>
					<EditIcon classNames={styles.editIcon} />
				</div>
			</div>
			<MoneyValueTooltip open={isTooltipOpen} />
		</div>
	);
};

export default SavingsTransaction;
