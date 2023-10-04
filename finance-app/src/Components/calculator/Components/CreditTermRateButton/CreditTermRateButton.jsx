import React from "react"
import style from "./CreditTermRateButton.module.css"

const CreditTermRateButton = ({ data, content, setData }) => {
  if (data === 1) content = "год"
  if (data === 3) content = "года"
  return (
    <button className={style.button} onClick={() => setData(data)}>
      {data} {content}
    </button>
  )
}

export default CreditTermRateButton
