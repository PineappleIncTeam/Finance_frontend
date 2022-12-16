// Компонент "Доходы"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainFieldString from "./MainFieldString";

function MainField({
  getOperationList,
  getBalanceData,
  getInputData,
  inputData,
  sumIncomeCash,
  changeRangeCalendar,
  range,
}) {
  const token = useSelector((state) => state.user.token);
  const [categories, setCategories] = useState("");

  const incomeOperations = "http://92.255.79.239:8000/api/last-5-incomecash/";
  const typeOfSum = "http://92.255.79.239:8000/api/incomecash/";
  const typeOfCategories = "http://92.255.79.239:8000/api/income-categories/";

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
    changeRangeCalendar(false);
    console.log("srabotal");
  }, []);

  useEffect(() => {
    getInputData(sumIncomeCash);
  }, []);

  useEffect(() => {
    getOperationList(incomeOperations, "+");
  }, []);

  return (
    <div className="main_field" key="">
      <h2 className="main_field_title">Доходы</h2>
      <div className="main_field_input">
        <input className="input_rub" value={inputData} readOnly></input>
        <span className="ruble_icon">₽</span>
      </div>
      <div className="main_field_title_label">Общий доход</div>
      <MainFieldString
        title="Постоянные"
        type="constant"
        income_outcome="income"
        endpoint={incomeOperations}
        typeOfSum={typeOfSum}
        getInputData={getInputData}
        sumCash={sumIncomeCash}
        typeForSum="constant_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={typeOfCategories}
        categories={categories}
        symbol="+"
        getBalanceData={getBalanceData}
        range={range}
      />
      <MainFieldString
        title="Временные"
        type="once"
        income_outcome="income"
        endpoint={incomeOperations}
        typeOfSum={typeOfSum}
        getInputData={getInputData}
        sumCash={sumIncomeCash}
        typeForSum="onse_sum"
        getOperationList={getOperationList}
        getCategories={getCategories}
        typeOfCategories={typeOfCategories}
        categories={categories}
        symbol="+"
        getBalanceData={getBalanceData}
      />
    </div>
  );
}

export default MainField;
