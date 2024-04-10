import CreditTermRateButton from "../CreditTermRateButton/CreditTermRateButton";

import style from "./CreditTermRateButtonBlock.module.css";

const CreditTermRateButtonBlock = ({ data, content, setData }: any) => {
	return (
		<div className={style.credit_term_button_block}>
			{data &&
				data.map((item: any, index: any) => {
					return <CreditTermRateButton data={item} content={content} setData={setData} key={index} />;
				})}
		</div>
	);
};

export default CreditTermRateButtonBlock;
