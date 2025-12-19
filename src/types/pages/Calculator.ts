export interface ICalculatorForm {
	loanAmount: string;
	downPayment: string;
	loanTerms: string;
	interestRate: string;
}

export enum TCalcTypes {
	realEstate = "realEstate",
	credit = "credit",
}
