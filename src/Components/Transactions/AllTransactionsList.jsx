import Transaction from "./Transaction"
import style from "./AllTransactionsList.module.css"

function AllTransactionsList({ allOperationList }) {
  const incomeCash = allOperationList && allOperationList.income_cash
  const outcomeCash = allOperationList && allOperationList.outcome_cash
  const moneyBox = allOperationList && allOperationList.money_box

  return (
    <>
      {(incomeCash && incomeCash.length > 0) ||
      (outcomeCash && outcomeCash.length > 0) ||
      (moneyBox && moneyBox.length > 0) ? (
        <div className={style.all_transactions}>
          {incomeCash && incomeCash.length > 0 && (
            <h3 className={style.operation_title}>Операции с доходами</h3>
          )}
          {incomeCash &&
            incomeCash.map((item, index) => {
              return (
                <Transaction operationItem={item} index={index} symbol={"+"} />
              )
            })}

          {outcomeCash && outcomeCash.length > 0 && (
            <h3 className={style.operation_title}>Операции с расходами</h3>
          )}
          {outcomeCash &&
            outcomeCash.map((item, index) => {
              return (
                <Transaction operationItem={item} index={index} symbol={"-"} />
              )
            })}
          {moneyBox && moneyBox.length > 0 && (
            <h3 className={style.operation_title}>Операции с накоплениями</h3>
          )}
          {moneyBox &&
            moneyBox.map((item, index) => {
              return (
                <Transaction operationItem={item} index={index} symbol={"-"} />
              )
            })}
        </div>
      ) : (
        <div className={style.message_text}>
          Операции за выбранный период <br />
          отсутствуют
        </div>
      )}
    </>
  )
}

export default AllTransactionsList
