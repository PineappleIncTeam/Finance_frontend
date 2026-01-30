"use client";

import { useState, useEffect, MouseEvent, useTransition, useRef } from "react";
import Image from "next/image";
import cn from "classnames/dedupe";
import { useForm } from "react-hook-form";

import { useRuntimeEnv } from "../../../hooks/useRuntimeEnv";
import { useLogoutTimer } from "../../../hooks/useLogoutTimer";
import { useHandleLogout } from "../../../hooks/useHandleLogout";

import { ICalculatorForm, TCalcTypes } from "../../../types/pages/Calculator";
import Button from "../../../ui/Button/Button";
import InactivityLogoutModal from "../../../components/userProfileLayout/inactivityLogoutModal/inactivityLogoutModal";
import CalcRageInput from "../../../components/userProfileLayout/calcRageInput/calcRageInput";
import Spinner from "../../../ui/spinner/spinner";
import { InputTypeList } from "../../../helpers/Input";
import { ButtonType } from "../../../helpers/buttonFieldValues";
import { mockBaseUrl } from "../../../mocks/envConsts";
import {
	businessLoanTermsAdditionalValues,
	consumerLoanTermsAdditionalValues,
	downPaymentAdditionalValues,
	factorValue,
	interestRateAdditionalValues,
	mobileScreenWidthValue,
	yearMonthCount,
} from "../../../helpers/calculatorConsts";
import { formatCalculateNumber } from "../../../utils/formatCalculateNumber";

import { InfoIcon } from "../../../assets/script/calculator/InfoIcon";
import crossIcon from "../../../assets/components/userProfile/crossIcon.svg";

import styles from "./calculator.module.scss";

