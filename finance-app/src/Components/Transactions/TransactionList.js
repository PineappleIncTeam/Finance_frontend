import s from "./Transactions.module.css";

function TransactionList({ operationList, symbol }) {
  return (
    <div className={s.transactions}>
      {operationList &&
        operationList.map((operation, index) => {
          return (
            <div className={s.operation} key={index}>
              <div className={s.operation_list_item}>{operation.date}</div>
              <div className={s.operation_list_item}>{operation.categoryName}</div>
              <div className={s.operation_list_item}>{symbol}{operation.sum}</div>
              <div className={s.icons}>
                <div className={s.operation_list_icon1}></div>
                <div className={s.operation_list_icon2}></div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default TransactionList;
