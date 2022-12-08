import { useSelector } from 'react-redux';
import s from './Transactions.module.css';

function TransactionList({
  getBalanceData,
  getOperationList,
  operationList,
  symbol,
}) {
  const token = useSelector((state) => state.user.token);
  // const deleteIncomeCash = 'http://92.255.79.239:8000/api/delete-incomecash/';
  // const deleteOutcomeCash = 'http://92.255.79.239:8000/api/delete-outcomecash/';
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };
  return (
    <div className={s.transactions}>
      {operationList &&
        operationList.map((operation, index) => {
          function deleteCash(id, symbol) {
            const deleteIncomeCash = `http://92.255.79.239:8000/api/delete-incomecash/`;
            const deleteOutcomeCash =
              'http://92.255.79.239:8000/api/delete-outcomecash/';
            if (symbol === '+') {
              fetch(`${deleteIncomeCash}${id}`, options);
              setTimeout(() => {
                getOperationList(
                  'http://92.255.79.239:8000/api/last-5-incomecash/',
                  symbol
                );
                getBalanceData();
              }, 500);
            } else if (symbol === '-') {
              fetch(`${deleteOutcomeCash}${id}`, options);
              setTimeout(() => {
                getOperationList(
                  'http://92.255.79.239:8000/api/last-5-outcomecash/',
                  symbol
                );
                getBalanceData();
              }, 500);
            }
          }

          return (
            <div className={s.operation} key={index} id={operation.id}>
              <div className={s.operation_list_item}>{operation.date}</div>
              <div className={s.operation_list_item}>
                {operation.categoryName}
              </div>
              <div className={s.operation_list_item}>
                {symbol}
                {operation.sum}
              </div>
              <div className={s.icons}>
                <button
                  className={s.icon_button}
                  type="submit"
                  onClick={() => {
                    deleteCash(operation.id, symbol);
                  }}
                >
                  <div className={s.operation_list_icon1}></div>
                </button>
                <button className={s.icon_button}>
                  <div className={s.operation_list_icon2}></div>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default TransactionList;
