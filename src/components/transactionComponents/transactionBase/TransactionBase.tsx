import { numberFormatRub } from "../../../helpers/calculator";

import s from "./TransactionBase.module.css";

function TransactionBase({ operationItem, index, symbol }: any) {
	return (
		operationItem.sum !== 0 && (
			<div className={s.operation} key={index} id={operationItem.id}>
				<div className={s.operation_list_item1}>{operationItem.date}</div>
				<div className={s.operation_list_item}>{operationItem.categoryName}</div>
				<div className={s.operation_list_item}>
					{symbol}
					{numberFormatRub.format(operationItem.sum)}
				</div>
			</div>
		)
	);
}

export default TransactionBase;
