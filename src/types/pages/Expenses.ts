export interface IExpensesInputForm {
	number?: string;
	date?: string;
	sum?: string;
}

export interface IExpensesAddCategoryTransactionForm {
	date: string;
	amount: string;
	type: string;
}

export interface IExpensesSelectForm {
	expenses?: string;
}
