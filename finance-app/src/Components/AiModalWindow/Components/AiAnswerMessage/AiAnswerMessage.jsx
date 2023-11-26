import React from 'react'
import style from "../../AiModalWindow.module.css"

const AiAnswerMessage = ({ aiAnswer }) => {
  return (
    <div className={style.modal_text}>{aiAnswer}</div>
  )
}

export default AiAnswerMessage