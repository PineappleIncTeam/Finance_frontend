import axios from "axios";

import { categoriesAllEndPoint } from "../auth/apiConstants";
import { ICategoriesTypes } from "../../../types/pages/Expenses";

export const getAllIncomeCategories = async (baseUrl: string, data: ICategoriesTypes) => {
	return await axios(`${baseUrl}/${categoriesAllEndPoint}`, {
		method: "GET",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
