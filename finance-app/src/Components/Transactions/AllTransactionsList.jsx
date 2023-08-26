import Transaction from "./Transaction"
import style from "./AllTransactionsList.module.css"

function AllTransactionsList({ allOperationList }) {
  // console.log(allOperationList)
  const incomeCash = allOperationList && allOperationList.income_cash
  const outcomeCash = allOperationList && allOperationList.outcome_cash
  const moneyBox = allOperationList && allOperationList.money_box
  // console.log(incomeCash)
  return (
    <div className={style.all_transactions}>
      {incomeCash.length > 0 && (
        <h3 className={style.operation_title}>Операции с доходами</h3>
      )}
      {incomeCash.map((item, index) => {
        return <Transaction operationItem={item} index={index} symbol={"+"} />
      })}

      {outcomeCash.length > 0 && (
        <h3 className={style.operation_title}>Операции с расходами</h3>
      )}
      {outcomeCash.map((item, index) => {
        return <Transaction operationItem={item} index={index} symbol={"-"} />
      })}
      {moneyBox.length > 0 && (
        <h3 className={style.operation_title}>Операции с накоплениями</h3>
      )}
      {moneyBox.map((item, index) => {
        return <Transaction operationItem={item} index={index} symbol={"-"} />
      })}
    </div>
  )
}

export default AllTransactionsList
