import { getPercentFromTotalCost } from "../../../utils/calculatorUtils";

import style from "./PercentButton.module.css";

const PercentButton = ({ percents, active, setAnInitialFee, totalCost }: any) => {
	return (
		<button
			className={style.button}
			onClick={() => getPercentFromTotalCost(totalCost, percents, setAnInitialFee)}
			disabled={!active}>
			{percents}%
		</button>
	);
};

export default PercentButton;
