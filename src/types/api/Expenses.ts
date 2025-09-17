export interface IOperation {
	id: number;
	type: string;
	amount: string;
	date: string;
	categories: number;
	target: number;
	name?: string;
}
