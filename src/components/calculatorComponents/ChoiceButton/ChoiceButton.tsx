import style from "./ChoiceButton.module.css";

const ChoiceButton = ({ textContent, active, setActive }: any) => {
	return (
		<button className={active ? `${style.button} ${style.active}` : style.button} onClick={setActive}>
			{textContent}
		</button>
	);
};

export default ChoiceButton;
