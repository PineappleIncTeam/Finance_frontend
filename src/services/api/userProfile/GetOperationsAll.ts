import axios from "axios";

import { expensesCategoryTransactionsAllEndPoint } from "../auth/apiConstants";

export const getOperationsAll = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${expensesCategoryTransactionsAllEndPoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
