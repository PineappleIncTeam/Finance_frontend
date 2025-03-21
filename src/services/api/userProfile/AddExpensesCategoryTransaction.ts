import axios from "axios";

import { addExpensesCategoryTransactionEndPoint } from "../auth/apiConstants";
import { IExpensesAddCategoryTransactionForm } from "../../../types/pages/Expenses";

export const AddExpensesCategoryTransaction = async (baseUrl: string, data: IExpensesAddCategoryTransactionForm) => {
	return await axios(`${baseUrl}/${addExpensesCategoryTransactionEndPoint}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
