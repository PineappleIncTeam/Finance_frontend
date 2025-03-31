import axios from "axios";

import { expensesCategoryEndPoint } from "../auth/apiConstants";

export const RemoveExpensesCategory = async (baseUrl: string, id: number) => {
	return await axios(`${baseUrl}/${expensesCategoryEndPoint}/${String(id)}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
