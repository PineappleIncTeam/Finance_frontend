import axios from "axios";

import { addExpensesCategoryEndPoint } from "../auth/apiConstants";
import { IAddCategoryExpensesForm } from "../../../types/components/ComponentsTypes";

export const AddExpensesCategory = async (baseUrl: string, data: IAddCategoryExpensesForm) => {
	return await axios(`${baseUrl}/${addExpensesCategoryEndPoint}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
