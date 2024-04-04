import { URLS } from "../../../helpers/urlsAndDates";

import TransactionList from "../transactionList/TransactionList";

import style from "../transactionList/TransactionList.module.css";

import baseStyles from "./TransactionArray.module.css";

function TransactionArray({
	getBalanceData,
	getOperationList,
	operationList,
	symbol,
	getInputData,
	getStorageCategories,
}: any) {
	return (
		<div className={style.root}>
			<div className={style.text}>Последние операции</div>
			<hr className={baseStyles.br} />
			<TransactionList
				getBalanceData={getBalanceData}
				getOperationList={getOperationList}
				operationList={operationList}
				symbol={symbol}
				getInputData={getInputData}
				getStorageCategories={getStorageCategories}
				typeOfCategories={URLS.getMoneyBoxCategories}
			/>
		</div>
	);
}

export default TransactionArray;
