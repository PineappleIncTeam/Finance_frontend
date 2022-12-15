// Компонент "Аналитика"
// import MainFieldString from './MainFieldString';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChartGistograms from "./analiticGistograms/ChartGistograms";

function MainFieldAnalitic() {
  const token = useSelector((state) => state.user.token);
  const [sumGroupIncome, setSumGroupIncome] = useState("");
  const [sumGroupOutcome, setSumGroupOutcome] = useState("");
  const sumIncomeGroup =
    "http://92.255.79.239:8000/api/sum-incomecash-group/?date_start=2022-08-10&date_end=2022-12-31";
  const sumOutomeGroup =
    "http://92.255.79.239:8000/api/sum-outcomecash-group/?date_start=2022-08-10&date_end=2022-12-31";

  function getAnaliticSum() {
    const optionsIncome = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch(sumIncomeGroup, optionsIncome)
      .then((result) => result.json())
      .then((dataSum) => setSumGroupIncome(dataSum));

    const optionsOutcome = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch(sumOutomeGroup, optionsOutcome)
      .then((result) => result.json())
      .then((dataSum) => setSumGroupOutcome(dataSum));
  }

  useEffect(() => {
    getAnaliticSum();
  }, []);

  const categoryNameIncome =
    sumGroupIncome &&
    sumGroupIncome[0].sum.map((item) => item.categories__categoryName);
  const resultSumIncome =
    sumGroupIncome && sumGroupIncome[0].sum.map((item) => item.result_sum);

  const categoryNameOutcome =
    sumGroupOutcome &&
    sumGroupOutcome[0].sum.map((item) => item.categories__categoryName);
  const resultSumOutcome =
    sumGroupOutcome && sumGroupOutcome[0].sum.map((item) => item.result_sum);

  console.log(sumGroupIncome);
  console.log(sumGroupOutcome);

  return (
    <div className="main_field main_field_analitic">
      <h2 className="main_field_title">Аналитика</h2>

      <ChartGistograms
        categoryNameIncome={categoryNameIncome}
        resultSumIncome={resultSumIncome}
        categoryNameOutcome={categoryNameOutcome}
        resultSumOutcome={resultSumOutcome}
      />

      {/* <label className="label_analitic label_analitic1">
        Доходы
        <input
          className="main_field_string_input analitic_string"
          type="text"
        ></input>
      </label>
      <label className="label_analitic">
        Расходы
        <input
          className="main_field_string_input analitic_string"
          type="text"
        ></input>
      </label>
      <label className="label_analitic">
        Баланс
        <input
          className="main_field_string_input analitic_string"
          type="text"
        ></input>
      </label>
      <h3 className="main_field_analitic_h3">Перевести в накопления</h3>
      <div>
        <input
          className="main_field_string_input analitic_string_down"
          type="text"
        ></input>
        <input
          className="main_field_string_input analitic_string_down"
          type="text"
        ></input>
        <button type="submit" className="main_field_string_button analitic_button">Добавить</button>
      </div> */}
    </div>
  );
}

export default MainFieldAnalitic;
