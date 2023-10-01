import React, { useEffect, useState } from "react"
import style from "./CalculatorButton.module.css"
import { getMortgageCalculation } from "../../functions/getMortgageCalculation"
import { getCreditCalculation } from "../../functions/getCreditCalculation"

const CalculatorButton = ({ setResult, data, creditType }) => {
  const [blocked, setBlocked] = useState(true)
  const [totalCost, anInitialFee, creditTerm, creditRate] = data

  function getResult() {
    let result
    if (creditType) {
      result = getMortgageCalculation(
        totalCost,
        anInitialFee,
        creditTerm,
        creditRate
      )
    } else {
      result = getCreditCalculation(
        totalCost,
        creditTerm,
        creditRate
      )
    }
    setResult(result)
  }
  useEffect(() => {
    if (creditType) {
      if (totalCost > 0 && anInitialFee > 0 && creditTerm > 0 && creditRate > 0)
        setBlocked(false)
      else setBlocked(true)
    } else {
      if (totalCost > 0 && creditTerm > 0 && creditRate > 0) setBlocked(false)
      else setBlocked(true)
    }
  }, [totalCost, anInitialFee, creditTerm, creditRate])

  return (
    <>
      <button className={style.button} onClick={getResult} disabled={blocked}>
        Рассчитать кредит
      </button>
    </>
  )
}

export default CalculatorButton
