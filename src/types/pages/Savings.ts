export interface ISavingsInputForm {
	number?: string;
	date?: string;
	sum?: string;
}

export interface ISavingsSelectForm {
	date: string;
	amount: string;
	type: string;
}

export interface ITargetAddForm {
	name: string;
	amount: string;
}
