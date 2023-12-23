import React from "react"
import closeIcon from "../../../../Images/closeIcon.svg"
import style from "./InformBox.module.css"
import InformMessage from "../InformMessage/InformMessage"

const InformBox = ({
  setActiveVirtualAssistant,
  setActiveModal,
  aiAnswer,
  aiSavingMoneyAdvice,
  aiTaxDeduction,
}) => {
  return (
    <div className={style.inform_block}>
      <div className={style.delete_icon} onClick={() => setActiveVirtualAssistant(false)}>
        <img src={closeIcon} alt="X" />
      </div>
      {aiAnswer && (
        <InformMessage text={"Аналитика от виртуального помощника"} />
      )}
      {aiSavingMoneyAdvice && <InformMessage text={"Есть совет по экономии"} />}
      {aiTaxDeduction && (
        <InformMessage text={"Есть возможность получения налогового вычета"} />
      )}
      <button className={style.inform_button} onClick={() => setActiveModal(true)}>
        Получить информацию
      </button>
    </div>
  )
}

export default InformBox
