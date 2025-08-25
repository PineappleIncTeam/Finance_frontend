import axios from "axios";

import { expensesCategoryTransactionEndPoint } from "../auth/apiConstants";
import { IFiveOperations } from "../../../types/pages/Expenses";

export const GetFiveTransactions = async (baseUrl: string, data: IFiveOperations) => {
	return await axios(`${baseUrl}/${expensesCategoryTransactionEndPoint}/`, {
		method: "GET",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