export default function Calculator() {
	const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
	const [resultLoanInterest, setResultLoanInterest] = useState<number>(0);
	const [isVisibleInfo, setIsVisibleInfo] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= mobileScreenWidthValue);
	const [activeCalc, setActiveCalc] = useState<TCalcTypes>(TCalcTypes.realEstate);
	const [isLoaderShow, setIsLoaderShow] = useState<boolean>(false);
	const [isChangingCalcType, startChangingCalcType] = useTransition();
	const loaderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const { handleSubmit, control, setValue, watch, reset } = useForm<ICalculatorForm>({
		defaultValues: {
			loanAmount: "0",
			downPayment: "0",
			loanTerms: "1",
			interestRate: "1.0",
		},
	});

	const { getSafeEnvVar } = useRuntimeEnv(["NEXT_PUBLIC_BASE_URL"]);

	const baseUrl = getSafeEnvVar("NEXT_PUBLIC_BASE_URL", mockBaseUrl);
	const { request } = useHandleLogout(baseUrl);
	const { resetTimer, setIsOpenInactivityLogoutModal, isOpenInactivityLogoutModal } = useLogoutTimer(request);

	// eslint-disable-next-line react-hooks/incompatible-library
	const loanAmount = watch("loanAmount");

	const maxConsumerLoanAmount = 5_000_000;
	const maxConsumerDownPayment = 2_000_000;
	const maxBusinessLoanAmount = 50_000_000;
	const maxBusinessDownPayment = 20_000_000;
	const maxLoanTerms = 30;
	const maxInterestRate = 30.0;
	const loadingDelay = 500;

	useEffect(() => {
		resetTimer();
	}, [request, resetTimer]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= mobileScreenWidthValue);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (isChangingCalcType) {
			setIsLoaderShow(true);
			if (loaderTimeoutRef.current) {
				clearTimeout(loaderTimeoutRef.current);
			}
		} else {
			loaderTimeoutRef.current = setTimeout(() => {
				setIsLoaderShow(false);
			}, loadingDelay);
		}

		return () => {
			if (loaderTimeoutRef.current) {
				clearTimeout(loaderTimeoutRef.current);
			}
		};
	}, [isChangingCalcType]);

	const handleVisibleInfo = () => {
		setIsVisibleInfo(true);
	};

	const handleCloseInfo = () => {
		setIsVisibleInfo(false);
	};

	const handleCalcAction = (data: ICalculatorForm) => {
		resetTimer();

		if (isMobile) {
			handleVisibleInfo();
		}

		const resultLoanAmount = Number(data.loanAmount.replace(/\D/g, "")) - Number(data.downPayment.replace(/\D/g, ""));
		const resultInterestRate = Number(data.interestRate) / factorValue / yearMonthCount;

		const resultMonthlyPayment = Math.ceil(
			resultLoanAmount *
				(resultInterestRate +
					resultInterestRate / (Math.pow(1 + resultInterestRate, Number(data.loanTerms) * yearMonthCount) - 1)),
		);

		setMonthlyPayment(resultMonthlyPayment);
		setResultLoanInterest(Math.ceil(resultMonthlyPayment * Number(data.loanTerms) * yearMonthCount) - resultLoanAmount);

		return {
			success: true,
			message: "Completed successfully",
		};
	};

	function handleChangeCalcType(buttonName: TCalcTypes, event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		startChangingCalcType(() => {
			setActiveCalc(buttonName);
			reset();
			setResultLoanInterest(0);
			setMonthlyPayment(0);
		});
	}

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
							type={InputTypeList.Radio}
							id="currencySelectionRadioGroup__usd"
							className={styles.currencySelectionRadioGroup__input}
							disabled={true}
						/>
						<label
							htmlFor="currencySelectionRadioGroup__usd"
							className={styles.currencySelectionRadioGroup__label}
							style={{ cursor: "not-allowed" }}>
							<p className={styles.currencySelectionRadioGroup__text}>$</p>
						</label>
						<input
							name="currency"
							type={InputTypeList.Radio}
							id="currencySelectionRadioGroup__rub"
							className={styles.currencySelectionRadioGroup__input}
							defaultChecked
						/>
						<label htmlFor="currencySelectionRadioGroup__rub" className={styles.currencySelectionRadioGroup__label}>
							<p className={styles.currencySelectionRadioGroup__text}>₽</p>
						</label>
						<input
							name="currency"
							type={InputTypeList.Radio}
							id="currencySelectionRadioGroup__eur"
							className={styles.currencySelectionRadioGroup__input}
							disabled={true}
						/>
						<label
							htmlFor="currencySelectionRadioGroup__eur"
							className={styles.currencySelectionRadioGroup__label}
							style={{ cursor: "not-allowed" }}>
							<p className={styles.currencySelectionRadioGroup__text}>€</p>
						</label>
					</div>
				</div>

				<div className={styles.calculationWrapper}>
					<form className={styles.calculatorFormContentWrapper} onSubmit={handleSubmit(handleCalcAction)}>
						<div className={styles.selectionOfCalculationContainer}>
							<button
								className={cn(styles.selectionOfCalculationContainer__button, {
									[styles.active]: activeCalc === TCalcTypes.realEstate,
								})}
								onClick={(event) => handleChangeCalcType(TCalcTypes.realEstate, event)}>
								Недвижимость
							</button>

							<button
								className={cn(styles.selectionOfCalculationContainer__button, {
									[styles.active]: activeCalc === TCalcTypes.credit,
								})}
								onClick={(event) => handleChangeCalcType(TCalcTypes.credit, event)}
								disabled={isChangingCalcType}>
								Кредит
							</button>
						</div>

						<CalcRageInput
							control={control}
							name="loanAmount"
							label={`${activeCalc === TCalcTypes.realEstate ? "Стоимость недвижимости" : "Сумма кредита"}, ₽`}
							maxValue={activeCalc === TCalcTypes.realEstate ? maxBusinessLoanAmount : maxConsumerLoanAmount}
							changeFieldValue={(value) => setValue("loanAmount", value)}
						/>

						<CalcRageInput
							control={control}
							name="downPayment"
							label="Первоначальный взнос, ₽"
							maxValue={activeCalc === TCalcTypes.realEstate ? maxBusinessDownPayment : maxConsumerDownPayment}
							changeFieldValue={(value) => setValue("downPayment", value)}
							isAdditionalControl={true}
							isAdditionalControlPercents={true}
							loanAmountValue={loanAmount}
							additionalControlValues={downPaymentAdditionalValues}
						/>

						<CalcRageInput
							control={control}
							name="loanTerms"
							label="Сроки кредита, лет"
							maxValue={maxLoanTerms}
							changeFieldValue={(value) => setValue("loanTerms", value)}
							isAdditionalControl={true}
							additionalControlValues={
								activeCalc === TCalcTypes.realEstate
									? businessLoanTermsAdditionalValues
									: consumerLoanTermsAdditionalValues
							}
						/>

						<CalcRageInput
							control={control}
							name="interestRate"
							label="Процентная ставка, %"
							maxValue={maxInterestRate}
							changeFieldValue={(value) => setValue("interestRate", value)}
							isPercentValue={true}
							isAdditionalControl={true}
							additionalControlValues={interestRateAdditionalValues}
						/>

						<Button
							variant={ButtonType.Contained}
							type={InputTypeList.Submit}
							isLarge
							className={styles.calculatorFormContentWrapper__submitBtn}>
							Рассчитать кредит
						</Button>
					</form>

					<div className={styles.calculationInfoWrapper} style={infoStyle}>
						<div className={styles.calculationInfoButtonWrapper}>
							<InfoIcon classNames={styles.calculationInfoButtonWrapper__infoIcon} />
							<Image
								src={crossIcon}
								alt="close element"
								onClick={handleCloseInfo}
								className={styles.calculationInfoButtonWrapper__closeIcon}
							/>
						</div>
						<p className={styles.calculationInfoWrapper__title}>Ежемесячный платеж</p>
						<p className={styles.calculationInfoWrapper__price}>{formatCalculateNumber(String(monthlyPayment))} ₽</p>
						<div className={styles.creditInfoWrapper}>
							<p className={styles.creditInfoWrapper__name}>Кредит</p>
							<p className={styles.creditInfoWrapper__value}>{formatCalculateNumber(String(loanAmount))} ₽</p>
						</div>
						<div className={styles.percentInfoWrapper}>
							<p className={styles.percentInfoWrapper__name}>Проценты</p>
							<p className={styles.percentInfoWrapper__value}>{formatCalculateNumber(String(resultLoanInterest))} ₽</p>
						</div>
						<div className={styles.creditAndPercentInfoWrapper}>
							<p className={styles.creditAndPercentInfoWrapper__name}>Кредит + проценты</p>
							<p className={styles.creditAndPercentInfoWrapper__value}>
								{formatCalculateNumber(String(Number(loanAmount) + resultLoanInterest))} ₽
							</p>
						</div>
					</div>
				</div>
				<InactivityLogoutModal
					open={isOpenInactivityLogoutModal}
					onStayClick={() => [resetTimer(), setIsOpenInactivityLogoutModal(false)]}
					onLogoutClick={() => [request(), setIsOpenInactivityLogoutModal(false)]}
					onModalTimerExpiring={() => [request(), setIsOpenInactivityLogoutModal(false)]}
				/>
			</div>
			<div className={styles.spinnerWrapper}>{isLoaderShow && <Spinner />}</div>
		</div>
	);
}
