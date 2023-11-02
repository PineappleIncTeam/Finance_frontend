export function getCurrencyCalculation(totalCost, anInitialFee, currencyRate = 1) {
    let totalCostResult = (totalCost / currencyRate)
    let anInitialFeeResult = (anInitialFee / currencyRate)
    return { totalCostResult, anInitialFeeResult }
}

export function getReverseCalculation(totalCost, anInitialFee, currencyRate = 1) {
    let totalCostResult = (totalCost * currencyRate)
    let anInitialFeeResult = (anInitialFee * currencyRate)
    return { totalCostResult, anInitialFeeResult }
}