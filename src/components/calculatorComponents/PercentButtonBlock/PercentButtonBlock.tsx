import React, { useEffect, useState } from "react";

import PercentButton from "../PercentButton/PercentButton";

import style from "./PercentButtonBlock.module.css";

const PercentButtonBlock = ({ totalCost, setAnInitialFee }) => {
	const [percentButtonBlockActive, setPercentButtonBlockActive] = useState(false);
	useEffect(() => {
		totalCost > 0 ? setPercentButtonBlockActive(true) : setPercentButtonBlockActive(false);
	}, [totalCost]);
	return (
		<div className={style.percent_button_block}>
			<PercentButton
				percents={5}
				active={percentButtonBlockActive}
				setAnInitialFee={setAnInitialFee}
				totalCost={totalCost}
			/>
			<PercentButton
				percents={10}
				active={percentButtonBlockActive}
				setAnInitialFee={setAnInitialFee}
				totalCost={totalCost}
			/>
			<PercentButton
				percents={15}
				active={percentButtonBlockActive}
				setAnInitialFee={setAnInitialFee}
				totalCost={totalCost}
			/>
			<PercentButton
				percents={20}
				active={percentButtonBlockActive}
				setAnInitialFee={setAnInitialFee}
				totalCost={totalCost}
			/>
			<PercentButton
				percents={25}
				active={percentButtonBlockActive}
				setAnInitialFee={setAnInitialFee}
				totalCost={totalCost}
			/>
			<PercentButton
				percents={30}
				active={percentButtonBlockActive}
				setAnInitialFee={setAnInitialFee}
				totalCost={totalCost}
			/>
		</div>
	);
};

export default PercentButtonBlock;
