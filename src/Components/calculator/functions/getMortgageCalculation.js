export function getMortgageCalculation(totalCost, anInitialFee, creditTerm, creditRate) {
    
    let numberOfMonths = creditTerm * 12
    let monthlyCreditRate = creditRate / 12 / 100
    let totalRate = (1 + monthlyCreditRate) ** numberOfMonths
    let loanAmount = totalCost - anInitialFee

    let monthlyPayment = loanAmount * monthlyCreditRate * totalRate / (totalRate - 1)
    let overpayment = monthlyPayment * numberOfMonths - loanAmount
    let totalPayment = loanAmount + overpayment

    const monthlyPaymentToFixed = monthlyPayment.toFixed(2)
    const overpaymentToFixed = overpayment.toFixed(2)
    const totalPaymentToFixed = totalPayment.toFixed(2)
    
    return {monthlyPaymentToFixed, loanAmount, overpaymentToFixed, totalPaymentToFixed}
}