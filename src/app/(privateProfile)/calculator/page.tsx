import style from "./calculator.module.scss"

export default function Calculator() {
	return (
		<div className={style.calculatorPageWrap}>
			<div className={style.calculatorPageContainer}>
				<form className={style.calculatorFormContentWrapper}>
					<h1>Калькулятор</h1>
				</form>
			</div>
		</div>
	);
}