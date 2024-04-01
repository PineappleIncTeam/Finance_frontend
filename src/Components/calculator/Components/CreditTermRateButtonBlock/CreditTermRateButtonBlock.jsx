import React from "react"
import CreditTermRateButton from "../CreditTermRateButton/CreditTermRateButton"
import style from "./CreditTermRateButtonBlock.module.css"

const CreditTermRateButtonBlock = ({ data, content, setData }) => {
  return (
    <div className={style.credit_term_button_block}>
      {data &&
        data.map((item, index) => {
          return (
            <CreditTermRateButton
              data={item}
              content={content}
              setData={setData}
              key={index}
            />
          )
        })}
      {/* <CreditTermRateButton creditTerm={10} setData={setData} />
      <CreditTermRateButton creditTerm={15} setData={setData} />
      <CreditTermRateButton creditTerm={20} setData={setData} /> */}
    </div>
  )
}

export default CreditTermRateButtonBlock
