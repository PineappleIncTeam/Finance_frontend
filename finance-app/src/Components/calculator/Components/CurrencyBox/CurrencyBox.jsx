import React from 'react'
import style from './CurrencyBox.module.css'

const CurrencyBox = ({ symbol, data }) => {
  return (
    <div className={style.currensy_box}>
        <div className={style.currensy_symbol}>{symbol}</div>
        <div className={style.currency_data}>{data}</div>
    </div>
  )
}

export default CurrencyBox