export function getCurrencyCalculation(totalCost, anInitialFee, currencyRate) {
    console.log(totalCost, anInitialFee, currencyRate)
    let totalCostResult = (totalCost / currencyRate)
    let anInitialFeeResult = (anInitialFee / currencyRate)
    return { totalCostResult, anInitialFeeResult }
}

export function getReverseCalculation(totalCost, anInitialFee, currencyRate) {
    console.log(totalCost, anInitialFee, currencyRate)
    let totalCostResult = (totalCost * currencyRate)
    let anInitialFeeResult = (anInitialFee * currencyRate)
    return { totalCostResult, anInitialFeeResult }
}