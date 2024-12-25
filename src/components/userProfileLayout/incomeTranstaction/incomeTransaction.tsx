import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { IIncomeTransaction } from "../../../types/components/ComponentsTypes";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";

import { formatDate, formatMoney } from "../../../utils/formatData";

import style from "./incomeTransaction.module.scss";

export default function IncomeTransaction({ date, purpose, sum }: IIncomeTransaction) {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

	return (
		<div className={style.incomeTransactionContainer}>
			<p className={style.transactionData}>{formatDate(date)}</p>
			<p className={style.transactionData}>{date}</p>
			<p className={style.transactionData}>{purpose}</p>
			<p className={style.transactionData}>{formatMoney(sum)}</p>
			<div className={style.incomeTransactionContainer__actionsWrapper}>
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
