"use client";

import style from "./calculator.module.scss"

export default function Calculator() {
	return (
		<div className={style.calculatorPageWrap}>

			<div className={style.calculatorPageContainer}>

				<h1 className={style.headerTitle}>Калькулятор</h1>

				<div className={style.currencySelectionWrapper}>

					<p className={style.currencySelectionWrapper__description}>Расчитать в:</p>

					{/* В отдельный компонент */}
					<div className={style.currencySelectionRadioGroup}>
						<input name="currency" type="radio" id="currencySelectionRadioGroup__usd" className={style.currencySelectionRadioGroup__input} />
						<label htmlFor="currencySelectionRadioGroup__usd" className={style.currencySelectionRadioGroup__label}>
							<p className={style.currencySelectionRadioGroup__text}>$</p>
						</label>
						<input name="currency" type="radio" id="currencySelectionRadioGroup__rub" className={style.currencySelectionRadioGroup__input} defaultChecked/>
						<label htmlFor="currencySelectionRadioGroup__rub" className={style.currencySelectionRadioGroup__label}>
							<p className={style.currencySelectionRadioGroup__text}>₽</p>
						</label>
						<input name="currency" type="radio" id="currencySelectionRadioGroup__eur" className={style.currencySelectionRadioGroup__input} />
						<label htmlFor="currencySelectionRadioGroup__eur" className={style.currencySelectionRadioGroup__label}>
							<p className={style.currencySelectionRadioGroup__text}>€</p>
						</label>
					</div>

				</div>

				<div className={style.calculationWrapper}>

					<form className={style.calculatorFormContentWrapper}>
					
						<div></div>

						<div></div>

						<div></div>

						<div></div>

						<div></div>

						<div></div>

						<button></button>

					</form>

					<div className={style.calculationInfoWrapper}>

					</div>

				</div>

			</div>
		</div>
	);
}