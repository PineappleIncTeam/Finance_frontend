// Компонент "Аналитика"
// import MainFieldString from './MainFieldString';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChartGistograms from "./analiticGistograms/ChartGistograms";
import TransactionList from "./Transactions/TransactionList";

function MainFieldAnalitic({ operationList, changeRangeCalendar, range }) {
  const token = useSelector((state) => state.user.token);
  const [sumGroupIncome, setSumGroupIncome] = useState([]);
  const [sumGroupOutcome, setSumGroupOutcome] = useState([]);
  const dataCalRange = useSelector((state) => state.data.dataRange);

  const dataStart =
    dataCalRange.length > 1 && dataCalRange[0].split(".").reverse().join("-");
  const dataEnd =
    dataCalRange.length > 1 && dataCalRange[1].split(".").reverse().join("-");

  function getAnaliticSum() {
    const optionsIncome = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch(
      `http://92.255.79.239:8000/api/sum-incomecash-group/?date_start=${dataStart}&date_end=${dataEnd}`,
      optionsIncome
    )
      .then((result) => result.json())
      .then((dataSum) => setSumGroupIncome(dataSum));

    const optionsOutcome = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    fetch(
      `http://92.255.79.239:8000/api/sum-outcomecash-group/?date_start=${dataStart}&date_end=${dataEnd}`,
      optionsOutcome
    )
      .then((result) => result.json())
      .then((dataSum) => setSumGroupOutcome(dataSum));
  }

  useEffect(() => {
    getAnaliticSum();
    changeRangeCalendar(true);
  }, [operationList, dataCalRange]);

  const categoryNameIncome =
    sumGroupIncome.length > 0 &&
    sumGroupIncome[0].sum.map((item) => item.categories__categoryName);
  const resultSumIncome =
    sumGroupIncome.length > 0 &&
    sumGroupIncome[0].sum.map((item) => item.result_sum);

  const categoryNameOutcome =
    sumGroupOutcome.length > 0 &&
    sumGroupOutcome[0].sum.map((item) => item.categories__categoryName);
  const resultSumOutcome =
    sumGroupOutcome.length > 0 &&
    sumGroupOutcome[0].sum.map((item) => item.result_sum);

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
