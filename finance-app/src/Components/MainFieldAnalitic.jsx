// Компонент "Аналитика"
// import MainFieldString from './MainFieldString';
// import { current } from "@reduxjs/toolkit"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ChartGistograms from "./analiticGistograms/ChartGistograms"
import Gistogram from "./analiticGistograms/Gistogram"
import percentFunction from "./analiticGistograms/percentFunction"
import { URLS, firstDayOfMonth, lastDayOfMonth } from "../urls/urlsAndDates"
// import style from "../Components/analiticGistograms/Gistogram.module.css"

function MainFieldAnalitic({
  changeRangeCalendar,
  range,
  getStorageCategories,
  sum,
  balanceToTarget,
  balanceToTargetInPercent,
  setCheckMainField,
  gistogramSize,
}) {
  const token = useSelector((state) => state.user.token)
  const [sumGroupIncome, setSumGroupIncome] = useState([])
  const [sumGroupOutcome, setSumGroupOutcome] = useState([])
  const [gistogramType, setGistogramType] = useState("pie")
  const dataCalRange = useSelector((state) => state.data.dataRange)
  const [isActive, setIsActive] = useState("income")
  //
  const [percentChoice, setPercentChoice] = useState(false)
  //
  // console.log(sum, balanceToTarget, balanceToTargetInPercent)
  const dataStart =
    dataCalRange.length > 1
      ? dataCalRange[0].split(".").reverse().join("-")
      : firstDayOfMonth
  const dataEnd =
    dataCalRange.length > 1
      ? dataCalRange[1].split(".").reverse().join("-")
      : lastDayOfMonth
  //

  let dateStartObject = new Date(dataStart)
  let dateEndObject = new Date(dataEnd)
  let result = dateEndObject.getMonth() - dateStartObject.getMonth()
  //
  useEffect(() => {
    if (result) {
      setGistogramType("bar")
    } else {
      setGistogramType("pie")
    }
    getAnaliticSum()
    changeRangeCalendar(true)
  }, [dataCalRange, result])
  //
  useEffect(() => setCheckMainField(false))
  function getAnaliticSum() {
    const incomeEndpoint = result
      ? `${URLS.getSumMonthlyIncome}?date_start=${dataStart}&date_end=${dataEnd}`
      : `${URLS.getSumIncomeGroup}?date_start=${dataStart}&date_end=${dataEnd}`
    const outcomeEndpoint = result
      ? `${URLS.getSumMonthlyOutcome}?date_start=${dataStart}&date_end=${dataEnd}`
      : `${URLS.getSumOutcomeGroup}?date_start=${dataStart}&date_end=${dataEnd}`
    const optionsIncome = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(incomeEndpoint, optionsIncome)
      .then((result) => result.json())
      .then((dataSumIncome) => {
        setSumGroupIncome(dataSumIncome)
        if (percentChoice && result && dataSumIncome.length > 0) {
          setIncomePercent(percentFunction(dataSumIncome))
        }
      })

    const optionsOutcome = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(outcomeEndpoint, optionsOutcome)
      .then((result) => result.json())
      .then((dataSumOutcome) => {
        setSumGroupOutcome(dataSumOutcome)
        if (percentChoice && result && dataSumOutcome.length > 0) {
          setOutcomePercent(percentFunction(dataSumOutcome))
        }
      })
  }

  useEffect(() => {
    getStorageCategories(URLS.getMoneyBoxCategories)
  }, [])

  //.sort((a, b) => b.result_sum - a.result_sum) - сортировка данных по размеру суммы
  const categoryNameIncome =
    sumGroupIncome.length > 0 && sumGroupIncome[0].sum && !result
      ? sumGroupIncome[0].sum
          .sort((a, b) => b.result_sum - a.result_sum)
          .map((item) => item.categories__categoryName)
      : []
  const resultSumIncome =
    sumGroupIncome.length > 0 && sumGroupIncome[0].sum && !result
      ? sumGroupIncome[0].sum
          .sort((a, b) => b.result_sum - a.result_sum)
          .map((item) => item.result_sum)
      : []

  const categoryNameOutcome =
    sumGroupOutcome.length > 0 && sumGroupOutcome[0].sum && !result
      ? sumGroupOutcome[0].sum
          .sort((a, b) => b.result_sum - a.result_sum)
          .map((item) => item.categories__categoryName)
      : []
  const resultSumOutcome =
    sumGroupOutcome.length > 0 && sumGroupOutcome[0].sum && !result
      ? sumGroupOutcome[0].sum
          .sort((a, b) => b.result_sum - a.result_sum)
          .map((item) => item.result_sum)
      : []

  function handleChange(e) {
    setIsActive(e.target.value)
  }
  //
  const gistogramSumIncome =
    sumGroupIncome.length > 0 && result ? sumGroupIncome : []
  const gistogramSumOutcome =
    sumGroupOutcome.length > 0 && result ? sumGroupOutcome : []

  let resultSumIncomeTotal =
    resultSumIncome.length > 0 && resultSumIncome.reduce((a, b) => a + b)
  let onePercentIncome = resultSumIncomeTotal / 100
  let resultSumIncomeInPercent = []
  for (let i = 0; i < resultSumIncome.length; i++) {
    resultSumIncomeInPercent.push(
      (resultSumIncome[i] / onePercentIncome).toFixed(2)
    )
  }
  let resultSumOutcomeTotal =
    resultSumOutcome.length > 0 && resultSumOutcome.reduce((a, b) => a + b)
  let onePercentOutcome = resultSumOutcomeTotal / 100
  let resultSumOutcomeInPercent = []
  for (let i = 0; i < resultSumOutcome.length; i++) {
    resultSumOutcomeInPercent.push(
      (resultSumOutcome[i] / onePercentOutcome).toFixed(2)
    )
  }
  //

  const [incomePercent, setIncomePercent] = useState([])
  const [outcomePercent, setOutcomePercent] = useState([])

  function handlePercentChange(e) {
    if (e.target.value === "В рублях") return setPercentChoice(false)

    if (e.target.value === "В процентах" && isActive === "storage")
      return setPercentChoice(true)

    if (
      (e.target.value === "В процентах" && isActive === "costs") ||
      "income"
    ) {
      setPercentChoice(true)
      sumGroupIncome.length > 0 &&
        setIncomePercent(percentFunction(sumGroupIncome))
      sumGroupOutcome.length > 0 &&
        setOutcomePercent(percentFunction(sumGroupOutcome))
      return
    }
  }

  return (
    <div className="main_field main_field_analitic">
      <h2 className="main_field_title main_field_title_analitic">Аналитика</h2>
      <div className="analitic_select_zone">
        <select
          className="analitic_select"
          defaultValue="income"
          onChange={(e) => handleChange(e)}
        >
          <option className="analitic_select_option" value="income">
            Доходы
          </option>
          <option className="analitic_select_option" value="costs">
            Расходы
          </option>
          <option className="analitic_select_option" value="storage">
            Накопления
          </option>
          <option className="analitic_select_option" value="analitic" disabled>
            Аналитика
          </option>
        </select>
        <form className="analitic_select_form">
          <div>
            <input
              className="analitic_radio_input"
              type="radio"
              id="option1"
              name="analitic_select"
              value="В рублях"
              onClick={(e) => handlePercentChange(e)}
            />
            <label htmlFor="option1">В рублях</label>
          </div>
          <div>
            <input
              className="analitic_radio_input"
              type="radio"
              id="option2"
              name="analitic_select"
              value="В процентах"
              onClick={(e) => handlePercentChange(e)}
            />
            <label htmlFor="option2">В процентах</label>
          </div>
        </form>
      </div>
      {gistogramType === "pie" && !result ? (
        <ChartGistograms
          categoryNameIncome={categoryNameIncome}
          resultSumIncome={
            !percentChoice ? resultSumIncome : resultSumIncomeInPercent
          }
          categoryNameOutcome={categoryNameOutcome}
          resultSumOutcome={
            !percentChoice ? resultSumOutcome : resultSumOutcomeInPercent
          }
          isActive={isActive}
          percentChoice={percentChoice}
          storageSum={!percentChoice ? sum : balanceToTargetInPercent[0]}
          balanceToTarget={
            !percentChoice ? balanceToTarget : balanceToTargetInPercent[1]
          }
        />
      ) : (
        <Gistogram
          gistogramSize={gistogramSize}
          sumGroupIncome={gistogramSumIncome}
          sumGroupOutcome={gistogramSumOutcome}
          isActive={isActive}
          percentChoice={percentChoice}
          incomePercent={incomePercent}
          outcomePercent={outcomePercent}
          storageSum={!percentChoice ? sum : balanceToTargetInPercent[0]}
          balanceToTarget={
            !percentChoice ? balanceToTarget : balanceToTargetInPercent[1]
          }
        />
      )}
    </div>
  )
}

export default MainFieldAnalitic
