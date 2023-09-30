import React, { useEffect, useState } from "react"
import style from "./CalculatorButton.module.css"
import { getMortgageCalculation } from "../../functions/getMortgageCalculation"

const CalculatorButton = ({ setResult, data }) => {
  const [blocked, setBlocked] = useState(true)
  const [totalCost, anInitialFee, creditTerm, creditRate] = data

  function getResult() {
    let result = getMortgageCalculation(
      totalCost,
      anInitialFee,
      creditTerm,
      creditRate
    )
    setResult(result)
  }
  useEffect(() => {
    if (totalCost > 0 && anInitialFee > 0 && creditTerm > 0 && creditRate > 0)
      setBlocked(false)
    else setBlocked(true)
  }, [totalCost, anInitialFee, creditTerm, creditRate])
  return (
    <>
      <button className={style.button} onClick={getResult} disabled={blocked}>
        Рассчитать кредит
      </button>
      <button
        className={style.button_mini}
        onClick={getResult}
        disabled={blocked}
      >
        +
      </button>
    </>
  )
}

export default CalculatorButton
