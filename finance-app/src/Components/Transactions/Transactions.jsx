import { useState, useEffect, useContext } from "react";
import { Context } from '../context';
import React from "react";
import style from "./Transactions.module.css";
import TransactionList from "./TransactionList";
import SelectElement from "../SelectElement";
const Transactions = () => {
  const { token } = useContext(Context);
  const [operationList, setOperationList] = useState('');

  useEffect(function getOperationList() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    fetch('http://127.0.0.1:8000/api/last-5-incomecash/', options)
    .then((result) => result.json())
    .then((responseServer) => {
      setOperationList('');
      setOperationList(responseServer)
    });
    
  }, [setOperationList])
  console.log(operationList)
  return (
    <div className={style.root}>
      <div className={style.text}>Последние операции</div>

      <hr />
      <TransactionList operationList={operationList}/>
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
};

export default Transactions;
