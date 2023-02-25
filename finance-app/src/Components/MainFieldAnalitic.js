// Компонент "Аналитика"
// import MainFieldString from './MainFieldString';
import { current } from "@reduxjs/toolkit"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ChartGistograms from "./analiticGistograms/ChartGistograms"
import Gistogram from "./analiticGistograms/Gistogram"


function MainFieldAnalitic({
  operationList,
  changeRangeCalendar,
  range,
  setCheckMainField,
}) {
  const token = useSelector((state) => state.user.token)
  const [sumGroupIncome, setSumGroupIncome] = useState([])
  const [sumGroupOutcome, setSumGroupOutcome] = useState([])
  const [gistogramType, setGistogramType] = useState('pie')
  const dataCalRange = useSelector((state) => state.data.dataRange)
  const [isActive, setIsActive] = useState("income")

  const dataStart =
    dataCalRange.length > 1 && dataCalRange[0].split(".").reverse().join("-")
  const dataEnd =
    dataCalRange.length > 1 && dataCalRange[1].split(".").reverse().join("-")
  //
  let dateStartObject = new Date(dataStart)
  let dateEndObject = new Date(dataEnd)
  let result = dateEndObject.getMonth() - dateStartObject.getMonth()
  useEffect(() => {
    if (result !== 0) {
      setGistogramType('bar')
      console.log(gistogramType)
    } else {
      setGistogramType('pie')
      console.log(gistogramType)
    }
  }, [dataCalRange])
  //
  useState(() => setCheckMainField(false), [])
  function getAnaliticSum() {
    const optionsIncome = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(
      `http://92.255.79.239:8000/api/sum-incomecash-group/?date_start=${dataStart}&date_end=${dataEnd}`,
      optionsIncome
    )
      .then((result) => result.json())
      .then((dataSum) => setSumGroupIncome(dataSum))

    const optionsOutcome = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(
      `http://92.255.79.239:8000/api/sum-outcomecash-group/?date_start=${dataStart}&date_end=${dataEnd}`,
      optionsOutcome
    )
      .then((result) => result.json())
      .then((dataSum) => setSumGroupOutcome(dataSum))
  }

  useEffect(() => {
    getAnaliticSum()
    changeRangeCalendar(true)
  }, [operationList, dataCalRange])

  const categoryNameIncome =
    sumGroupIncome.length > 0 &&
    sumGroupIncome[0].sum.map((item) => item.categories__categoryName)
  const resultSumIncome =
    sumGroupIncome.length > 0 &&
    sumGroupIncome[0].sum.map((item) => item.result_sum)

  const categoryNameOutcome =
    sumGroupOutcome.length > 0 &&
    sumGroupOutcome[0].sum.map((item) => item.categories__categoryName)
  const resultSumOutcome =
    sumGroupOutcome.length > 0 &&
    sumGroupOutcome[0].sum.map((item) => item.result_sum)

  function handleChange(e) {
    setIsActive(e.target.value)
  }

  return (
    <div className="main_field main_field_analitic">
      <h2 className="main_field_title main_field_title_analitic">Аналитика</h2>
      <div className="analitic_select_zone">
        <select className="analitic_select" onChange={(e) => handleChange(e)}>
          <option className="analitic_select_option" value="income" selected>
            Доходы
          </option>
          <option className="analitic_select_option" value="costs">
            Расходы
          </option>
          <option className="analitic_select_option" value="storage" disabled>
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
              checked
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
            />
            <label htmlFor="option2">В процентах</label>
          </div>
        </form>
      </div>
      {gistogramType === 'pie' ? (
      <ChartGistograms
        categoryNameIncome={categoryNameIncome}
        resultSumIncome={resultSumIncome}
        categoryNameOutcome={categoryNameOutcome}
        resultSumOutcome={resultSumOutcome}
        isActive={isActive}
      />
      ) : (
      <Gistogram />
      ) }
      

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
  )
}

export default MainFieldAnalitic
