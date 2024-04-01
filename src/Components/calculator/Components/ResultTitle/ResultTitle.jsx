import React from 'react'
import style from './ResultTitle.module.css'
import { numberFormatObject } from '../../functions/numberFormatHalper';

const ResultTitle = ({ text, sum, currencyType }) => {
    return (
      <div className={style.result_title_block}>
        <div className={style.result_title_text}>{text}</div>
        <div className={style.result_title_sum}>{numberFormatObject[currencyType].format(sum)}</div>
      </div>
    )
}

export default ResultTitle