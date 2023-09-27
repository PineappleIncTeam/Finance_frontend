import { useState } from "react"
import style from "./CalculatorInput.module.css"

const CalculatorInput = ({ min, max, value, setValue }) => {
  const [error, setError] = useState(false)
  const [focus, setFocus] = useState(false)

  function handleInput(e) {
    e.preventDefault()
    setValue(e.target.value)
    setError(false)
    if (e.target.value > max) setError(true)
  }

  return (
    <div className={style.input_block}>
      <input
        className={`${style.input} ${error && style.input_error} ${focus && style.active}`}
        type="number"
        value={value}
        onChange={(e) => handleInput(e)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      ></input>
      <input
        className={`${style.input_range} ${error && style.input_range_error}`}
        type="range"
        min={min}
        max={max}
        value={value ? value : 0 }
        onInput={(e) => handleInput(e)}
      ></input>
      {error && <div className={style.error_message}>Не более {max}</div>}
    </div>
  )
}

export default CalculatorInput
