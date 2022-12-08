// Первый компонент, главная страница. Будет появляться после странички авторизации. Сейчас сразу отображается на экране.

import "./Rectangle.css";
import Navigation from "./Navigation";
// import MainField from "./MainField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Aside from "./Aside/Aside";
import Transactions from "./Transactions/Transactions";
import MainFieldRouter from "./RoutePage/MainFieldRouter";

function Rectangle() {
  const token = useSelector((state) => state.user.token);
  const [operationList, setOperationList] = useState("");
  const [symbol, setSymbol] = useState('+');
  const [balanceData, setBalanceData] = useState("");
  // let typeOfOperation = "http://92.255.79.239:8000/api/last-5-incomecash/";
  
  function getOperationList(endpoint, symbol) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch(endpoint, options)
      .then((result) => result.json())
      .then((responseServer) => {
        setOperationList("");
        setOperationList(responseServer);
        setSymbol(symbol)
      });
  }
  // useEffect(() => {
  //   getOperationList(typeOfOperation);
  // }, []);
  function getBalanceData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch("http://92.255.79.239:8000/api/balance/", options)
      .then((result) => result.json())
      .then((responseServer) => setBalanceData(responseServer.sum_balance))
    };
  

  useEffect(() => {
    getBalanceData();
  }, []);

  return (
    <div className="rectangle">
      <Navigation />
      <div className="main">
        <div className="mainField">
          <div className="mainFieldBlock">
            <MainFieldRouter getOperationList={getOperationList} getBalanceData={getBalanceData} />
          </div>
          <div className="aside">
            <Aside balanceData={balanceData} />
          </div>
        </div>

        <div className="transactions">
          <Transactions getBalanceData={getBalanceData} getOperationList={getOperationList} operationList={operationList} symbol={symbol} />
        </div>
      </div>
    </div>
  );
}
export default Rectangle;
