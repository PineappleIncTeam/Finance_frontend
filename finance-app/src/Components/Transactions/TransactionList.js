import { useSelector } from 'react-redux';
import s from './Transactions.module.css';

function TransactionList({
  getBalanceData,
  getOperationList,
  operationList,
  symbol,
  getInputData,
  sumIncomeCash,
  sumOutcomeCash,
}) {
  const token = useSelector((state) => state.user.token);

  const deleteOptions = {
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
              fetch(`${deleteIncomeCash}${id}`, deleteOptions);
              setTimeout(() => {
                getOperationList(
                  'http://92.255.79.239:8000/api/last-5-incomecash/',
                  symbol
                );
                getInputData(sumIncomeCash);
                getBalanceData();
              }, 500);
            } else if (symbol === '-') {
              fetch(`${deleteOutcomeCash}${id}`, deleteOptions);
              setTimeout(() => {
                getOperationList(
                  'http://92.255.79.239:8000/api/last-5-outcomecash/',
                  symbol
                );
                getInputData(sumOutcomeCash);
                getBalanceData();
              }, 500);
            }
          }

          function updateCash(id, category, sum, symbol) {
            const updateIncomeCash = `http://92.255.79.239:8000/api/update-incomecash/`;
            const updateOutcomeCash =
              'http://92.255.79.239:8000/api/update-outcomecash/';
            if (symbol === '+') {
              let newSum = prompt('Введите новое числовое значение', sum);
              let data = {
                category_id: category,
                sum: newSum,
              };
              const updateOptions = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${token}`,
                },
                body: JSON.stringify(data),
              };
              fetch(`${updateIncomeCash}${id}`, updateOptions);
              setTimeout(() => {
                getOperationList(
                  'http://92.255.79.239:8000/api/last-5-incomecash/',
                  symbol
                );
                getInputData(sumIncomeCash);
                getBalanceData();
              }, 400);
            } else if (symbol === '-') {
              let newSum = prompt('Введите новое числовое значение', sum);
              let data = {
                category_id: category,
                sum: newSum,
              };
              const updateOptions = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${token}`,
                },
                body: JSON.stringify(data),
              };
              fetch(`${updateOutcomeCash}${id}`, updateOptions);
              setTimeout(() => {
                getOperationList(
                  'http://92.255.79.239:8000/api/last-5-outcomecash/',
                  symbol
                );
                getInputData(sumOutcomeCash);
                getBalanceData();
              }, 400);
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
                <span className="ruble_icon ruble_icon_transactions">₽</span>
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
                <button
                  className={s.icon_button}
                  type="submit"
                  onClick={() => {
                    updateCash(
                      operation.id,
                      operation.category_id,
                      operation.sum,
                      symbol
                    );
                  }}
                >
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
