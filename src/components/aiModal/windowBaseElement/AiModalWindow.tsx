import { BaseSyntheticEvent, useState } from "react";

import { messageTypeValues } from "../../../helpers/AiModalWindow";

import closeIcon from "../../../assets/closeIcon.svg";

import AiAnswerMessage from "../aiAnswerComponents/AiAnswerMessage/AiAnswerMessage";
import AiAnswerButton from "../aiAnswerComponents/AIAnswerButton/AiAnswerButton";

import style from "./AiModalWindow.module.css";

const AiModalWindow = ({
	active,
	setActive,
	checked,
	setChecked,
	aiAnswer,
	aiSavingMoneyAdvice,
	aiTaxDeduction,
}: any) => {
	const [messageType, setMessageType] = useState<string>(messageTypeValues.analytic);

	function hideArtificialIntelligence(e: BaseSyntheticEvent) {
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
					<img src={closeIcon} alt="cross" />
				</div>
				<div className={aiSavingMoneyAdvice || aiTaxDeduction ? style.answer_button_block : style.disabled}>
					{aiAnswer && (
						<AiAnswerButton
							name={messageTypeValues.analytic}
							setAnswer={setMessageType}
							active={messageType === messageTypeValues.analytic ? true : false}
						/>
					)}
					{aiSavingMoneyAdvice && (
						<AiAnswerButton
							name={messageTypeValues.economicAdvice}
							setAnswer={setMessageType}
							active={messageType === messageTypeValues.economicAdvice ? true : false}
						/>
					)}
					{aiTaxDeduction && (
						<AiAnswerButton
							name={messageTypeValues.taxDeduction}
							setAnswer={setMessageType}
							active={messageType === messageTypeValues.taxDeduction ? true : false}
						/>
					)}
				</div>
				{messageType === messageTypeValues.analytic && <AiAnswerMessage aiAnswer={aiAnswer} />}
				{messageType === messageTypeValues.economicAdvice && <AiAnswerMessage aiAnswer={aiSavingMoneyAdvice} />}
				{messageType === messageTypeValues.taxDeduction && <AiAnswerMessage aiAnswer={aiTaxDeduction} />}
				<div className={style.ai_helper_checkbox}>
					<input type="checkbox" id="aiCheckbox" onChange={(e) => hideArtificialIntelligence(e)} checked={!checked} />
					<label>Не показывать сообщение помощника по финансам</label>
				</div>
			</div>
		</div>
	);
};
export default AiModalWindow;
