import React from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { URLS } from "../../urls/urlsAndDates"
import style from "./VirtualAssistant.module.css"
import TheMan from "./Components/TheMan/TheMan"
import InformBox from "./Components/InformBox/InformBox"
import AiModalWindow from "../AiModalWindow/AiModalWindow"

const VirtualAssistant = ({ active, setActive, checked, setChecked }) => {
  const token = useSelector((state) => state.user.token)

  const [aiModalWindow, setAiModalWindow] = useState(false)
  const aiHelper = JSON.parse(localStorage.getItem("aiHelper"))

  const [aiAnswer, setAiAnswer] = useState("")
  const [aiSavingMoneyAdvice, setAiSavingMoneyAdvice] = useState("")
  const [aiTaxDeduction, setAiTaxDeduction] = useState("")
  // const [messageType, setMessageType] = useState("Аналитика")

  function getAiRecomendation() {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
    fetch(URLS.getAiAnswer, options)
      .then((response) => response.json())
      .then((result) => setAiAnswer(result.ai_answer))
    fetch(URLS.getSavingMoneyAdvice, options)
      .then((response) => response.json())
      .then((result) => setAiSavingMoneyAdvice(result.ai_answer))
    fetch(URLS.getTaxDeduction, options)
      .then((response) => response.json())
      .then((result) => setAiTaxDeduction(result.ai_answer))
  }

  useEffect(() => {
    if (checked) getAiRecomendation()
    if (!checked) setActive(false)
  }, [checked])

  useEffect(() => {
    if (aiAnswer) setActive(true)
  }, [aiAnswer])

  // function hideArtificialIntelligence(e) {
  //   e.stopPropagation()
  //   if (e.target.value) {
  //     localStorage.setItem("aiHelper", JSON.stringify({ value: false }))
  //     setChecked(false)
  //     setActive(false)
  //   }
  // }

  return (
    <div
      className={
        active
          ? `${style.virtual_asistant_block} ${style.active}`
          : style.virtual_asistant_block
      }
    >
      <TheMan />
      <InformBox
        setActiveVirtualAssistant={setActive}
        setActiveModal={setAiModalWindow}
        aiAnswer={aiAnswer}
        aiSavingMoneyAdvice={aiSavingMoneyAdvice}
        aiTaxDeduction={aiTaxDeduction}
      />
      <AiModalWindow
        active={aiModalWindow}
        setActive={setAiModalWindow}
        aiHelper={aiHelper}
        checked={checked}
        setChecked={setChecked}
        aiAnswer={aiAnswer}
        aiSavingMoneyAdvice={aiSavingMoneyAdvice}
        aiTaxDeduction={aiTaxDeduction}
      />
    </div>
  )
}

export default VirtualAssistant
