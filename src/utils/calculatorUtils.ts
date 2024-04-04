export function getCreditCalculation(totalCost, creditTerm, creditRate) {
	const numberOfMonths = creditTerm * 12;
	const monthlyCreditRate = creditRate / 12 / 100;
	const totalRate = (1 + monthlyCreditRate) ** numberOfMonths;
	const loanAmount = +totalCost;

	const monthlyPayment = (loanAmount * monthlyCreditRate * totalRate) / (totalRate - 1);
	const overpayment = monthlyPayment * numberOfMonths - loanAmount;
	const totalPayment = loanAmount + overpayment;

	const monthlyPaymentToFixed = monthlyPayment.toFixed(2);
	const overpaymentToFixed = overpayment.toFixed(2);
	const totalPaymentToFixed = totalPayment.toFixed(2);

	return { monthlyPaymentToFixed, loanAmount, overpaymentToFixed, totalPaymentToFixed };
}

export function getCurrencyCalculation(totalCost, anInitialFee, currencyRate = 1) {
	const totalCostResult = totalCost / currencyRate;
	const anInitialFeeResult = anInitialFee / currencyRate;
	return { totalCostResult, anInitialFeeResult };
}

export function getReverseCalculation(totalCost, anInitialFee, currencyRate = 1) {
	const totalCostResult = totalCost * currencyRate;
	const anInitialFeeResult = anInitialFee * currencyRate;
	return { totalCostResult, anInitialFeeResult };
}

export function getMortgageCalculation(totalCost, anInitialFee, creditTerm, creditRate) {
	const numberOfMonths = creditTerm * 12;
	const monthlyCreditRate = creditRate / 12 / 100;
	const totalRate = (1 + monthlyCreditRate) ** numberOfMonths;
	const loanAmount = totalCost - anInitialFee;

	const monthlyPayment = (loanAmount * monthlyCreditRate * totalRate) / (totalRate - 1);
	const overpayment = monthlyPayment * numberOfMonths - loanAmount;
	const totalPayment = loanAmount + overpayment;

	const monthlyPaymentToFixed = monthlyPayment.toFixed(2);
	const overpaymentToFixed = overpayment.toFixed(2);
	const totalPaymentToFixed = totalPayment.toFixed(2);

	return { monthlyPaymentToFixed, loanAmount, overpaymentToFixed, totalPaymentToFixed };
}

export function getPercentFromTotalCost(totalCost, percents, callback) {
	const result = (totalCost / 100) * percents;
	return callback(result);
}

export function getRates() {
	const response = fetch("https://www.cbr-xml-daily.ru/daily_json.js")
		.then((response) => response.json())
		.then((data) => data);
	return response;
}
