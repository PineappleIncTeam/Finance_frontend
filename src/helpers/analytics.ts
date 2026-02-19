import { ImportStatisticFileTypes } from "../types/pages/Analytics";

export enum Operation {
	Expenses = "Расходы",
	Income = "Доходы",
	Analysis = "Анализ доходов и расходов",
	ListOfOperations = "Список операций",
}

export enum DisplayMode {
	RUB = "rub",
	USD = "usd",
	EUR = "eur",
	PERCENT = "percent",
}

export const fileLoadTypeList = [
	ImportStatisticFileTypes.outcome,
	ImportStatisticFileTypes.income,
	ImportStatisticFileTypes.targets,
];
