import axios from "axios";

import { categoryEndPoint } from "../auth/apiConstants";

import { IAddCategoryIncomeForm } from "../../../types/components/ComponentsTypes";

export const addIncomeCategory = async (baseUrl: string, data: IAddCategoryIncomeForm) => {
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
