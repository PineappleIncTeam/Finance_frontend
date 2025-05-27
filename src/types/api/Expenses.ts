export interface IOptionsResponse {
	options: string[];
}

export interface ITransactionsResponse {
	date: string;
	target: string;
	amount: string;
}

export interface IOperation {
	id: number;
	type: string;
	amount: string;
	date: string;
	categories: number;
	target: string;
}
