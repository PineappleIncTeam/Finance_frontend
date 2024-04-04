import { numberFormatObject } from "../../../helpers/calculator";

import style from "./ResultTitle.module.css";

const ResultTitle = ({ text, sum, currencyType }: any) => {
	return (
		<div className={style.result_title_block}>
			<div className={style.result_title_text}>{text}</div>
			<div className={style.result_title_sum}>{numberFormatObject[currencyType].format(sum)}</div>
		</div>
	);
};

export default ResultTitle;
