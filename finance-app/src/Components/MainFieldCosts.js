// Компонент "Расходы"
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { useSelector } from "react-redux";
import MainFieldString from "./MainFieldString";

function MainFieldCosts({ getOperationList, getBalanceData, getInputData, inputData, sumOutcomeCash }) {
  const token = useSelector((state) => state.user.token);
  const [categories, setCategories] = useState("");
  const planned = ["Планируемые", "Добавить категорию"];

  let outcomeOperations = "http://92.255.79.239:8000/api/last-5-outcomecash/";
  let typeOfSum = "http://92.255.79.239:8000/api/outcomecash/";
  let typeOfCategories = "http://92.255.79.239:8000/api/outcome-categories/";

  function getCategories(typeOfCategories) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch(typeOfCategories, options)
      .then((result) => result.json())
      .then((userCategories) => setCategories(userCategories));
  }

  useEffect(() => {
    getCategories(typeOfCategories);
  }, []);

  useEffect(() => {
    getInputData(sumOutcomeCash)
  }, []);

  useEffect(() => {
    getOperationList(outcomeOperations, "-");
  }, []);

  return (
    <div className="main_field">
      <h2 className="main_field_title">Расходы</h2>
      <div className="main_field_title_label">Общий расход</div>
      <div className="main_field_input">
        <input className="input_rub" value={inputData} readOnly></input>
        <span className="ruble_icon">₽</span>
      </div>
      <MainFieldString
        title="Постоянные"
        type="constant"
        income_outcome="outcome"
        endpoint={outcomeOperations}
        typeOfSum={typeOfSum}
        getInputData={getInputData}
        sumCash={sumOutcomeCash}
        typeForSum="constant_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={typeOfCategories}
        categories={categories}
        symbol="-"
        getBalanceData={getBalanceData}
      />
      <MainFieldString
        title="Временные"
        type="once"
        income_outcome="outcome"
        endpoint={outcomeOperations}
        typeOfSum={typeOfSum}
        getInputData={getInputData}
        sumCash={sumOutcomeCash}
        typeForSum="once_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={typeOfCategories}
        categories={categories}
        symbol="-"
        getBalanceData={getBalanceData}
      />
      <MainFieldString
        title="Планируемые"
        type={planned}
        categories={categories}
      />
    </div>
  );
}

export default MainFieldCosts;
