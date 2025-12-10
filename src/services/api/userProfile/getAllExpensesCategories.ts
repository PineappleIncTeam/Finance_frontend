/* eslint-disable camelcase */
import axios from "axios";

import { categoriesAllEndPoint } from "../auth/apiConstants";
import { ICategoriesTypes } from "../../../types/pages/Expenses";

export const getAllExpensesCategories = async (baseUrl: string, data: ICategoriesTypes) => {
	return await axios(`${baseUrl}/${categoriesAllEndPoint}`, {
		method: "GET",
		params: {
			is_income: data.is_income,
			is_outcome: data.is_outcome,
		},
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
