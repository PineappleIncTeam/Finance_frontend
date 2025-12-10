import { useState } from "react";

import { IIncomeTransaction } from "../../../types/components/ComponentsTypes";
import { MoneyValueTooltip } from "../moneyValueTooltip/moneyValueTooltip";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";

import styles from "./incomeTransaction.module.scss";

export default function IncomeTransaction({ date, name, amount, onDeleteClick, editClick }: IIncomeTransaction) {
	const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

	return (
		<div className={styles.incomeTransactionContainer}>
			<p className={styles.transactionData}>{date}</p>
			<p className={styles.transactionData}>{name}</p>
			<p className={styles.transactionData}>- {amount} ₽</p>
			<div className={styles.incomeTransactionContainer__actionsWrapper}>
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
				<MoneyValueTooltip open={isTooltipOpen} />
			</div>
		</div>
	);
}
