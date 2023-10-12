import React from "react"
import ResultLine from "../ResultLine/ResultLine"
import ResultTitle from "../ResultTitle/ResultTitle"

const CalculationResult = ({ result, currencyType }) => {
  return (
    <>
      {result && (
        <div>
          <ResultTitle text={"Ежемесячный платеж"} sum={result.monthlyPaymentToFixed} currencyType={currencyType} />
          <ResultLine text={"Кредит"} sum={result.loanAmount} currencyType={currencyType} />
          <ResultLine text={"Проценты"} sum={result.overpaymentToFixed} currencyType={currencyType} />
          <ResultLine text={"Проценты + кредит"} sum={result.totalPaymentToFixed} currencyType={currencyType} />
        </div>
      )}
    </>
  )
}

export default CalculationResult
