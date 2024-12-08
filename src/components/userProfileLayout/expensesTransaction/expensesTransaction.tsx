import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { IExpenseTransaction } from "../../../types/components/ComponentsTypes";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";

import style from "./expensesTransaction.module.scss";

export default function ExpensesTransaction({ firstDate, secondDate, purpose, sum }: IExpenseTransaction) {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

	return (
		<div className={style.expensesTransactionContainer}>
			<div className={style.transactionData}>{firstDate}</div>
			<div className={style.transactionData}>{secondDate}</div>
			<div className={style.transactionData}>{purpose}</div>
			<div className={style.transactionData}>{sum}</div>
			<div className={style.expensesTransactionContainer__actionsWrapper}>
				<DeleteIcon classNames={style.deleteIcon} />
				<div
					className={style.editIconWrapper}
					onMouseMove={() => setIsTooltipShown(true)}
					onMouseOut={() => setIsTooltipShown(false)}>
					<EditIcon classNames={style.editIcon} />
				</div>
				<ExpensesTooltip open={isTooltipShown} />
			</div>
		</div>
	);
}
