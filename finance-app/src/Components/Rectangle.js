// Первый компонент, главная страница. Будет появляться после странички авторизации. Сейчас сразу отображается на экране.

import "./Rectangle.css";
import Navigation from "./Navigation";
import MainField from "./MainField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Aside from "./Aside/Aside";
import Transactions from "./Transactions/Transactions";
import MainFieldRouter from "./RoutePage/MainFieldRouter";

function Rectangle() {
  const token = useSelector((state) => state.user.token);
  const [operationList, setOperationList] = useState("");

  function getOperationList() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch("http://92.255.79.239:8000/api/last-5-incomecash/", options)
      .then((result) => result.json())
      .then((responseServer) => {
        setOperationList("");
        setOperationList(responseServer);
      });
  }
  useEffect(() => {
    getOperationList();
  }, []);

  return (
    <div className="rectangle">
      <Navigation />
      <div className="main">
        <div className="mainField">
          <div className="mainFieldBlock">
            <MainFieldRouter getOperationList={getOperationList} />
          </div>
          <div className="aside">
            <Aside />
          </div>
        </div>

        <div className="transactions">
          <Transactions operationList={operationList} />
        </div>
      </div>
    </div>
  );
}
export default Rectangle;
