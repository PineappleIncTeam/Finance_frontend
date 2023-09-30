import React from "react"
import ResultLine from "../ResultLine/ResultLine"
import ResultTitle from "../ResultTitle/ResultTitle"

const CalculationResult = ({ result }) => {
  return (
    <>
      {result && (
        <div>
          <ResultTitle text={"Ежемесячный платеж"} sum={result.monthlyPaymentToFixed} />
          <ResultLine text={"Кредит"} sum={result.loanAmount} />
          <ResultLine text={"Проценты"} sum={result.overpaymentToFixed} />
          <ResultLine text={"Проценты + кредит"} sum={result.totalPaymentToFixed} />
        </div>
      )}
    </>
  )
}

export default CalculationResult
