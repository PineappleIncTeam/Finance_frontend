// Первый компонент, главная страница. Будет появляться после странички авторизации. Сейчас сразу отображается на экране.

import "./Rectangle.css";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Aside from "./Aside/Aside";
import Transactions from "./Transactions/Transactions";
import MainFieldRouter from "./RoutePage/MainFieldRouter";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Rectangle() {
  const token = useSelector((state) => state.user.token);
  const [operationList, setOperationList] = useState("");
  const [symbol, setSymbol] = useState("+");
  const [balanceData, setBalanceData] = useState("");
  const [inputData, setInputData] = useState("");
  const [checkMainField, setCheckMainField] = useState(true);
  //
  const [range, setRange] = useState(true);
  const [menuActive, setMenuActive] = useState(false);

  function changeRangeCalendar(range) {
    setRange(range);
  }
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let lastDay = lastDayDate.toLocaleString().substring(0, 2);
  let firstDayOfMonth = `${year}-${month}-01`;
  let lastDayOfMonth = `${year}-${month}-${lastDay}`;

  //
  // let typeOfOperation = "http://92.255.79.239:8000/api/last-5-incomecash/";
  const sumIncomeCash = `http://92.255.79.239:8000/api/sum-incomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`;
  const sumOutcomeCash = `http://92.255.79.239:8000/api/sum-outcomecash/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`;

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
        setSymbol(symbol);
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
    fetch(
      `http://92.255.79.239:8000/api/balance/?date_start=${firstDayOfMonth}&date_end=${lastDayOfMonth}`,
      options
    )
      .then((result) => result.json())
      .then((responseServer) => setBalanceData(responseServer.sum_balance));
  }

  useEffect(() => {
    getBalanceData();
  }, []);

  function getInputData(endpoint) {
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
        if (responseServer.length) {
          responseServer.map((responseNumber) => {
            let constSum = Number(responseNumber.constant_sum);
            let onceSum = Number(responseNumber.once_sum);
            let sumField = constSum + onceSum;
            setInputData(sumField);
          });
        } else {
          setInputData("0");
        }
      });
  }

  return (
    <div
      className="rectangle"
      onClick={() => menuActive && setMenuActive(!menuActive)}
    >
      <div className="mobile_burg" onClick={() => setMenuActive(!menuActive)}>
        {menuActive ? (
          <AiOutlineClose color="teal" size={40} />
        ) : (
          <AiOutlineMenu color="teal" size={40} />
        )}
      </div>

      <Navigation menuActive={menuActive} setMenuActive={setMenuActive} />
      <div className={menuActive ? "main active" : "main"} active={menuActive}>
        <div className="mainField">
          <div className="mainFieldBlock">
            <MainFieldRouter
              getOperationList={getOperationList}
              getBalanceData={getBalanceData}
              getInputData={getInputData}
              sumIncomeCash={sumIncomeCash}
              sumOutcomeCash={sumOutcomeCash}
              inputData={inputData}
              operationList={operationList}
              changeRangeCalendar={changeRangeCalendar}
              range={range}
              setCheckMainField={setCheckMainField}
            />
          </div>
          <div className="aside">
            <Aside balanceData={balanceData} range={range} />
          </div>
        </div>
        {checkMainField && (
          <div className="transactions">
            <Transactions
              getBalanceData={getBalanceData}
              getOperationList={getOperationList}
              operationList={operationList}
              symbol={symbol}
              getInputData={getInputData}
              sumIncomeCash={sumIncomeCash}
              sumOutcomeCash={sumOutcomeCash}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default Rectangle;
