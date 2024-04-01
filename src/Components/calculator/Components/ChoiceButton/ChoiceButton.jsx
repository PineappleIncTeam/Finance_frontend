import React from 'react'
import style from './ChoiceButton.module.css'

const ChoiceButton = ({ textContent, active, setActive }) => {
  return (
    <button className={active ? `${style.button} ${style.active}` : style.button} onClick={setActive}>{textContent}</button>
  )
}

export default ChoiceButton