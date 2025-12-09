import axios from "axios";

import { expensesCategoryEndPoint } from "../auth/apiConstants";

import { IAddCategoryIncomeForm } from "../../../types/components/ComponentsTypes";

export const addIncomeCategory = async (baseUrl: string, data: IAddCategoryIncomeForm) => {
	return await axios(`${baseUrl}/${expensesCategoryEndPoint}/`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
