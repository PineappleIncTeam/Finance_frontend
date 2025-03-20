import axios from "axios";

import { addExpensesCategoryTransactionEndPoint } from "../auth/apiConstants";
import { IExpensesInputForm } from "../../../types/pages/Expenses";

export const AddExpensesCategoryTransaction = async (baseUrl: string, data: IExpensesInputForm) => {
	return await axios(`${baseUrl}/${addExpensesCategoryTransactionEndPoint}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
