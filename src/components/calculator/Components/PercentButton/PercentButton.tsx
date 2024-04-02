import React from "react";

import { getPercentFromTotalCost } from "../../functions/getPercentFromTotalCost";

import style from "./PercentButton.module.css";

const PercentButton = ({ percents, active, setAnInitialFee, totalCost }) => {
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
