export interface IMonthSum {
	month: string;
	amount: number;
}

export interface IReportCategory {
	category_id?: number;
	category_name?: string;
	amount: number;
	items?: IMonthSum[];
}

export interface IReportsStatistics {
	total_expenses: number;
	total_income: number;
	total_savings: number;
}

export interface IReportsBalance {
	current_balance: number;
}
