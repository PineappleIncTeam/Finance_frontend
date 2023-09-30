import React from 'react'
import style from './ResultTitle.module.css'

const ResultTitle = ({ text, sum }) => {
    let options = { style: "currency", currency: "RUB" };
    let numberFormat = new Intl.NumberFormat("ru-RU", options);
    // console.log(numberFormat.format(value));
    return (
      <div className={style.result_title_block}>
        <div className={style.result_title_text}>{text}</div>
        <div className={style.result_title_sum}>{numberFormat.format(sum)}</div>
      </div>
    )
}

export default ResultTitle