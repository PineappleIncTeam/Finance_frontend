function TransactionList({ operationList }) {
  return (
    <div className="">
      {operationList &&
        operationList.map((operation, index) => {
          return (
            <div className="last_operation_list" key={index}>
              <div className="operation_list_item">{operation.date}</div>
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
