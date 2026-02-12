export interface IAnalyticsInputForm {
	number?: string;
	date?: string;
	sum?: string;
}

export type ExpenseLabel =
	| "Внезапная покупка"
	| "Стрижка"
	| "Бассейн"
	| "Школа"
	| "Еда"
	| "Плата жилья"
	| "Ногти"
	| "Бензин"
	| "Дорога работа"
	| "Юрист"
	| "Детский сад"
	| "Учебники"
	| "Отпуск"
	| "Театр"
	| "Кредит"
	| "Страховка"
	| "Киберспорт"
	| "Путешествия"
	| "Кино"
	| "Ипотека";

export type MonthlyExpenses = {
	[month: string]: Array<{ [key: string]: number }>;
};
