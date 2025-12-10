import axios from "axios";

import { operationsEndPoint } from "../auth/apiConstants";
import { IFiveOperations } from "../../../types/pages/Expenses";

export const getFiveExpensesTransactions = async (baseUrl: string, data: IFiveOperations) => {
	return await axios(`${baseUrl}/${operationsEndPoint}/`, {
		method: "GET",
		params: {
			type: data.type,
		},
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
