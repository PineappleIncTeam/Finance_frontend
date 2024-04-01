import React from "react"
import style from "./AiAnswerButton.module.css"

const AiAnswerButton = ({ active, name, setAnswer }) => {
  return (
    <button
      className={active ? `${style.button} ${style.active}` : style.button}
      onClick={() => setAnswer(name)}
    >
      {name}
    </button>
  )
}

export default AiAnswerButton
