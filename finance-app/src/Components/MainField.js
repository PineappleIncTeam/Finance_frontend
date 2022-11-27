// Компонент "Доходы"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainFieldString from "./MainFieldString";

function MainField({ getOperationList }) {
  const token = useSelector((state) => state.user.token);
  const [inputData, setInputData] = useState("");

  //функция получения суммы внесенных данных по категории "Постоянные".
  function getInputData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch("http://92.255.79.239:8000/api/sum-incomecash/", options)
      .then((result) => result.json())
      .then(
        (responseServer) => {
          responseServer.map((responseNumber) => {
            let constSum = Number(responseNumber.constant_sum);
            let onceSum = Number(responseNumber.once_sum);

            setInputData(constSum + onceSum);
          });
        }
        // setInputData(
        //   responseServer.map(
        //     (responseServer) =>
        //       `Постоянные: ${responseServer.constant_sum}; Временные: ${responseServer.once_sum}`
        //   )
        // )
      );
  }
  useEffect(() => {
    getInputData();
  }, []);

  return (
    <div className="main_field" key="">
      <h2 className="main_field_title">Доходы</h2>
      <div className="main_field_title_label">Общий доход</div>
      <div className="main_field_input">
        <input className="input_rub" value={inputData} readOnly></input>
        <span className="ruble_icon">₽</span>
      </div>
      <MainFieldString
        title="Постоянные"
        type="constant"
        getInputData={getInputData}
        typeForSum="constant_sum"
        getOperationList={getOperationList}
      />
      <MainFieldString
        title="Временные"
        type="once"
        getInputData={getInputData}
        typeForSum="onse_sum"
        getOperationList={getOperationList}
      />
    </div>
  );
}

export default MainField;
