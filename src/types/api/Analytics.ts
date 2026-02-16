export interface IFinancialTransaction {
	category_id: number;
	category_name?: string;
	amount: number;
	month: string;
}

export interface ICategoryBudget {
	is_income?: boolean;
	is_outcome?: boolean;
	is_target?: boolean;
	results?: IFinancialTransaction[];
}

export interface IReportsStatistics {
	total_expenses: number;
	total_income: number;
	total_savings: number;
}

export interface IReportsBalance {
	current_balance: number;
}

export interface IReportCategory {
	category_id: number;
	category_name: string;
	amount: number;
	items: any[];
}

export interface IReportsCategoriesResponse {
	incomes: IReportCategory[];
	outcomes: IReportCategory[];
	targets: IReportCategory[];
	summary: {
		total_incomes: number;
		total_outcomes: number;
		total_targets: number;
		balance: number;
	};
}
