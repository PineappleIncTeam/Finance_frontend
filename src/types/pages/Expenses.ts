export interface IExpensesInputForm {
	number?: string;
	date?: string;
	sum?: string;
}

export interface IAddCategoryTransactionForm {
	date: string;
	amount: number | string;
	categories: number | null;
	type: "outcome" | "income";
}

export interface IExpensesCategoryForm {
	name: string;
	is_income: boolean;
	is_outcome: boolean;
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
