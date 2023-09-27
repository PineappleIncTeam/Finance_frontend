import CalculatorInput from "./Components/CalculatorInput"
import { useEffect, useState } from "react"
import style from "./Calculator.module.css"

function Calculator({ setCheckMainField }) {
  useEffect(() => {
    setCheckMainField(false)
  }, [])
  const [totalCost, setTotalCost] = useState(0)
  const [anInitialFee, setAnInitialFee] = useState(0)
  const [creditTerm, setCreditTerm] = useState(0)
  const [creditRate, setCreditRate] = useState(0)

  return (
    <>
    <h2>Калькулятор</h2>
      <div className={style.input_block}>
        <div className={style.input_label}>Стоимость недвижимости</div>
        <CalculatorInput min={0} max={100000000} value={totalCost} setValue={setTotalCost} />
      </div>
      <div className={style.input_block}>
        <div className={style.input_label}>Первоначальный взнос</div>
        <CalculatorInput min={0} max={100000000} value={anInitialFee} setValue={setAnInitialFee} />
      </div>
      <div className={style.input_block}>
        <div className={style.input_label}>Срок кредита (лет)</div>
        <CalculatorInput min={0} max={35} value={creditTerm} setValue={setCreditTerm} />
      </div>
      <div className={style.input_block}>
        <div className={style.input_label}>Процентная ставка (%)</div>
        <CalculatorInput min={0} max={100} value={creditRate} setValue={setCreditRate} step={0.01}/>
      </div>
    </>
  )
}

export default Calculator
