import React from "react";
import style from "./Transactions.module.css";
import TransactionList from "./TransactionList";

function Transactions({ getBalanceData, getOperationList, operationList, symbol, getInputData, sumIncomeCash, sumOutcomeCash }) {
  

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
        sumIncomeCash={sumIncomeCash}
        sumOutcomeCash={sumOutcomeCash} />
      {/* <div className="">
        {operationList && (
          operationList.map((operation, index) => {
            return (
              <div className="last_operation_list" key="index" >
                <div className="operation_list_item">{operation.date}</div>
                <div className="">{operation.categoryName}</div>
                <div className="">+{operation.reg_sum}</div>
                <div className=""></div>
              </div>
            )
          })
        )}
      </div> */}
    </div>
  );
}

export default Transactions;
