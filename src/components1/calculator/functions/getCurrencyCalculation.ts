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
