import style from "./AiAnswerButton.module.css";

const AiAnswerButton = ({ active, name, setAnswer }: any) => {
	return (
		<button className={active ? `${style.button} ${style.active}` : style.button} onClick={() => setAnswer(name)}>
			{name}
		</button>
	);
};

export default AiAnswerButton;
