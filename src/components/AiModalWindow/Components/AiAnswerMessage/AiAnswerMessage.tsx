import style from "../../AiModalWindow.module.css";

const AiAnswerMessage = ({ aiAnswer }: any) => {
	return <div className={style.modal_text}>{aiAnswer}</div>;
};

export default AiAnswerMessage;
