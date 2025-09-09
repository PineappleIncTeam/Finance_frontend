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
	name: string;
	id: number | null;
	amount: number;
}
