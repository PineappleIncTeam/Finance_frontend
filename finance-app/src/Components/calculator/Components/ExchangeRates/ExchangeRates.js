import React, { useEffect, useState } from "react"
import CurrencyBox from "../CurrencyBox/CurrencyBox"
import { currentDate } from "../../../../urls/urlsAndDates"
import CurrencyChoiceButton from "../CurrencyChoiceButton/CurrencyChoiceButton"
import {
  getCurrencyCalculation,
  getReverseCalculation,
} from "../../functions/getCurrencyCalculation"
import style from "./ExchangeRates.module.css"

const ExchangeRates = ({
  totalCost,
  setTotalCost,
  anInitialFee,
  setAnInitialFee,
  exchangeRates,
  setExchangeRates,
  currencyType,
  setCurrencyType,
  setResult,
  realEstate,
  data,
}) => {
  const USD = exchangeRates && exchangeRates.Valute.USD.Value.toFixed(2)
  const EUR = exchangeRates && exchangeRates.Valute.EUR.Value.toFixed(2)
  const exchangeDate = exchangeRates && exchangeRates.Date.slice(0, 10)
  const dateExchangeDate = exchangeDate && new Date(exchangeDate)
  const dateCurrentDate = new Date(currentDate)
  const [exchangeRate, setExchangeRate] = useState(USD)

  useEffect(() => {
    if (!exchangeRates) getRates()
    if (
      exchangeDate &&
      dateCurrentDate.getTime() > dateExchangeDate.getTime()
    ) {
      console.log("попал")
      getRates()
    }
  }, [exchangeDate, currentDate, currencyType, realEstate, data])

  function getRates() {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => response.json())
      .then((data) => setExchangeRates(data))
  }
  return (
    <div className={style.exchange_rates_block}>
      <div className={style.currency_buttons_block}>
        <CurrencyChoiceButton
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          anInitialFee={anInitialFee}
          setAnInitialFee={setAnInitialFee}
          exchangeRate={USD}
          setExchangeRate={setExchangeRate}
          calculationFunction={getCurrencyCalculation}
          symbol={"$"}
          type={"usd"}
          currencyType={currencyType}
          setCurrencyType={setCurrencyType}
          setResult={setResult}
        />
        <CurrencyChoiceButton
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          anInitialFee={anInitialFee}
          setAnInitialFee={setAnInitialFee}
          exchangeRate={exchangeRate}
          setExchangeRate={setExchangeRate}
          calculationFunction={getReverseCalculation}
          symbol={"₽"}
          type={"rub"}
          currencyType={currencyType}
          setCurrencyType={setCurrencyType}
          setResult={setResult}
        />
        <CurrencyChoiceButton
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          anInitialFee={anInitialFee}
          setAnInitialFee={setAnInitialFee}
          exchangeRate={EUR}
          setExchangeRate={setExchangeRate}
          calculationFunction={getCurrencyCalculation}
          symbol={"€"}
          type={"eur"}
          currencyType={currencyType}
          setCurrencyType={setCurrencyType}
          setResult={setResult}
        />
      </div>
      <div className={style.currency_data_block}>
        {exchangeRates ? (
          <>
        <div className={style.exchange_title}><a className={style.exchange_title_link} href="https://www.cbr-xml-daily.ru/" target="_blanck">Виджет курсов валют</a> ЦБ РФ <br />на {exchangeDate}</div>
          <div className={style.currency_block}>
            <CurrencyBox symbol={"$"} data={USD} />
            <CurrencyBox symbol={`€`} data={EUR} />
          </div>
          </>
        ) : (
          <div className={style.exchange_title}>Нет данных курса валют</div>
        )}
      </div>
    </div>
  )
}

export default ExchangeRates
