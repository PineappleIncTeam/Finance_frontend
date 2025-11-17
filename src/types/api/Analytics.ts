export interface IReportsCategories {
	category_id: number;
	category_name: string;
	amount: number;
	items: IReportsCategoriesItems[];
}

export interface IReportsCategoriesItems {
	month: string;
	amount: number;
}

export interface IReportsStatistics {
	total_expenses: number;
	total_income: number;
	total_savings: number;
}
