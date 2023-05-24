import React from "react"
import style from "./Transactions.module.css"
import TransactionList from "./TransactionList"

function Transactions({
  getBalanceData,
  getOperationList,
  operationList,
  symbol,
  getInputData,
}) {
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
      />
    </div>
  )
}

export default Transactions
