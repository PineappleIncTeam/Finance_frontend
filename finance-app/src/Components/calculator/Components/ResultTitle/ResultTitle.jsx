import React from 'react'
import style from './ResultTitle.module.css'
import { numberFormat } from '../../functions/numberFormatHalper';

const ResultTitle = ({ text, sum }) => {
    return (
      <div className={style.result_title_block}>
        <div className={style.result_title_text}>{text}</div>
        <div className={style.result_title_sum}>{numberFormat.format(sum)}</div>
      </div>
    )
}

export default ResultTitle