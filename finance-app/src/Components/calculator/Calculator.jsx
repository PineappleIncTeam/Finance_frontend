import CalculatorInput from "./Components/CalculatorInput/CalculatorInput"
import { useEffect, useState } from "react"
import style from "./Calculator.module.css"
import CalculatorButton from "./Components/CalculatorButton/CalculatorButton"
import CalculationResult from "./Components/CalculationResult/CalculationResult"

function Calculator({ setCheckMainField }) {
  useEffect(() => {
    setCheckMainField(false)
  })
  const [totalCost, setTotalCost] = useState(0)
  const [anInitialFee, setAnInitialFee] = useState(0)
  const [creditTerm, setCreditTerm] = useState(0)
  const [creditRate, setCreditRate] = useState(0)
  const [result, setResult] = useState()
  const data = [totalCost, anInitialFee, creditTerm, creditRate]

  return (
    <>
      <h2 className={style.title}>Калькулятор</h2>
      <div className={style.calculator_page}>
        <div className={style.calculation_block}>
          <div className={style.input_block}>
            <CalculatorInput
              label={"Стоимость недвижимости"}
              min={0}
              max={999000000}
              value={totalCost}
              setValue={setTotalCost}
            />
          </div>
          <div className={style.input_block}>
            <CalculatorInput
              label={"Первоначальный взнос"}
              min={0}
              max={999000000}
              value={anInitialFee}
              setValue={setAnInitialFee}
            />
          </div>
          <div className={style.input_block}>
            <CalculatorInput
              label={"Срок кредита (лет)"}
              min={0}
              max={35}
              value={creditTerm}
              setValue={setCreditTerm}
            />
          </div>
          <div className={style.input_block}>
            <CalculatorInput
              label={"Процентная ставка (%)"}
              min={0}
              max={40}
              value={creditRate}
              setValue={setCreditRate}
              step={0.1}
            />
          </div>
          <div className={style.calculator_button}>
            <CalculatorButton setResult={setResult} data={data} />
          </div>
        </div>

        <div className={style.result_block}>
          <CalculationResult result={result} />
        </div>
      </div>
    </>
  )
}

export default Calculator
