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
			<p className={style.transactionData}>{firstDate}</p>
			<p className={style.transactionData}>{secondDate}</p>
			<p className={style.transactionData}>{purpose}</p>
			<p className={style.transactionData}>{sum}</p>
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
