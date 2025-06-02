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

export interface IExpensesCategoryForm {
	target: string;
	categories: string;
}

export interface IExpensesSelectForm {
	expenses?: string;
}

export interface ICategoriesTypes {
	is_income: boolean;
	is_outcome: boolean;
}

export interface IFiveOperations {
	type: string;
}

export interface IEditOperation {
	date: string;
	amount: number;
}

export interface IArchiveCategory {
	is_deleted: boolean;
}
