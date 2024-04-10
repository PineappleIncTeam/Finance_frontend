import { useEffect, useState } from "react";

import useAppSelector from "../../../hooks/useAppSelector";

import PersonElement from "../personElement/PersonElement";
import InformBox from "../InformBox/InformBox";
import userDataSelector from "../../../services/redux/features/userData/UserDataSelector";
import {
	getAiAnswer,
	getAiMoneyAdvice,
	getAiTaxRecommendation,
} from "../../../services/api/mainFieldApi/VirtualAssistant";

import AiModalWindow from "../../aiModal/windowBaseElement/AiModalWindow";

import style from "./VirtualAssistantBase.module.css";

const VirtualAssistant = ({ active, setActive, checked, setChecked }: any) => {
	const token = useAppSelector(userDataSelector).token;

	const [aiModalWindow, setAiModalWindow] = useState(false);
	const aiHelper = JSON.parse(localStorage.getItem("aiHelper") ?? "");

	const [aiAnswer, setAiAnswer] = useState("");
	const [aiSavingMoneyAdvice, setAiSavingMoneyAdvice] = useState("");
	const [aiTaxDeduction, setAiTaxDeduction] = useState("");

	async function getAiRecommendation() {
		await getAiAnswer(token ?? "")
			.then((response) => response.json())
			.then((result) => setAiAnswer(result.ai_answer));
		await getAiMoneyAdvice(token ?? "")
			.then((response) => response.json())
			.then((result) => setAiSavingMoneyAdvice(result.ai_answer));
		await getAiTaxRecommendation(token ?? "")
			.then((response) => response.json())
			.then((result) => setAiTaxDeduction(result.ai_answer));
	}

	useEffect(() => {
		if (checked && !aiAnswer) {
			getAiRecommendation();
		}
		if (checked && aiAnswer) {
			setActive(true);
		}
		if (!checked) {
			setActive(false);
		}
	}, [checked]);

	useEffect(() => {
		if (aiAnswer || aiSavingMoneyAdvice || aiTaxDeduction) {
			setActive(true);
		}
	}, [aiAnswer, aiSavingMoneyAdvice, aiTaxDeduction]);

	return (
		<div className={active ? `${style.virtual_assistant_block} ${style.active}` : style.virtual_assistant_block}>
			<PersonElement />
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
	);
};

export default VirtualAssistant;
