import { useEffect, useState } from "react";

import CalculatorInput from "./Components/CalculatorInput/CalculatorInput";

import CalculatorButton from "./Components/CalculatorButton/CalculatorButton";
import CalculationResult from "./Components/CalculationResult/CalculationResult";
import PercentButtonBlock from "./Components/PercentButtonBlock/PercentButtonBlock";
import CreditTermRateButtonBlock from "./Components/CreditTermRateButtonBlock/CreditTermRateButtonBlock";
import ChoiceButton from "./Components/ChoiceButton/ChoiceButton";
import ExchangeRates from "./Components/ExchangeRates/ExchangeRates";

import style from "./Calculator.module.css";

//test commit
function Calculator({ setCheckMainField, setCheckCalculator }: any) {
	useEffect(() => {
		setCheckMainField(false);
		setCheckCalculator(true);
	});
	const [totalCost, setTotalCost] = useState(0);
	const [anInitialFee, setAnInitialFee] = useState(0);
	const [creditTerm, setCreditTerm] = useState(0);
	const [creditRate, setCreditRate] = useState(0);
	const [result, setResult] = useState();
	const [realEstate, setRealEstate] = useState(true);
	const [exchangeRates, setExchangeRates] = useState();
	const [currencyType, setCurrencyType] = useState("rub");
	const data = [totalCost, anInitialFee, creditTerm, creditRate];
	const creditTermData = [1, 3, 5, 7];
	const mortgageTermData = [5, 10, 15, 20];
	const creditRateData = [5.5, 7.5, 7.9, 11.4, 13.5];

	const USD = exchangeRates && exchangeRates.Valute.USD.Value.toFixed(2);
	const EUR = exchangeRates && exchangeRates.Valute.EUR.Value.toFixed(2);
	const inputMaxValueDivisor = { rub: 1, usd: USD, eur: EUR };

	useEffect(() => {
		setResult();
	}, [realEstate]);

	return (
		<div className={style.calculator_main_page}>
			<h2 className={style.title}>Калькулятор</h2>
			<div className={style.rates_block}>
				<ExchangeRates
					exchangeRates={exchangeRates}
					setExchangeRates={setExchangeRates}
					totalCost={totalCost}
					setTotalCost={setTotalCost}
					anInitialFee={anInitialFee}
					setAnInitialFee={setAnInitialFee}
					currencyType={currencyType}
					setCurrencyType={setCurrencyType}
					setResult={setResult}
					realEstate={realEstate}
					data={data}
				/>
			</div>
			<div className={style.choice_buttons_block}>
				<ChoiceButton textContent={"Недвижимость"} active={realEstate} setActive={() => setRealEstate(true)} />
				<ChoiceButton textContent={"Кредит"} active={!realEstate} setActive={() => setRealEstate(false)} />
			</div>
			<div className={style.calculator_page}>
				<div className={style.calculation_block}>
					<div className={style.input_block}>
						<CalculatorInput
							label={realEstate ? "Стоимость недвижимости" : "Сумма Кредита"}
							min={0}
							max={exchangeRates ? 99999999 / inputMaxValueDivisor[currencyType] : 99999999}
							value={totalCost}
							setValue={setTotalCost}
							unformatted={false}
							currencyType={currencyType}
							exchangeRates={exchangeRates}
						/>
					</div>
					{realEstate && (
						<>
							<div className={style.input_block}>
								<CalculatorInput
									label={"Первоначальный взнос"}
									min={0}
									max={exchangeRates ? 99999999 / inputMaxValueDivisor[currencyType] : 99999999}
									value={anInitialFee}
									setValue={setAnInitialFee}
									unformatted={false}
									currencyType={currencyType}
									exchangeRates={exchangeRates}
								/>
							</div>
							<div className={style.percent_button_block}>
								<PercentButtonBlock totalCost={totalCost} setAnInitialFee={setAnInitialFee} />
							</div>
						</>
					)}
					<div className={style.input_block}>
						<CalculatorInput
							label={"Срок кредита (лет)"}
							min={0}
							max={35}
							value={creditTerm}
							setValue={setCreditTerm}
							unformatted={true}
							currencyType={currencyType}
						/>
					</div>
					<div className={style.percent_button_block}>
						<CreditTermRateButtonBlock
							data={realEstate ? mortgageTermData : creditTermData}
							content={"лет"}
							setData={setCreditTerm}
						/>
					</div>
					<div className={style.input_block}>
						<CalculatorInput
							label={"Процентная ставка (%)"}
							min={0}
							max={40}
							value={creditRate}
							setValue={setCreditRate}
							step={0.1}
							unformatted={true}
							currencyType={currencyType}
						/>
					</div>
					<div className={style.percent_button_block}>
						<CreditTermRateButtonBlock data={creditRateData} content={"%"} setData={setCreditRate} />
					</div>
					<div className={style.calculator_button}>
						<CalculatorButton setResult={setResult} data={data} creditType={realEstate} />
					</div>
				</div>

				{/* <div className={style.rates_block}>
            <ExchangeRates
				exchangeRates={exchangeRates}
				setExchangeRates={setExchangeRates}
				totalCost={totalCost}
				setTotalCost={setTotalCost}
				anInitialFee={anInitialFee}
				setAnInitialFee={setAnInitialFee}
				currencyType={currencyType}
				setCurrencyType={setCurrencyType}
				setResult={setResult}
            />
          </div> */}
				<div className={style.result_block}>
					<CalculationResult result={result} currencyType={currencyType} />
				</div>
			</div>
		</div>
	);
}

export default Calculator;
