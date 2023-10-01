import React from "react"
import style from "./CreditTermRateButton.module.css"

const CreditTermRateButton = ({ data, content, setData }) => {
  return (
    <button className={style.button} onClick={() => setData(data)}>
      {data} {content}
    </button>
  )
}

export default CreditTermRateButton
