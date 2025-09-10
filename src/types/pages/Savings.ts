export interface ISavingsInputForm {
	number?: string;
	date?: string;
	sum?: string;
}

export interface ISavingsSelectForm {
	date: string;
	amount: number;
	type: string;
}

export interface ISavingsTargetAddForm {
	id: number | string;
	name: string;
	amount: number;
}
