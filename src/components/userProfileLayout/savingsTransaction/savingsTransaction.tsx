import { useState } from "react";

import { DeleteIcon } from "../../../assets/script/expenses/DeleteIcon";
import { EditIcon } from "../../../assets/script/expenses/EditIcon";
import { ISavingsTransaction } from "../../../types/components/ComponentsTypes";
import { ExpensesTooltip } from "../expensesTooltip/expensesTooltip";

import style from "./savingsTransaction.module.scss";

const SavingsTransaction = ({ firstDate, secondDate, purpose, sum }: ISavingsTransaction) => {
	const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

	return (
		<div className={style.savingsTransactionContainer}>
			<p className={style.transactionData}>{firstDate}</p>
			<p className={style.transactionData}>{secondDate}</p>
			<p className={style.transactionData}>{purpose}</p>
			<p className={style.transactionData}>{sum}</p>
			<div className={style.savingsTransactionContainer__actionsWrapper}>
				<DeleteIcon classNames={style.deleteIcon} />
				<div onMouseMove={() => setIsTooltipShown(true)} onMouseOut={() => setIsTooltipShown(false)}>
					<EditIcon classNames={style.editIcon} />
				</div>
			</div>
			<ExpensesTooltip open={isTooltipShown} />
		</div>
	);
};

export default SavingsTransaction;
