import { setupAxiosInterceptors } from "../../axios/interceptors";

import { AddExpensesCategory } from "./AddExpensesCategory";
import { AddExpensesCategoryTransaction } from "./AddExpensesCategoryTransaction";
import { ArchiveCategory } from "./ArchiveCategory";
import { EditExpensesCategoryTransaction } from "./EditExpensesTransaction";
import { GetCategoriesAll } from "./GetCategoriesAll";
import { fetchCurrencyRates } from "./getCurrencies";
import { GetFiveTransactions } from "./GetFiveTransactions";
import { GetOperationsAll } from "./GetOperationsAll";
import { RemoveExpensesCategory } from "./RemoveExpensesCategory";
import { RemoveExpensesCategoryTransaction } from "./RemoveExpensesTransaction";

setupAxiosInterceptors();

export const userProfileApi = {
	AddExpensesCategory,
	AddExpensesCategoryTransaction,
	ArchiveCategory,
	EditExpensesCategoryTransaction,
	GetCategoriesAll,
	fetchCurrencyRates,
	GetFiveTransactions,
	GetOperationsAll,
	RemoveExpensesCategory,
	RemoveExpensesCategoryTransaction,
};
