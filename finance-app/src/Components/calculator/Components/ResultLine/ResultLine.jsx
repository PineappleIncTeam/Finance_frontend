import React from "react"
import { numberFormat } from "../../functions/numberFormatHalper"
import style from "./ResultLine.module.css"

const ResultLine = ({ text, sum }) => {
  return (
    <div className={style.result_line_block}>
      <div className={style.result_line_text}>{text}</div>
      <div className={style.result_line_sum}>{numberFormat.format(sum)}</div>
    </div>
  )
}

export default ResultLine
