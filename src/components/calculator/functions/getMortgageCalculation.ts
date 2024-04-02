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
