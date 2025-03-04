import axios from "axios";

import { addExpensesCategory } from "../auth/apiConstants";

export const AddExpensesCategory = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${addExpensesCategory}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
