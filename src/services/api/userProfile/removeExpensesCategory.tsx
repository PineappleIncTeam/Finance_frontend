import axios from "axios";

import { expensesCategoryEndPoint } from "../auth/apiConstants";

export const removeExpensesCategory = async (baseUrl: string, id: string) => {
	return await axios(`${baseUrl}/${expensesCategoryEndPoint}/${id}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
