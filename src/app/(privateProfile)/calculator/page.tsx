"use client";

import React, { useState } from "react";

import style from "./calculator.module.scss";

export default function Calculator() {

    const [value, setValue] = useState<number | string>("");

    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/\s+/g, '');
        const newValue = rawValue ? Number(rawValue) : "";
        setValue(newValue);
    };

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(Number(newValue));
    };

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
					
						<div className={style.selectionOfCalculationContainer}>
							<input name="select-of-calculation" type="radio" id="selectionOfCalculationContainer__real" className={style.selectionOfCalculationContainer__input} defaultChecked/>
							<label htmlFor="selectionOfCalculationContainer__real" className={style.selectionOfCalculationContainer__label}>
								<p className={style.selectionOfCalculationContainer__text}>Недвижимость</p>
							</label>
							<input name="select-of-calculation" type="radio" id="selectionOfCalculationContainer__credit" className={style.selectionOfCalculationContainer__input}/>
							<label htmlFor="selectionOfCalculationContainer__credit" className={style.selectionOfCalculationContainer__label}>
								<p className={style.selectionOfCalculationContainer__text}>Кредит</p>
							</label>
						</div>
						
						<div className={style.propertyValueContainer}>
							<label className={style.propertyValueContainer__label} htmlFor="q1">Стоимость недвижимости, ₽</label>
							<div className={style.inputRangeFieldConatiner}>
								<input
                                    type="text"
                                    value={formatNumber(Number(value))}
                                    onChange={handleInputChange}
                                    className={style.inputRangeFieldConatiner__input}
                                    min="0"
                                    max="10000000"
                                    id="q1"
                                />
								<input 
									type="range" 
									value={value} 
									onChange={handleRangeChange} 
									className={style.inputRangeFieldConatiner__range} 
									min="0" 
									max="10000000" 
								/>
							</div>
						</div>

						<div>
							<label className={style.propertyValueContainer__label} htmlFor="q1">Первоначальный взнос, ₽</label>
							<div className={style.inputRangeFieldConatiner}>
								<input
                                    type="text"
                                    value={formatNumber(Number(value))}
                                    onChange={handleInputChange}
                                    className={style.inputRangeFieldConatiner__input}
                                    min="0"
                                    max="1000000"
                                    id="q1"
                                />
								<input 
									type="range" 
									value={value} 
									onChange={handleRangeChange} 
									className={style.inputRangeFieldConatiner__range} 
									min="0" 
									max="1000000" 
								/>
							</div>
						</div>

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