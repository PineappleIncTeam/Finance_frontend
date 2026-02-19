export interface IAnalyticsInputForm {
	number?: string;
	date?: string[];
	sum?: string;
}

export type MonthlyExpenses = {
	[month: string]: Array<{ [key: string]: number }>;
};

export enum ImportStatisticFileTypes {
	targets = "targets",
	outcome = "outcome",
	income = "income",
}

export interface IStatisticFilePayload {
	type: ImportStatisticFileTypes;
	days: number;
}
