"use client";

import React, { useState, useEffect } from "react";

import { AiFillInfoCircle } from "react-icons/ai";
import { CgClose } from "react-icons/cg";

import style from "./calculator.module.scss";

export default function Calculator() {
	const [value, setValue] = useState<number>(0);
	const [isVisibleInfo, setIsVisibleInfo] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 460);

	const formatNumber = (num: number) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	};
	const handleVisibleInfo = () => {
		setIsVisibleInfo(true);
	};
	const handleCloseInfo = () => {
		setIsVisibleInfo(false);
	};
	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (isMobile) {
			handleVisibleInfo();
		}
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 425);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const infoStyle = {
		transform: isMobile ? `scale(${isVisibleInfo ? 1 : 0})` : "none",
		transition: "transform 0.3s ease",
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = event.target.value.replace(/\s+/g, "");
		const newValue = rawValue.replace(/[^\d]/g, "");
		setValue(newValue ? Number(newValue) : 0);
	};

	const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		const newValue = Number(target.value);
		setValue(newValue);

		const min = target.min ? Number(target.min) : 0;
		const max = target.max ? Number(target.max) : 10000000;
		const percentage = ((newValue - min) / (max - min)) * 100;

		target.style.setProperty("--percentage", `${percentage}%`);
	};

	return (
		<div className={style.calculatorPageWrap}>
			<div className={style.calculatorPageContainer}>
				<h1 className={style.headerTitle}>Калькулятор</h1>

				<div className={style.currencySelectionWrapper}>
					<p className={style.currencySelectionWrapper__description}>Рассчитать в:</p>
					<div className={style.currencySelectionRadioGroup}>
						<input
							name="currency"
							type="radio"
							id="currencySelectionRadioGroup__usd"
							className={style.currencySelectionRadioGroup__input}
						/>
						<label htmlFor="currencySelectionRadioGroup__usd" className={style.currencySelectionRadioGroup__label}>
							<p className={style.currencySelectionRadioGroup__text}>$</p>
						</label>
						<input
							name="currency"
							type="radio"
							id="currencySelectionRadioGroup__rub"
							className={style.currencySelectionRadioGroup__input}
							defaultChecked
						/>
						<label htmlFor="currencySelectionRadioGroup__rub" className={style.currencySelectionRadioGroup__label}>
							<p className={style.currencySelectionRadioGroup__text}>₽</p>
						</label>
						<input
							name="currency"
							type="radio"
							id="currencySelectionRadioGroup__eur"
							className={style.currencySelectionRadioGroup__input}
						/>
						<label htmlFor="currencySelectionRadioGroup__eur" className={style.currencySelectionRadioGroup__label}>
							<p className={style.currencySelectionRadioGroup__text}>€</p>
						</label>
					</div>
				</div>

				<div className={style.calculationWrapper}>
					<form className={style.calculatorFormContentWrapper}>
						<div className={style.selectionOfCalculationContainer}>
							<input
								name="select-of-calculation"
								type="radio"
								id="selectionOfCalculationContainer__real"
								className={style.selectionOfCalculationContainer__input}
								defaultChecked
							/>
							<label
								htmlFor="selectionOfCalculationContainer__real"
								className={style.selectionOfCalculationContainer__label}>
								<p className={style.selectionOfCalculationContainer__text}>Недвижимость</p>
							</label>
							<input
								name="select-of-calculation"
								type="radio"
								id="selectionOfCalculationContainer__credit"
								className={style.selectionOfCalculationContainer__input}
							/>
							<label
								htmlFor="selectionOfCalculationContainer__credit"
								className={style.selectionOfCalculationContainer__label}>
								<p className={style.selectionOfCalculationContainer__text}>Кредит</p>
							</label>
						</div>

						<div className={style.propertyValueContainer}>
							<label className={style.propertyValueContainer__label} htmlFor="propertyValue">
								Стоимость недвижимости, ₽
							</label>
							<div className={style.inputRangeFieldContainer}>
								<input
									type="text"
									value={formatNumber(value)}
									onChange={handleInputChange}
									className={style.inputRangeFieldContainer__input}
									min="0"
									max="10000000"
									id="propertyValue"
								/>
								<input
									type="range"
									value={value}
									onChange={handleRangeChange}
									className={style.inputRangeFieldContainer__range}
									min="0"
									max="10000000"
								/>
							</div>
						</div>

						<div className={style.propertyValueContainer}>
							<label className={style.propertyValueContainer__label} htmlFor="initialContribution">
								Первоначальный взнос, ₽
							</label>
							<div className={style.inputRangeFieldContainer}>
								<input
									type="text"
									value={formatNumber(value)}
									onChange={handleInputChange}
									className={style.inputRangeFieldContainer__input}
									min="0"
									max="10000000"
									id="initialContribution"
								/>
								<input
									type="range"
									value={value}
									onChange={handleRangeChange}
									className={style.inputRangeFieldContainer__range}
									min="0"
									max="10000000"
								/>
							</div>

							<div className={style.propertyButtonRadioContainer}>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__5"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label htmlFor="propertyButtonRadioContainer__5" className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>5%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__10"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label htmlFor="propertyButtonRadioContainer__10" className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>10%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__15"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label htmlFor="propertyButtonRadioContainer__15" className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>15%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__20"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label htmlFor="propertyButtonRadioContainer__20" className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>20%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__25"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label htmlFor="propertyButtonRadioContainer__25" className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>25%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__30"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label htmlFor="propertyButtonRadioContainer__30" className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>30%</p>
								</label>
							</div>
						</div>

						<div className={style.propertyValueContainer}>
							<label className={style.propertyValueContainer__label} htmlFor="initialContribution">
								Сроки кредита, лет
							</label>
							<div className={style.inputRangeFieldContainer}>
								<input
									type="text"
									value={formatNumber(value)}
									onChange={handleInputChange}
									className={style.inputRangeFieldContainer__input}
									min="0"
									max="10000000"
									id="initialContribution"
								/>
								<input
									type="range"
									value={value}
									onChange={handleRangeChange}
									className={style.inputRangeFieldContainer__range}
									min="0"
									max="10000000"
								/>
							</div>

							<div className={style.propertyButtonRadioContainer}>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__5year"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__5year"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>5 лет</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__10year"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__10year"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>10 лет</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__15year"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__15year"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>15 лет</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__20year"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__20year"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>20 лет</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__25year"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__25year"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>25 лет</p>
								</label>
							</div>
						</div>

						<div className={style.propertyValueContainer}>
							<label className={style.propertyValueContainer__label} htmlFor="initialContribution">
								Процентная ставка, %
							</label>
							<div className={style.inputRangeFieldContainer}>
								<input
									type="text"
									value={formatNumber(value)}
									onChange={handleInputChange}
									className={style.inputRangeFieldContainer__input}
									min="0"
									max="10000000"
									id="initialContribution"
								/>
								<input
									type="range"
									value={value}
									onChange={handleRangeChange}
									className={style.inputRangeFieldContainer__range}
									min="0"
									max="10000000"
								/>
							</div>

							<div className={style.propertyButtonRadioContainer}>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__5-5"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__5-5"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>5.5%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__7-5"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__7-5"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>7.5%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__7-9"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__7-9"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>7.9%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__11-4"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__11-4"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>11.4%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__13-5"
									className={style.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__13-5"
									className={style.propertyButtonRadioContainer__label}>
									<p className={style.propertyButtonRadioContainer__text}>13.5%</p>
								</label>
							</div>
						</div>

						<button onClick={handleSubmit} className={style.calculatorFormContentWrapper__submitBtn} type="submit">
							Расчитать кредит
						</button>
					</form>

					<div className={style.calculationInfoWrapper} style={infoStyle}>
						<div className={style.calculationInfoButtonWrapper}>
							<AiFillInfoCircle className={style.calculationInfoButtonWrapper__infoIcon} />
							<CgClose onClick={handleCloseInfo} className={style.calculationInfoButtonWrapper__closeIcon} />
						</div>
						<p className={style.calculationInfoWrapper__title}>Ежемесячный платеж</p>
						<p className={style.calculationInfoWrapper__price}>26 125 ₽</p>
						<div className={style.creditInfoWrapper}>
							<p className={style.creditInfoWrapper__name}>Кредит</p>
							<p className={style.creditInfoWrapper__value}>5 000 000 ₽</p>
						</div>
						<div className={style.percentInfoWrapper}>
							<p className={style.percentInfoWrapper__name}>Проценты</p>
							<p className={style.percentInfoWrapper__value}>4 500 000 ₽</p>
						</div>
						<div className={style.creditAndPercentInfoWrapper}>
							<p className={style.creditAndPercentInfoWrapper__name}>Кредит + проценты</p>
							<p className={style.creditAndPercentInfoWrapper__value}>9 500 000 ₽</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
