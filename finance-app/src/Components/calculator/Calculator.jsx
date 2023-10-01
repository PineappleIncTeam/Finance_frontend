import CalculatorInput from "./Components/CalculatorInput/CalculatorInput"
import { useEffect, useState } from "react"
import style from "./Calculator.module.css"
import CalculatorButton from "./Components/CalculatorButton/CalculatorButton"
import CalculationResult from "./Components/CalculationResult/CalculationResult"
import PercentButtonBlock from "./Components/PercentButtonBlock/PercentButtonBlock"
import CreditTermRateButtonBlock from "./Components/CreditTermRateButtonBlock/CreditTermRateButtonBlock"
import ChoiceButton from "./Components/ChoiceButton/ChoiceButton"

function Calculator({ setCheckMainField }) {
  useEffect(() => {
    setCheckMainField(false)
  })
  const [totalCost, setTotalCost] = useState(0)
  const [anInitialFee, setAnInitialFee] = useState(0)
  const [creditTerm, setCreditTerm] = useState(0)
  const [creditRate, setCreditRate] = useState(0)
  const [result, setResult] = useState()
  const [realEstate, setRealEstate] = useState(true)
  const data = [totalCost, anInitialFee, creditTerm, creditRate]
  const creditTermData = [5, 10, 15, 20]
  const creditRateData = [5.5, 7.5, 7.9, 11.4, 13.5]

  useEffect(() => {
    setResult()
  }, [realEstate])

  return (
    <div className={style.calculator_main_page}>
      <h2 className={style.title}>Калькулятор</h2>
      <div className={style.choice_buttons_block}>
        <ChoiceButton
          textContent={"Недвижимость"}
          active={realEstate}
          setActive={() => setRealEstate(true)}
        />
        <ChoiceButton
          textContent={"Кредит"}
          active={!realEstate}
          setActive={() => setRealEstate(false)}
        />
      </div>
      <div className={style.calculator_page}>
        <div className={style.calculation_block}>
          <div className={style.input_block}>
            <CalculatorInput
              label={realEstate ? "Стоимость недвижимости" : "Сумма Кредита"}
              min={0}
              max={99999999}
              value={totalCost}
              setValue={setTotalCost}
              unformatted={false}
            />
          </div>
          {realEstate && (
            <>
              <div className={style.input_block}>
                <CalculatorInput
                  label={"Первоначальный взнос"}
                  min={0}
                  max={99499999}
                  value={anInitialFee}
                  setValue={setAnInitialFee}
                  unformatted={false}
                />
              </div>
              <div className={style.percent_button_block}>
                <PercentButtonBlock
                  totalCost={totalCost}
                  setAnInitialFee={setAnInitialFee}
                />
              </div>
            </>
          )}
          <div className={style.input_block}>
            <CalculatorInput
              label={"Срок кредита (лет)"}
              min={0}
              max={35}
              value={creditTerm}
              setValue={setCreditTerm}
              unformatted={true}
            />
          </div>
          <div className={style.percent_button_block}>
            <CreditTermRateButtonBlock
              data={creditTermData}
              content={"лет"}
              setData={setCreditTerm}
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
              unformatted={true}
            />
          </div>
          <div className={style.percent_button_block}>
            <CreditTermRateButtonBlock
              data={creditRateData}
              content={"%"}
              setData={setCreditRate}
            />
          </div>
          <div className={style.calculator_button}>
            <CalculatorButton setResult={setResult} data={data} creditType={realEstate} />
          </div>
        </div>

        <div className={style.result_block}>
          <CalculationResult result={result} />
        </div>
      </div>
    </div>
  )
}

export default Calculator
