import { useEffect, useState } from "react"
import style from "./CalculatorInput.module.css"
import { numberFormat } from "../../functions/numberFormatHalper"

const CalculatorInput = ({
  min,
  max,
  step,
  value,
  setValue,
  label,
  unformatted,
}) => {
  const [error, setError] = useState(false)
  const [focus, setFocus] = useState(false)
  const [visibleValue, setVisibleValue] = useState(false)

  function handleInput(e) {
    e.preventDefault()
    setError(false)
    const value = e.target.value
    if (/,/.test(e.target.value)) e.target.value = value.replace(/,/, ".")
    if (e.target.value > max) setError(true)
    if (e.target.value === 0 || e.target.value === "0") setValue("")
    else if (!/^([0-9])*[.,]{0,1}([0-9]{1,2})?$/.test(e.target.value))
      setValue((prev) => prev)
    else {
      setValue(e.target.value)
    }
  }
  function getFocus(e) {
    e.preventDefault()
    if (value === 0 || value === "0") setValue("")
    setVisibleValue()
    setFocus(true)
  }
  function getBlur(e) {
    e.preventDefault()
    setFocus(false)
    setVisibleValue(numberFormat.format(value))
  }
  useEffect(() => {
    setVisibleValue()
    setVisibleValue(numberFormat.format(value))
    // eslint-disable-next-line
  }, [value])

  return (
    <div className={style.input_block}>
      <div className={style.input_label}>{label}</div>
      <input
        className={`${style.input} ${error && style.input_error} ${
          focus && style.active
        }`}
        type="text"
        min={min}
        max={max}
        value={focus || !visibleValue || unformatted ? value : visibleValue}
        onChange={(e) => handleInput(e)}
        onFocus={(e) => getFocus(e)}
        onBlur={(e) => getBlur(e)}
      ></input>
      <input
        className={`${style.input_range} ${error && style.input_range_error}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value ? value : 0}
        onInput={(e) => handleInput(e)}
      ></input>
      {error && <div className={style.error_message}>Не более {max}</div>}
    </div>
  )
}

export default CalculatorInput
