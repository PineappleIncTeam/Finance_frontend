import { useState } from "react";

import closeIcon from "../../assets/closeIcon.svg";

import style from "./AiModalWindow.module.css";
// import { URLS } from "../../urls/urlsAndDates"
import AiAnswerMessage from "./Components/AiAnswerMessage/AiAnswerMessage";
import AiAnswerButton from "./Components/AIAnswerButton/AiAnswerButton";

const AiModalWindow = ({
	active,
	setActive,
	checked,
	setChecked,
	aiAnswer,
	aiSavingMoneyAdvice,
	aiTaxDeduction,
}: any) => {
	// const aiHelper = JSON.parse(localStorage.getItem("aiHelper"))
	// const [aiAnswer, setAiAnswer] = useState("")
	// const [aiSavingMoneyAdvice, setAiSavingMoneyAdvice] = useState("")
	// const [aiTaxDeduction, setAiTaxDeduction] = useState("")
	const [messageType, setMessageType] = useState("Аналитика");

	// function getAiRecomendation() {
	//   const options = {
	//     method: "GET",
	//     headers: {
	//       "Content-type": "application/json",
	//       Authorization: `Token ${token}`,
	//     },
	//   }
	//   fetch(URLS.getAiAnswer, options)
	//     .then((response) => response.json())
	//     .then((result) => setAiAnswer(result.ai_answer))
	//   fetch(URLS.getSavingMoneyAdvice, options)
	//     .then((response) => response.json())
	//     .then((result) => setAiSavingMoneyAdvice(result.ai_answer))
	//   fetch(URLS.getTaxDeduction, options)
	//     .then((response) => response.json())
	//     .then((result) => setAiTaxDeduction(result.ai_answer))
	// }
	// useEffect(() => {
	//   if (checked) getAiRecomendation()
	// }, [checked])

	// useEffect(() => {
	//   if (aiAnswer) setActive(true)
	// }, [aiAnswer])

	function hideArtificialIntelligence(e) {
		e.stopPropagation();
		if (e.target.value) {
			localStorage.setItem("aiHelper", JSON.stringify({ value: false }));
			setChecked(false);
			setActive(false);
		}
	}

	return (
		<div
			className={active ? `${style.modal} ${style.active}` : style.modal}
			onMouseDown={() => {
				setActive(false);
			}}>
			<div className={style.modal_content} onMouseDown={(event) => event.stopPropagation()}>
				<div className={style.delete_icon} onClick={() => setActive(false)}>
					<img src={closeIcon} alt="X" />
				</div>
				<div className={aiSavingMoneyAdvice || aiTaxDeduction ? style.answer_button_block : style.disabled}>
					{aiAnswer && (
						<AiAnswerButton
							name={"Аналитика"}
							setAnswer={setMessageType}
							active={messageType === "Аналитика" ? true : false}
						/>
					)}
					{aiSavingMoneyAdvice && (
						<AiAnswerButton
							name={"Советы по экономии"}
							setAnswer={setMessageType}
							active={messageType === "Советы по экономии" ? true : false}
						/>
					)}
					{aiTaxDeduction && (
						<AiAnswerButton
							name={"Налоговый вычет"}
							setAnswer={setMessageType}
							active={messageType === "Налоговый вычет" ? true : false}
						/>
					)}
				</div>
				{/* <div className={style.modal_text}>{aiAnswer}</div> */}
				{messageType === "Аналитика" && <AiAnswerMessage aiAnswer={aiAnswer} />}
				{messageType === "Советы по экономии" && <AiAnswerMessage aiAnswer={aiSavingMoneyAdvice} />}
				{messageType === "Налоговый вычет" && <AiAnswerMessage aiAnswer={aiTaxDeduction} />}
				<div className={style.ai_helper_checkbox}>
					<input type="checkbox" id="aiCheckbox" onChange={(e) => hideArtificialIntelligence(e)} checked={!checked} />
					<label>Не показывать сообщение помощника по финансам</label>
				</div>
			</div>
		</div>
	);
};
export default AiModalWindow;
