import axios from "axios";

import { expensesCategoryTransactionEndPoint } from "../auth/apiConstants";

export const RemoveExpensesCategoryTransaction = async (baseUrl: string, id: string) => {
	return await axios(`${baseUrl}/${expensesCategoryTransactionEndPoint}/${id}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
