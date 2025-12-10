import axios from "axios";

import { categoryTransactionsAllEndPoint } from "../auth/apiConstants";

export const getAllExpensesOperations = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${categoryTransactionsAllEndPoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
