import React from "react";

import { numberFormatObject } from "../../functions/numberFormatHalper";

import style from "./ResultLine.module.css";

const ResultLine = ({ text, sum, currencyType }) => {
	return (
		<div className={style.result_line_block}>
			<div className={style.result_line_text}>{text}</div>
			<div className={style.result_line_sum}>{numberFormatObject[currencyType].format(sum)}</div>
		</div>
	);
};

export default ResultLine;
