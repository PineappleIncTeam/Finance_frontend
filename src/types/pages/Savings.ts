export interface ISavingsInputForm {
	number?: string;
	date?: string;
	sum?: string;
}

export interface ISavingsSelectForm {
	id: number | null;
	date: string;
	amount: number;
	type: string;
}

export interface ISavingsTargetAddForm {
	// id: number;
	name: string;
	amount: number;
}
