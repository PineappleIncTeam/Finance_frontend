import React, { useEffect, useState } from "react"
import CurrencyBox from "../CurrencyBox/CurrencyBox"
import { currentDate } from "../../../../urls/urlsAndDates"
import style from "./ExchangeRates.module.css"

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState()
  const USD = exchangeRates && exchangeRates.Valute.USD.Value.toFixed(2)
  const EUR = exchangeRates && exchangeRates.Valute.EUR.Value.toFixed(2)
  const exchangeDate = exchangeRates && exchangeRates.Date.slice(0, 10)
  const dateExchangeDate = exchangeDate && new Date(exchangeDate)
  const dateCurrentDate = new Date(currentDate)
  
  useEffect(() => {
    if (!exchangeRates) getRates()
    if (exchangeDate && dateCurrentDate.getTime() > dateExchangeDate.getTime()) {
      console.log("попал")
      getRates()
    }
  }, [exchangeDate, currentDate])
  
  function getRates() {
    console.log("skachal")
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => response.json())
      .then((data) => setExchangeRates(data))
  }
  return (
    <>
      <div className={style.exchange_title}>Курс валют на сегодня</div>
      {exchangeRates && (
        <div className={style.currency_block}>
          <CurrencyBox symbol={"$"} data={USD} />
          <CurrencyBox symbol={`€`} data={EUR} />
        </div>
      )}
    </>
  )
}

export default ExchangeRates
