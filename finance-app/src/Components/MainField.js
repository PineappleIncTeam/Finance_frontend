// Компонент "Доходы"
import { useState } from "react";
import MainFieldString from "./MainFieldString";

function MainField() {
  const [inputData, setInputData] = useState("");
  function getInputData(data) {
    setInputData(data);
  }
  return (
    <div className="main_field" key="">
      <h2 className="main_field_title">Доходы</h2>
      <input className="input_rub" value={inputData}></input>
      <MainFieldString
        title="Постоянные"
        type="constant"
        getInputData={getInputData}
      />
      <MainFieldString
        title="Временные"
        type="once"
        getInputData={getInputData}
      />
    </div>
  );
}

export default MainField;
