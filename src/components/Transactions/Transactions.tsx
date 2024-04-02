import React from "react";

import { URLS } from "../../helpers/urlsAndDates";

import style from "./Transactions.module.css";
import TransactionList from "./TransactionList";

function Transactions({ getBalanceData, getOperationList, operationList, symbol, getInputData, getStorageCategories }) {
	return (
		<div className={style.root}>
			<div className={style.text}>Последние операции</div>
			<hr />
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

export default Transactions;
