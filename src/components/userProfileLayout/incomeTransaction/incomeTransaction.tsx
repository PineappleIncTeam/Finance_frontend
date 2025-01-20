import { useState } from "react";

import { IIncomeTransaction } from "../../../types/components/ComponentsTypes";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";
import { formatDate, formatMoney } from "../../../utils/formatData";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";

import styles from "./incomeTransaction.module.scss";

export default function IncomeTransaction({ date, purpose, sum }: IIncomeTransaction) {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

	return (
		<div className={styles.incomeTransactionContainer}>
			<p className={styles.transactionData}>{formatDate(date)}</p>
			<p className={styles.transactionData}>{date}</p>
			<p className={styles.transactionData}>{purpose}</p>
			<p className={styles.transactionData}>{formatMoney(sum)}</p>
			<div className={styles.incomeTransactionContainer__actionsWrapper}>
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
