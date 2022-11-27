import s from "./Transactions.module.css";

function TransactionList({ operationList }) {
  return (
    <div className="">
      {operationList &&
        operationList.map((operation, index) => {
          return (
            <div className={s.operation} key={index}>
              <div className={s.operation_list_item}>{operation.date}</div>
              <div className="">{operation.categoryName}</div>
              <div className="">+{operation.sum}</div>
              <div className=""></div>
            </div>
          );
        })}
    </div>
  );
}
export default TransactionList;
