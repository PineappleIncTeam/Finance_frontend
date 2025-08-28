import axios from "axios";

import { expensesCategoriesAllEndPoint } from "../auth/apiConstants";
import { ICategoriesTypes } from "../../../types/pages/Expenses";

export const getAllExpensesCategories = async (baseUrl: string, data: ICategoriesTypes) => {
	return await axios(`${baseUrl}/${expensesCategoriesAllEndPoint}`, {
		method: "GET",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
