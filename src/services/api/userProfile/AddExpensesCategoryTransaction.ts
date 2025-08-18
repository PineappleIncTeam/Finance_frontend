import axios from "axios";

import { expensesCategoryTransactionEndPoint } from "../auth/apiConstants";
import { IExpensesAddCategoryTransactionForm } from "../../../types/pages/Expenses";

export const addExpensesCategoryTransaction = async (baseUrl: string, data: IExpensesAddCategoryTransactionForm) => {
	return await axios(`${baseUrl}/${expensesCategoryTransactionEndPoint}/`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
