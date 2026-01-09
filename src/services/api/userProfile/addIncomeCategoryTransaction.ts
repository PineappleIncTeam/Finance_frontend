import axios from "axios";

import { operationsEndPoint } from "../auth/apiConstants";

import { IAddCategoryTransactionForm } from "../../../types/pages/Expenses";

export const addIncomeCategoryTransaction = async (baseUrl: string, data: IAddCategoryTransactionForm) => {
	return await axios(`${baseUrl}/${operationsEndPoint}/`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
