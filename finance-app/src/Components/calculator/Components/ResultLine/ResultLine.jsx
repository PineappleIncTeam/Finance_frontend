import React from "react"
import style from './ResultLine.module.css'

const ResultLine = ({ text, sum }) => {
  let options = { style: "currency", currency: "RUB" };
  let numberFormat = new Intl.NumberFormat("ru-RU", options);
  // console.log(numberFormat.format(value));
  return (
    <div className={style.result_line_block}>
      <div className={style.result_line_text}>{text}</div>
      <div className={style.result_line_sum}>{numberFormat.format(sum)}</div>
    </div>
  )
}

export default ResultLine
