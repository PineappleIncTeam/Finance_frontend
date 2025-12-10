import axios from "axios";

import { categoryEndPoint } from "../auth/apiConstants";
import { IAddCategoryExpensesForm } from "../../../types/components/ComponentsTypes";

export const addExpensesCategory = async (baseUrl: string, data: IAddCategoryExpensesForm) => {
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
