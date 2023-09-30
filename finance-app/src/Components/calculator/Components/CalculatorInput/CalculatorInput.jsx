import { useState } from "react"
import style from "./CalculatorInput.module.css"

const CalculatorInput = ({ min, max, value, setValue, label }) => {
  const [error, setError] = useState(false)
  const [focus, setFocus] = useState(false)


  function handleInput(e) {
    e.preventDefault()
    setError(false)
    if (e.target.value > max) setError(true)
    if (e.target.value === 0 || e.target.value === "0") setValue("")
    else setValue(e.target.value)
  }
function getFocus(e) {
  e.preventDefault()
  if (value === 0 || value === "0") setValue("")
  setFocus(true)
}
  return (
    <div className={style.input_block}>
      <div className={style.input_label}>{label}</div>
      <input
        className={`${style.input} ${error && style.input_error} ${focus && style.active}`}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => handleInput(e)}
        onFocus={(e) => getFocus(e)}
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
