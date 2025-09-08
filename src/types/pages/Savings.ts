export interface ISavingsInputForm {
	number?: string;
	date?: string;
	sum?: string;
}

export interface ISavingsSelectForm {
	name: string;
	date: string;
	amount: number;
	type: string;
}

export interface ISavingsTargetAddForm {
	id: number;
	amount: number;
}
