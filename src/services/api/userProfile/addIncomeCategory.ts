import axios from "axios";

import { categoryEndPoint } from "../auth/apiConstants";

import { IAddingCategoryIncomeForm } from "../../../types/pages/ProfitMoney";

export const addIncomeCategory = async (baseUrl: string, data: IAddingCategoryIncomeForm) => {
	return await axios(`${baseUrl}/${categoryEndPoint}/`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
