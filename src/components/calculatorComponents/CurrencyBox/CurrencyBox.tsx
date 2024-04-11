import style from "./CurrencyBox.module.css";

const CurrencyBox = ({ symbol, data }: any) => {
	return (
		<div className={style.currency_box}>
			<div className={style.currency_symbol}>{symbol}</div>
			<div className={style.currency_data}>{data}</div>
		</div>
	);
};

export default CurrencyBox;
