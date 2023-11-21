import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import closeIcon from "../../Images/closeIcon.svg"
import style from "./AiModalWindow.module.css"
import { URLS } from "../../urls/urlsAndDates"

const AiModalWindow = ({ active, setActive, checked, setChecked }) => {
  const aiHelper = JSON.parse(localStorage.getItem("aiHelper"))
  const token = useSelector((state) => state.user.token)
  const [aiAnswer, setAiAnswer] = useState("")

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
  }
  useEffect(() => {
    if (checked) getAiRecomendation()
  }, [checked])

  useEffect(() => {
    if (aiAnswer) setActive(true)
  }, [aiAnswer])

  function hideArtificialIntelligence(e) {
    e.stopPropagation()
    if (e.target.value) {
      localStorage.setItem("aiHelper", JSON.stringify({ value: false }))
      setChecked(false)
      setActive(false)
    }
  }

  return (
    <div
      className={active ? `${style.modal} ${style.active}` : style.modal}
      onMouseDown={() => {
        setActive(false)
      }}
    >
      <div
        className={style.modal_content}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={style.delete_icon} onClick={() => setActive(false)}>
          <img src={closeIcon} alt="X" />
        </div>
        <div className={style.modal_text}>{aiAnswer}</div>
        <div className={style.ai_helper_checkbox}>
          <input
            type="checkbox"
            id="aiCheckbox"
            onChange={(e) => hideArtificialIntelligence(e)}
            checked={!checked}
          />
          <label>Не показывать сообщение помощника по финансам</label>
        </div>
      </div>
    </div>
  )
}
export default AiModalWindow
