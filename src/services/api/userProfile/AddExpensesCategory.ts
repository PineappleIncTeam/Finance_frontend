import axios from "axios";

import { expensesCategoryEndPoint } from "../auth/apiConstants";
import { IAddCategoryExpensesForm } from "../../../types/components/ComponentsTypes";

export const AddExpensesCategory = async (baseUrl: string, data: IAddCategoryExpensesForm) => {
	return await axios(`${baseUrl}/${expensesCategoryEndPoint}/`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
