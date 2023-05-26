// Компонент "Расходы"
import { useEffect, useState } from "react";
// import { render } from "react-dom";
import { useSelector } from "react-redux";
import MainFieldString from "./MainFieldString";
import { URLS, months, month } from "../urls/urlsAndDates";

function MainFieldCosts({
  getOperationList,
  getBalanceData,
  getInputData,
  inputData,
  changeRangeCalendar,
  setCheckMainField,
}) {
  const token = useSelector((state) => state.user.token);
  const [categories, setCategories] = useState("");
  // console.log(render)
  const [storageCategories, setStorageCategories] = useState("")
  console.log(storageCategories)
  // const planned = ["Планируемые", "Добавить категорию"];

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
  
  function getStorageCategories(typeOfCategories) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch(typeOfCategories, options)
      .then((result) => result.json())
      .then((userCategories) => setStorageCategories(userCategories));
  }

  useEffect(() => {
    getInputData(URLS.sumOutcomeCash);
    setCheckMainField(true);
    getOperationList(URLS.outcomeOperations, "-");
    getCategories(URLS.getOutcomeCategories);
    getStorageCategories(URLS.getIncomeCategories)
    changeRangeCalendar(false);
  }, []);

  return (
    <div className="main_field">
      <h2 className="main_field_title">Расходы</h2>
      <div className="main_field_input">
        <input className="input_rub" value={inputData} readOnly></input>
        <span className="ruble_icon">₽</span>
      </div>
      <div className="main_field_title_label">Общий расход за <span className="balance_month">{months[month]}</span></div>
      <MainFieldString
        title="Постоянные"
        type="constant"
        income_outcome="outcome"
        endpoint={URLS.outcomeOperations}
        typeOfSum={URLS.POSToutcomecash}
        getInputData={getInputData}
        sumCash={URLS.sumOutcomeCash}
        typeForSum="constant_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={URLS.getOutcomeCategories}
        categories={categories}
        symbol="-"
        getBalanceData={getBalanceData}
      />
      <MainFieldString
        title="Временные"
        type="once"
        income_outcome="outcome"
        endpoint={URLS.outcomeOperations}
        typeOfSum={URLS.POSToutcomecash}
        getInputData={getInputData}
        sumCash={URLS.sumOutcomeCash}
        typeForSum="once_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={URLS.getOutcomeCategories}
        categories={categories}
        symbol="-"
        getBalanceData={getBalanceData}
      />
      <MainFieldString
        title="Накопления"
        // type=""
        categories={storageCategories}
        getCategories={getStorageCategories}
        typeOfCategories={URLS.getIncomeCategories}
      />

      <div className="mobileSum">
        <div className="mobileSum_input">
          <div className="mainTextSumm">Ваш общий расход за <span className="balance_month_mobile">{months[month]}</span></div>
          <input className="input_rubMobile" value={inputData} readOnly></input>
          <span className="ruble_iconMobile">₽</span>
        </div>
      </div>
    </div>
  );
}

export default MainFieldCosts;
