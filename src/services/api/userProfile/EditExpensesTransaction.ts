import axios from "axios";

import { expensesCategoryTransactionEndPoint } from "../auth/apiConstants";
import { IEditOperation } from "../../../types/pages/Expenses";

export const EditExpensesCategoryTransaction = async (baseUrl: string, id: string, data: IEditOperation) => {
	return await axios(`${baseUrl}/${expensesCategoryTransactionEndPoint}/${id}/`, {
		method: "PATCH",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
