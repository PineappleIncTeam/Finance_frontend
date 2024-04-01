import React from "react"
import style from './CurrencyChoiceButton.module.css'

const CurrencyChoiceButton = ({
  totalCost,
  setTotalCost,
  anInitialFee,
  setAnInitialFee,
  exchangeRate,
  setExchangeRate,
  calculationFunction,
  symbol,
  type,
  currencyType,
  setCurrencyType,
  setResult
}) => {
  const disabled = currencyType === type || (type === 'usd' && currencyType === 'eur') || (type === 'eur' && currencyType === 'usd')
  function currencyCalculation() {
    setResult()
    setCurrencyType(type)
    setExchangeRate(exchangeRate)
    let result = calculationFunction(totalCost, anInitialFee, exchangeRate)
    setTotalCost(result.totalCostResult)
    setAnInitialFee(result.anInitialFeeResult)
  }
  return <button className={currencyType === type ? `${style.active} ${style.button}` : style.button } onClick={currencyCalculation} disabled={disabled}>{symbol}</button>
}

export default CurrencyChoiceButton
