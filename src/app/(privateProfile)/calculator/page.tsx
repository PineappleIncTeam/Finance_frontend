"use client";

import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";

import { AiFillInfoCircle } from "react-icons/ai";
import { CgClose } from "react-icons/cg";

import { formatCalculateNumber } from "../../../utils/formatCalculateNumber";

import handleLogout from "../../../helpers/logout";
import useLogoutTimer from "../../../hooks/useLogoutTimer";
import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

import styles from "./calculator.module.scss";

export default function Calculator() {
	const MAX_VALUE = 10000000;
	const DEFAULT_VALUE = 0;
	const MOBILE_SCREEN = 460;
	const FACTOR = 100;

	const [value, setValue] = useState<number>(DEFAULT_VALUE);
	const [isVisibleInfo, setIsVisibleInfo] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_SCREEN);
	const [activeButton, setActiveButton] = useState<string | null>("realEstate");
	const [baseUrl, setBaseUrl] = useState<string>();
	const { request } = handleLogout(baseUrl);
	const { resetTimer } = useLogoutTimer(request);

	useEffect(() => {
		setBaseUrl(getCorrectBaseUrl());
	}, []);

	useEffect(() => {
		resetTimer();
	}, [request, resetTimer]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= MOBILE_SCREEN);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleVisibleInfo = () => {
		setIsVisibleInfo(true);
	};
	const handleCloseInfo = () => {
		setIsVisibleInfo(false);
	};
	const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
		resetTimer();
		event.preventDefault();
		if (isMobile) {
			handleVisibleInfo();
		}
		return {
			success: true,
			message: "Completed successfully",
		};
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const rawValue = event.target.value.replace(/\s+/g, "");
		const newValue = rawValue.replace(/[^\d]/g, "");
		setValue(newValue ? Number(newValue) : 0);
	};

	const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		const newValue = Number(target.value);
		setValue(newValue);

		const min = target.min ? Number(target.min) : DEFAULT_VALUE;
		const max = target.max ? Number(target.max) : MAX_VALUE;
		const percentage = ((newValue - min) / (max - min)) * FACTOR;

		target.style.setProperty("--percentage", `${percentage}%`);
	};

	const handleButtonClick = (buttonName: "realEstate" | "credit", event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setActiveButton(buttonName);
	};

	const infoStyle = {
		transform: isMobile ? `scale(${isVisibleInfo ? 1 : 0})` : "none",
		transition: "transform 0.3s ease",
	};

	return (
		<div className={styles.calculatorPageWrap}>
			<div className={styles.calculatorPageContainer}>
				<h1 className={styles.headerTitle}>Калькулятор</h1>

				<div className={styles.currencySelectionWrapper}>
					<p className={styles.currencySelectionWrapper__description}>Рассчитать в:</p>
					<div className={styles.currencySelectionRadioGroup}>
						<input
							name="currency"
							type="radio"
							id="currencySelectionRadioGroup__usd"
							className={styles.currencySelectionRadioGroup__input}
						/>
						<label htmlFor="currencySelectionRadioGroup__usd" className={styles.currencySelectionRadioGroup__label}>
							<p className={styles.currencySelectionRadioGroup__text}>$</p>
						</label>
						<input
							name="currency"
							type="radio"
							id="currencySelectionRadioGroup__rub"
							className={styles.currencySelectionRadioGroup__input}
							defaultChecked
						/>
						<label htmlFor="currencySelectionRadioGroup__rub" className={styles.currencySelectionRadioGroup__label}>
							<p className={styles.currencySelectionRadioGroup__text}>₽</p>
						</label>
						<input
							name="currency"
							type="radio"
							id="currencySelectionRadioGroup__eur"
							className={styles.currencySelectionRadioGroup__input}
						/>
						<label htmlFor="currencySelectionRadioGroup__eur" className={styles.currencySelectionRadioGroup__label}>
							<p className={styles.currencySelectionRadioGroup__text}>€</p>
						</label>
					</div>
				</div>

				<div className={styles.calculationWrapper}>
					<form className={styles.calculatorFormContentWrapper}>
						<div className={styles.selectionOfCalculationContainer}>
							<button
								className={`${styles.selectionOfCalculationContainer__button} ${activeButton === "realEstate" ? styles.active : ""}`}
								onClick={(event) => handleButtonClick("realEstate", event)}>
								Недвижимость
							</button>

							<button
								className={`${styles.selectionOfCalculationContainer__button} ${activeButton === "credit" ? styles.active : ""}`}
								onClick={(event) => handleButtonClick("credit", event)}>
								Кредит
							</button>
						</div>

						<div className={styles.propertyValueContainer}>
							<label className={styles.propertyValueContainer__label} htmlFor="propertyValue">
								Стоимость недвижимости, ₽
							</label>
							<div className={styles.inputRangeFieldContainer}>
								<input
									type="text"
									inputMode="numeric"
									value={formatCalculateNumber(value)}
									onChange={handleInputChange}
									className={styles.inputRangeFieldContainer__input}
									min={DEFAULT_VALUE}
									max={MAX_VALUE}
									id="propertyValue"
								/>
								<input
									type="range"
									value={value}
									onChange={handleRangeChange}
									className={styles.inputRangeFieldContainer__range}
									min={DEFAULT_VALUE}
									max={MAX_VALUE}
								/>
							</div>
						</div>

						<div className={styles.propertyValueContainer}>
							<label className={styles.propertyValueContainer__label} htmlFor="initialContribution">
								Первоначальный взнос, ₽
							</label>
							<div className={styles.inputRangeFieldContainer}>
								<input
									type="text"
									inputMode="numeric"
									value={formatCalculateNumber(value)}
									onChange={handleInputChange}
									className={styles.inputRangeFieldContainer__input}
									min={DEFAULT_VALUE}
									max={MAX_VALUE}
									id="initialContribution"
								/>
								<input
									type="range"
									value={value}
									onChange={handleRangeChange}
									className={styles.inputRangeFieldContainer__range}
									min={DEFAULT_VALUE}
									max={MAX_VALUE}
								/>
							</div>

							<div className={styles.propertyButtonRadioContainer}>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__5"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label htmlFor="propertyButtonRadioContainer__5" className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>5%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__10"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__10"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>10%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__15"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__15"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>15%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__20"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__20"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>20%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__25"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__25"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>25%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__30"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__30"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>30%</p>
								</label>
							</div>
						</div>

						<div className={styles.propertyValueContainer}>
							<label className={styles.propertyValueContainer__label} htmlFor="initialContribution">
								Сроки кредита, лет
							</label>
							<div className={styles.inputRangeFieldContainer}>
								<input
									type="text"
									inputMode="numeric"
									value={formatCalculateNumber(value)}
									onChange={handleInputChange}
									className={styles.inputRangeFieldContainer__input}
									min={DEFAULT_VALUE}
									max={MAX_VALUE}
									id="initialContribution"
								/>
								<input
									type="range"
									value={value}
									onChange={handleRangeChange}
									className={styles.inputRangeFieldContainer__range}
									min={DEFAULT_VALUE}
									max={MAX_VALUE}
								/>
							</div>

							<div className={styles.propertyButtonRadioContainer}>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__5year"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__5year"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>5 лет</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__10year"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__10year"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>10 лет</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__15year"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__15year"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>15 лет</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__20year"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__20year"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>20 лет</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__25year"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__25year"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>25 лет</p>
								</label>
							</div>
						</div>

						<div className={styles.propertyValueContainer}>
							<label className={styles.propertyValueContainer__label} htmlFor="initialContribution">
								Процентная ставка, %
							</label>
							<div className={styles.inputRangeFieldContainer}>
								<input
									type="text"
									inputMode="numeric"
									value={formatCalculateNumber(value)}
									onChange={handleInputChange}
									className={styles.inputRangeFieldContainer__input}
									min={DEFAULT_VALUE}
									max={MAX_VALUE}
									id="initialContribution"
								/>
								<input
									type="range"
									value={value}
									onChange={handleRangeChange}
									className={styles.inputRangeFieldContainer__range}
									min={DEFAULT_VALUE}
									max={MAX_VALUE}
								/>
							</div>

							<div className={styles.propertyButtonRadioContainer}>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__5-5"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__5-5"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>5.5%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__7-5"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__7-5"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>7.5%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__7-9"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__7-9"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>7.9%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__11-4"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__11-4"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>11.4%</p>
								</label>
								<input
									name="percent"
									type="radio"
									id="propertyButtonRadioContainer__13-5"
									className={styles.propertyButtonRadioContainer__input}
								/>
								<label
									htmlFor="propertyButtonRadioContainer__13-5"
									className={styles.propertyButtonRadioContainer__label}>
									<p className={styles.propertyButtonRadioContainer__text}>13.5%</p>
								</label>
							</div>
						</div>

						<button onClick={handleSubmit} className={styles.calculatorFormContentWrapper__submitBtn} type="button">
							Рассчитать кредит
						</button>
					</form>

					<div className={styles.calculationInfoWrapper} style={infoStyle}>
						<div className={styles.calculationInfoButtonWrapper}>
							<AiFillInfoCircle className={styles.calculationInfoButtonWrapper__infoIcon} />
							<CgClose onClick={handleCloseInfo} className={styles.calculationInfoButtonWrapper__closeIcon} />
						</div>
						<p className={styles.calculationInfoWrapper__title}>Ежемесячный платеж</p>
						<p className={styles.calculationInfoWrapper__price}>26 125 ₽</p>
						<div className={styles.creditInfoWrapper}>
							<p className={styles.creditInfoWrapper__name}>Кредит</p>
							<p className={styles.creditInfoWrapper__value}>5 000 000 ₽</p>
						</div>
						<div className={styles.percentInfoWrapper}>
							<p className={styles.percentInfoWrapper__name}>Проценты</p>
							<p className={styles.percentInfoWrapper__value}>4 500 000 ₽</p>
						</div>
						<div className={styles.creditAndPercentInfoWrapper}>
							<p className={styles.creditAndPercentInfoWrapper__name}>Кредит + проценты</p>
							<p className={styles.creditAndPercentInfoWrapper__value}>9 500 000 ₽</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
